import { Vertex, GraphInfo, parseMap, sortPriorityQueue } from "./parseMap";

const info: GraphInfo = parseMap("../input.txt");

const visited: Map<string, Vertex> = new Map();

while (visited.size < info.size) {
  const current: Vertex = info.vertices.shift()!;
  if (!visited.has(current.id)) {
    const neighborDistance = current.distance + 1;
    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor.id) && neighbor.distance > neighborDistance) {
        neighbor.distance = neighborDistance;
      }
    }
    visited.set(current.id, current);
  }
  sortPriorityQueue(info.vertices);
}

let minPath = Infinity;
visited.forEach((v, _) => {
  if (v.height == 0 && v.distance < minPath) {
    minPath = v.distance;
  }
});

console.log(`Min path: ${minPath}`);
