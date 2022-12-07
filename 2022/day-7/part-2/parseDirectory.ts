import { Directory } from "../directoryTypes";

const { readFileSync } = require('fs');

const directoryTraversalOutput: string = readFileSync('../input.txt', 'utf-8');
const outputLines: string[] = directoryTraversalOutput.split('\n');

const root: Directory = {
    name: '/',
    children: new Map(),
    files: []
}
let currentDirectory = root;

for (let i = 1; i < outputLines.length; i++) {
    const line = outputLines[i].trim();
    if (line.substring(0, 1) == '$') {
        const commandParts: string[] = line.substring(1).trim().split(' ');
        if (commandParts.length > 1) {
            if (commandParts[1] == '..') {
                if (currentDirectory.parent) {
                    currentDirectory = currentDirectory.parent;
                } else {
                    throw new Error(`Directory ${currentDirectory.name} has no parent`);
                }
            } else {
                const dirName = commandParts[1].trim();
                if (!currentDirectory.children.has(dirName)) {
                    throw new Error(`Directory ${currentDirectory.name} does not contain directory ${dirName}`);
                } else {
                    currentDirectory = currentDirectory.children.get(dirName)!;
                }
            }
        }
    } else {
        const dirListingParts: string[] = line.trim().split(' ');
        const elementName = dirListingParts[1].trim();
        if (dirListingParts[0].trim() == 'dir') {
            currentDirectory.children.set(elementName, {
                name: elementName,
                children: new Map(),
                parent: currentDirectory,
                files: []
            });
        } else {
            currentDirectory.files.push({
                name: elementName,
                size: parseInt(dirListingParts[0].trim())
            })
        }
    }
}

const dirSizeMap: Map<string, number> = new Map();
const deviceStorageSize: number = 70000000;
const neededSpace: number = 30000000;

function calculateDirectorySize(directory: Directory): number {
    let totalSize = 0;
    if (directory.children.size > 0) {
        for (let [_, child] of directory.children) {
            totalSize += calculateDirectorySize(child);
        }
    }
    for (let file of directory.files) {
        totalSize += file.size;
    }
    console.log(`dir ${directory.name} size: ${totalSize}`);
    dirSizeMap.set(directory.name, totalSize);
    return totalSize;
}

const totalUsedSpace: number = calculateDirectorySize(root);
const currentAvailableSpace: number = deviceStorageSize - totalUsedSpace;

let minStorageSpace = Infinity;

for (let [_, space] of dirSizeMap) {
    const increase = space + currentAvailableSpace;
    if (increase >= neededSpace && space < minStorageSpace) {
        minStorageSpace = space;
    }
}

console.log(`Size of directory to remove: ${minStorageSpace}`);
