import { readFileSync } from "fs";
import { LinePoint } from "../linePoint";

const inputLines: string[] = readFileSync("../input.txt", "utf-8").split("\n");
const filledPointIds: Set<string> = new Set();
let depthOfLowestRock: number = 0;
const startPoint: LinePoint = {
  col: 500,
  depth: 0,
  id: "500,0",
};

for (let line of inputLines) {
  parseLine(line);
}

let successfulDrop: boolean = true;
let numUnitsOfSand: number = 0;

while (successfulDrop) {
  successfulDrop = dropSand();
  if (successfulDrop) {
    numUnitsOfSand++;
  }
}

console.log("Num units of sand dropped: " + numUnitsOfSand);

/* Functions */

function parseLine(line: string) {
  const pointStrings: string[] = line.split("->");
  let prevPoint: LinePoint | undefined;
  for (let i = 0; i < pointStrings.length; i++) {
    const rowDepth: string[] = pointStrings[i].trim().split(",");
    const col: number = Number.parseInt(rowDepth[0]);
    const depth: number = Number.parseInt(rowDepth[1]);
    const currentPoint: LinePoint = {
      col,
      depth,
      id: `${col},${depth}`,
    };
    if (depth > depthOfLowestRock) {
      depthOfLowestRock = depth;
    }
    if (prevPoint) {
      if (prevPoint.col == col) {
        const minDepth = Math.min(prevPoint.depth, depth);
        const maxDepth = Math.max(prevPoint.depth, depth);
        for (let d = minDepth + 1; d < maxDepth; d++) {
          const betweenPoint: LinePoint = {
            col,
            depth: d,
            id: `${col},${d}`,
          };
          filledPointIds.add(betweenPoint.id);
        }
      } else {
        const minCol = Math.min(prevPoint.col, col);
        const maxCol = Math.max(prevPoint.col, col);
        for (let c = minCol + 1; c < maxCol; c++) {
          const betweenPoint: LinePoint = {
            col: c,
            depth,
            id: `${c},${depth}`,
          };
          filledPointIds.add(betweenPoint.id);
        }
      }
    }
    filledPointIds.add(currentPoint.id);
    prevPoint = currentPoint;
  }
}

function dropSand(): boolean {
  let currentCol = startPoint.col;
  let currentDepth = startPoint.depth;
  do {
    const newLocation = findFreePoint(currentCol, currentDepth);
    if (!newLocation) {
      return true;
    }
    currentCol = newLocation.col;
    currentDepth = newLocation.depth;
  } while (currentDepth <= depthOfLowestRock);
  return false;
}

function findFreePoint(
  currentCol: number,
  currentDepth: number
): { col: number; depth: number } | undefined {
  //check one below
  if (!filledPointIds.has(`${currentCol},${currentDepth + 1}`)) {
    return { col: currentCol, depth: currentDepth + 1 };
  }
  //check downleft
  if (!filledPointIds.has(`${currentCol - 1},${currentDepth + 1}`)) {
    return { col: currentCol - 1, depth: currentDepth + 1 };
  }
  //check downright
  if (!filledPointIds.has(`${currentCol + 1},${currentDepth + 1}`)) {
    return { col: currentCol + 1, depth: currentDepth + 1 };
  }
  filledPointIds.add(`${currentCol},${currentDepth}`);
  return undefined;
}
