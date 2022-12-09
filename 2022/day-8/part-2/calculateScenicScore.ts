import { readFileSync } from "fs";
import { TreeGridScenicCell } from "../treeGridCell";

const treeGrid: TreeGridScenicCell[][] = [];

const gridInputString: string = readFileSync('../input.txt', 'utf-8');
const gridRows: string[] = gridInputString.split('\n');

for (let i = 0; i < gridRows.length; i++) {
    const rowCells = gridRows[i].split('');
    treeGrid.push([]);
    for (let j = 0; j < rowCells.length; j++) {
        treeGrid[i].push({
            height: parseInt(rowCells[j]),
            scenicScoreNorth: 0,
            scenicScoreSouth: 0,
            scenicScoreEast: 0,
            scenicScoreWest: 0,
            totalScore: 0
        })
    }
}

for (let i = 1; i < treeGrid.length - 1; i++) {
    for (let j = 1; j < treeGrid[i].length - 1; j++) {
        const currentCell = treeGrid[i][j];
        //check north score
        let rowIndex = i - 1;
        currentCell.scenicScoreNorth = 1;
        while (rowIndex > 0 && treeGrid[rowIndex][j].height < currentCell.height) {
            currentCell.scenicScoreNorth++;
            rowIndex--;
        }
        //check south score
        rowIndex = i + 1;
        currentCell.scenicScoreSouth = 1;
        while (rowIndex < treeGrid.length - 1 && treeGrid[rowIndex][j].height < currentCell.height) {
            currentCell.scenicScoreSouth++;
            rowIndex++;
        }
        //check west score
        let colIndex = j - 1;
        currentCell.scenicScoreWest = 1;
        while(colIndex > 0 && treeGrid[i][colIndex].height < currentCell.height) {
            currentCell.scenicScoreWest++;
            colIndex--;
        }
        //check east score
        colIndex = j + 1;
        currentCell.scenicScoreEast = 1;
        while(colIndex < treeGrid[i].length - 1 && treeGrid[i][colIndex].height < currentCell.height) {
            currentCell.scenicScoreEast++;
            colIndex++;
        }
        //calculate score
        currentCell.totalScore = currentCell.scenicScoreNorth * currentCell.scenicScoreSouth * currentCell.scenicScoreEast * currentCell.scenicScoreWest;
    }
}

let maxScore = 0;

for (let row of treeGrid) {
    for (let cell of row) {
        if (cell.totalScore > maxScore) {
            maxScore = cell.totalScore;
        }
    }
}

console.log(`Max score: ${maxScore}`);

