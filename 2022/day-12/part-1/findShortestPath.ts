import { Vertex, GraphInfo, parseMap } from "./parseMap";

const info: GraphInfo = parseMap("../input.txt");

const visited: Set<string> = new Set();
const vertexQueue: Vertex[] = [info.start];

const numVertices = info.size;

while (visited.size < numVertices) {
  const current: Vertex = vertexQueue.shift()!;
  if (!visited.has(current.id)) {
    if (current.id == info.end.id) {
      console.log(`Num steps to end: ${current.distance}`);
      break;
    }
    visited.add(current.id);
    for (let neighbor of current.neighbors) {
      neighbor.distance = current.distance + 1;
      vertexQueue.push(neighbor);
    }
  }
}
