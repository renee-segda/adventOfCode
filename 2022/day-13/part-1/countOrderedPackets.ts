import { readFileSync } from "fs";

const pairs: string[] = readFileSync('../input.txt', 'utf-8').split('\n\n');

interface PacketPair {
    left: any[],
    right: any[]
}

const packetPairs: PacketPair[] = [];

for (let pair of pairs) {
    const lines: string[] = pair.split('\n');
    const left = JSON.parse(lines[0]);
    const right = JSON.parse(lines[1]);
    packetPairs.push({
        left,
        right
    })
}

let packetCount = 0;
for (let i = 0; i < packetPairs.length; i++) {
    const pair = packetPairs[i];
    const response = compareTerms(pair.left, pair.right);
    if (response != 1) {
        packetCount += (i + 1);
    }
}

export function compareTerms(left: number | any[], right: number | any[]): number {
    const leftType = typeof left;
    const rightType = typeof right;
    if (leftType == 'number') {
        if (rightType == 'number') {
            return left == right ? 0 : left < right ? -1 : 1;
        } else {
            return compareTerms([left], right);
        }
    } else {
        if (left instanceof Array){
            if (rightType == 'number') {
                return compareTerms(left, [right]);
            } else {
                if (right instanceof Array){
                    let index = 0;
                    while (index < left.length && index < right.length) {
                        const response = compareTerms(left[index], right[index]);
                        if (response != 0) {
                            return response;
                        }
                        index++;
                    }
                    if (index < left.length) {
                        return 1;
                    } else if (index < right.length) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {
                    throw new Error(`Right term of unexpected type!`);
                }
            }
        } else {
            throw new Error(`Left term of unexpected type!`);
        }
    } 
}