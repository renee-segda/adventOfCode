const { readFileSync } = require("fs");

const shapePoints = {
  A: 1,
  B: 2,
  C: 3,
};

const outcomePoints = {
  Z: 6,
  Y: 3,
  X: 0,
};

const opponentMoveToWinningMove = {
  A: "B",
  B: "C",
  C: "A",
};

const opponentMoveToLosingMove = {
  A: "C",
  B: "A",
  C: "B",
};

function calculateRoundScore(oppMove, desiredOutcome) {
  let yourMove;
  switch (desiredOutcome) {
    case "X":
      yourMove = opponentMoveToLosingMove[oppMove];
      break;
    case "Y":
      yourMove = oppMove;
      break;
    default:
      yourMove = opponentMoveToWinningMove[oppMove];
      break;
  }
  return outcomePoints[desiredOutcome] + shapePoints[yourMove];
}

const lines = readFileSync("../input.txt", "utf-8").split("\n");

let totalScore = 0;

for (let line of lines) {
  const inputs = line.split(" ");
  const oppMove = inputs[0].trim();
  const outcome = inputs[1].trim();
  const roundScore = calculateRoundScore(oppMove, outcome);
  totalScore += roundScore;
}

console.log(`Total score: ${totalScore}`);
