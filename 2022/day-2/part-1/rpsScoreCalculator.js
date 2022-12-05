const { readFileSync } = require("fs");

const shapePoints = {
  X: 1,
  Y: 2,
  Z: 3,
};

const yourMoveTranslations = {
  X: "A",
  Y: "B",
  Z: "C",
};

const outcomePoints = {
  win: 6,
  tie: 3,
  lose: 0,
};

const opponentMoveToWinningMove = {
  A: "Y",
  B: "Z",
  C: "X",
};

function calculateRoundScore(yourMove, oppMove) {
  if (yourMoveTranslations[yourMove] == oppMove) {
    return outcomePoints.tie + shapePoints[yourMove];
  } else if (opponentMoveToWinningMove[oppMove] == yourMove) {
    return outcomePoints.win + shapePoints[yourMove];
  } else {
    return shapePoints[yourMove];
  }
}

const lines = readFileSync("../input.txt", "utf-8").split("\n");

let totalScore = 0;

for (let line of lines) {
  const moves = line.split(" ");
  const roundScore = calculateRoundScore(moves[1].trim(), moves[0].trim());
  totalScore += roundScore;
}

console.log(`Total score: ${totalScore}`);
