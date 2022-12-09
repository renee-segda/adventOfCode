import { readFileSync } from "fs";
import { TreeGridCell } from "../treeGridCell";

const treeGrid: TreeGridCell[][] = [];

const gridInputString: string = readFileSync('../input.txt', 'utf-8');
const gridRows: string[] = gridInputString.split('\n');

for (let i = 0; i < gridRows.length; i++) {
    const rowCells = gridRows[i].split('');
    treeGrid.push([]);
    for (let j = 0; j < rowCells.length; j++) {
        treeGrid[i].push({
            height: parseInt(rowCells[j]),
            maxHeightNorth: 0,
            maxHeightSouth: 0,
            maxHeightEast: 0,
            maxHeightWest: 0
        })
    }
}

let numVisible = (2 * treeGrid.length) + (2 * (treeGrid[0].length - 2));

// Calculate maxNorth and maxWest

const maxNorth: number[] = Array(treeGrid[0].length).fill(0);
const maxWest: number[] = Array(treeGrid.length).fill(0);

for (let i = 0; i < treeGrid.length; i++) {
    for (let j = 0; j < treeGrid[i].length; j++) {
        if (i > 0 && j > 0) {
            const heightOneNorth: number = treeGrid[i-1][j].height;
            if (heightOneNorth > maxNorth[j]) {
                maxNorth[j] = heightOneNorth;
            }
            treeGrid[i][j].maxHeightNorth = maxNorth[j];
            const heightOneWest: number = treeGrid[i][j-1].height;
            if (heightOneWest > maxWest[i]) {
                maxWest[i] = heightOneWest;
            }
            treeGrid[i][j].maxHeightWest = maxWest[i];
        }
    }
}

// Calculate maxSouth and maxEast

const maxSouth: number[] = Array(treeGrid[0].length).fill(0);
const maxEast: number[] = Array(treeGrid.length).fill(0);

for (let i = treeGrid.length - 1; i >= 0; i--) {
    for (let j = treeGrid[i].length - 1; j >= 0; j--) {
        if (i < treeGrid.length - 1 && j < treeGrid[i].length - 1) {
            const heightOneSouth: number = treeGrid[i+1][j].height;
            if (heightOneSouth > maxSouth[j]) {
                maxSouth[j] = heightOneSouth;
            }
            treeGrid[i][j].maxHeightSouth = maxSouth[j];
            const heightOneEast: number = treeGrid[i][j+1].height;
            if (heightOneEast > maxEast[i]) {
                maxEast[i] = heightOneEast;
            }
            treeGrid[i][j].maxHeightEast = maxEast[i];
        }
    }
}

for (let i = 1; i < treeGrid.length - 1; i++) {
    for (let j = 1; j < treeGrid[i].length - 1; j++) {
        const currentCell = treeGrid[i][j];
        if (Math.min(currentCell.maxHeightEast, currentCell.maxHeightWest, currentCell.maxHeightNorth, currentCell.maxHeightSouth) < currentCell.height) {
            numVisible++;
        }
    }
}

console.log(`Num visible trees: ${numVisible}`)