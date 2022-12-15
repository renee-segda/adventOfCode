import { readFileSync } from "fs";

export interface Vertex {
  height: number;
  neighbors: Vertex[];
  distance: number;
  row: number;
  col: number;
  id: string;
}

export interface GraphInfo {
  end: Vertex;
  vertices: Vertex[];
  size: number;
}

export function parseMap(path: string): GraphInfo {
  const vertexGrid: Vertex[][] = [];
  const input: string = readFileSync(path, "utf-8");
  const inputLines: string[] = input.split("\n");
  let endVertex: Vertex | undefined;
  let aCode = "a".charCodeAt(0);
  for (let i = 0; i < inputLines.length; i++) {
    const lineParts: string[] = inputLines[i].split("");
    vertexGrid.push([]);
    for (let j = 0; j < lineParts.length; j++) {
      const currentChar: string = lineParts[j];
      if (currentChar == "S") {
        vertexGrid[i].push({
          height: 0,
          row: i,
          col: j,
          distance: Infinity,
          neighbors: [],
          id: `${i},${j}`,
        });
      } else if (currentChar == "E") {
        endVertex = {
          height: 25,
          row: i,
          col: j,
          distance: 0,
          neighbors: [],
          id: `${i},${j}`,
        };
        vertexGrid[i].push(endVertex);
      } else {
        const currentCharCode = currentChar.charCodeAt(0) - aCode;
        vertexGrid[i].push({
          height: currentCharCode,
          row: i,
          col: j,
          distance: Infinity,
          neighbors: [],
          id: `${i},${j}`,
        });
      }
    }
  }
  for (let vRow of vertexGrid) {
    for (let v of vRow) {
      //check up
      if (v.row != 0 && canClimbFrom(v, vertexGrid[v.row - 1][v.col])) {
        v.neighbors.push(vertexGrid[v.row - 1][v.col]);
      }
      //check left
      if (v.col != 0 && canClimbFrom(v, vertexGrid[v.row][v.col - 1])) {
        v.neighbors.push(vertexGrid[v.row][v.col - 1]);
      }
      //check right
      if (
        v.col != vertexGrid[0].length - 1 &&
        canClimbFrom(v, vertexGrid[v.row][v.col + 1])
      ) {
        v.neighbors.push(vertexGrid[v.row][v.col + 1]);
      }
      //check down
      if (
        v.row != vertexGrid.length - 1 &&
        canClimbFrom(v, vertexGrid[v.row + 1][v.col])
      ) {
        v.neighbors.push(vertexGrid[v.row + 1][v.col]);
      }
    }
  }
  const vertexList: Vertex[] = [];
  for (let vRow of vertexGrid) {
    for (let v of vRow) {
      vertexList.push(v);
    }
  }
  sortPriorityQueue(vertexList);
  return {
    end: endVertex!,
    vertices: vertexList,
    size: vertexGrid.length * vertexGrid[0].length,
  };
}

/**
 * Determines if you can reach v1 from v2
 * @param v1 Destination vertex
 * @param v2 Source vertex
 * @returns True if v1 reachable from v2, false otherwise
 */
function canClimbFrom(v1: Vertex, v2: Vertex) {
  return v2.height >= v1.height - 1;
}

export function sortPriorityQueue(queue: Vertex[]) {
  queue.sort((a, b) => {
    if (a.distance != b.distance) {
      return a.distance < b.distance ? -1 : 1;
    } else if (a.row != b.row) {
      return a.row < b.row ? -1 : 1;
    } else if (a.col != b.col) {
      return a.col < b.col ? -1 : 1;
    } else {
      return 0;
    }
  });
}
