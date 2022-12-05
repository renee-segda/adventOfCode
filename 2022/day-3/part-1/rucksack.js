const { readFileSync } = require("fs");

const input = readFileSync("../input.txt", "utf-8");
const lines = input.split("\n");

let comp1;
let comp2;
let totalPoints = 0;
const itemMultiplier = 27;

function findIntersection(c1, c2) {
  const intersect = c1.filter((item) => c2.includes(item));
  return intersect[0];
}

function getItemPoints(item) {
  let points = 1;
  if (item == item.toUpperCase()) {
    points *= itemMultiplier;
  }
  points += item.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  return points;
}

for (line of lines) {
  const lineLength = line.trim().length;
  const splitIndex = lineLength / 2;
  const comp1Contents = line.substr(0, splitIndex);
  const comp2Contents = line.substr(splitIndex);
  comp1 = comp1Contents.split("");
  comp2 = comp2Contents.split("");
  const sharedItem = findIntersection(comp1, comp2);
  const currentPoints = getItemPoints(sharedItem);
  totalPoints += currentPoints;
}

console.log(`Total points: ${totalPoints}`);
