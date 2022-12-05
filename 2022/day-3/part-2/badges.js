const { readFileSync } = require("fs");

const input = readFileSync("../input.txt", "utf-8");
const lines = input.split("\n");

let bags;
let totalPoints = 0;
const itemMultiplier = 27;

function getItemPoints(item) {
  let points = 1;
  if (item == item.toUpperCase()) {
    points *= itemMultiplier;
  }
  points += item.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  return points;
}

for (let i = 0; i < lines.length; i += 3) {
  bags = [
    lines[i].trim().split(""),
    lines[i + 1].trim().split(""),
    lines[i + 2].trim().split(""),
  ];
  const intersect = bags[0].filter(
    (item) => bags[1].includes(item) && bags[2].includes(item)
  );
  const badgeItem = intersect[0];
  const badgePoints = getItemPoints(badgeItem);
  totalPoints += badgePoints;
}

console.log(`Total points: ${totalPoints}`);
