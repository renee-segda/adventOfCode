const { readFileSync, writeFileSync } = require("fs");

function parseStacksAndSteps(inputFile) {
  const file = readFileSync(inputFile, "utf-8");
  const lines = file.split("\n");
  let blankIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] == "") {
      blankIndex = i;
      break;
    }
  }
  const numberLine = lines[blankIndex - 1];
  const numbers = numberLine.trim().split(/\s+/);
  const stacks = [];
  for (let n of numbers) {
    stacks.push([]);
  }
  for (let i = blankIndex - 2; i >= 0; i--) {
    const currentLine = lines[i];
    const crates = currentLine.match(/.{1,4}/g);
    for (let j = 0; j < crates.length; j++) {
      const c = crates[j].trim();
      if (c && c != "") {
        stacks[j].unshift(c[1]);
      }
    }
  }
  const steps = [];
  for (let i = blankIndex + 1; i < lines.length; i++) {
    steps.push(lines[i].trim());
  }

  return {
    stacks,
    steps,
  };
}

function processMovementStep(step, stacks) {
  const values = step.match(/\d+/g);
  const numCrates = Number.parseInt(values[0]);
  const srcStack = Number.parseInt(values[1]) - 1;
  const destStack = Number.parseInt(values[2]) - 1;

  const initSrcLen = stacks[srcStack].length;
  const initDestLen = stacks[destStack].length;

  const tempCrateStore = [];

  for (let i = 0; i < numCrates; i++) {
    const tempElement = stacks[srcStack].shift();
    if (tempElement) {
      tempCrateStore.push(tempElement);
    }
  }
  stacks[destStack].unshift(...tempCrateStore);

  const expSrcLen = initSrcLen - numCrates;
  const expDestLen = initDestLen + numCrates;
  if (stacks[srcStack].length != expSrcLen) {
    console.log(`Src stack length incorrect! ${step}`);
  }
  if (stacks[destStack].length != expDestLen) {
    console.log(`Dest stack length incorrect! ${step}`);
  }
}

const { stacks, steps } = parseStacksAndSteps("../input.txt");

let printout = "";

printout += JSON.stringify(stacks) + "\n";

for (step of steps) {
  printout += step.toString() + "\n";
  processMovementStep(step, stacks);
  printout += JSON.stringify(stacks) + "\n";
}

writeFileSync("../output.txt", printout);
