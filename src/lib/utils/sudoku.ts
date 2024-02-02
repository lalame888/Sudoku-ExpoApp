import { SudokuAns, SudokuPlayground, SudokuRow } from "../interface";

export function generateSudoku(): SudokuPlayground<SudokuAns> {
    const board: SudokuPlayground<SudokuAns> = Array.from({ length: 9 }, () => Array(9).fill(null)) as SudokuPlayground<SudokuAns>;
  
    fillSudoku(board);
    // console.log(board);
    return board;
}
  
  function fillSudoku(board: SudokuPlayground<SudokuAns>) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const options: SudokuRow<SudokuAns> = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of options) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            break;
          }
        }
        if (board[row][col] === null) {
            fillSudoku(board)
        }
    }
}
  
}
  
  function isValid(board: SudokuPlayground<SudokuAns>, row: number, col: number, num: SudokuAns): boolean {
    for (let i = 0; i < 9; i++) {
      if (
        board[row][i] === num ||
        board[i][col] === num ||
        board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] === num
      ) {
        return false;
      }
    }
  
    return true;
  }
  
  function shuffle(array: SudokuRow<SudokuAns>): SudokuRow<SudokuAns> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  export function removeCells(board: SudokuPlayground<SudokuAns>, difficulty: number): SudokuPlayground<SudokuAns> {
    const newBoard = board.map((row)=> row.map(t=> t)) as SudokuPlayground<SudokuAns>;
    const cellsToRemove: number = Math.max(Math.min(Math.floor(81 * difficulty), 58),22);
  
    for (let i = 0; i < cellsToRemove; i++) {
      const row: number = Math.floor(Math.random() * 9);
      const col: number = Math.floor(Math.random() * 9);
  
      if (newBoard[row][col] !== null) {
        const backup: SudokuAns = newBoard[row][col];
        newBoard[row][col] = null;
  
        // 检查是否有唯一解
        if (countSolutions(newBoard) !== 1) {
          newBoard[row][col] = backup; // 恢复原值
        }
      }
    }

    return newBoard;
  }
  
  function countSolutions(board: SudokuPlayground<SudokuAns>): number {
    const emptyCell: [number, number] | null = findEmptyCell(board);
  
    if (!emptyCell) {
      return 1; // 找到一个解决方案
    }
  
    const [row, col] = emptyCell;
    let count: number = 0;
  
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num as SudokuAns)) {
        board[row][col] = num as SudokuAns;
  
        count += countSolutions(board) || 0;
  
        board[row][col] = null; // 回溯
      }
    }
  
    return count;
  }
  
  function findEmptyCell(board: SudokuPlayground<SudokuAns>): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          return [row, col];
        }
      }
    }
  
    return null;
  }  
  