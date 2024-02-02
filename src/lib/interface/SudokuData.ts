export type SudokuData = {
    init: SudokuPlayground<SudokuAns>,
    ans: SudokuPlayground<SudokuAns>,
}


export type SudokuRow<T> = [T,T,T,T,T,T,T,T,T];

export type SudokuPlayground<T> = [SudokuRow<T>,SudokuRow<T>,SudokuRow<T>,SudokuRow<T>,SudokuRow<T>,SudokuRow<T>,SudokuRow<T>,SudokuRow<T>,SudokuRow<T>];

export type SudokuAns = 1 | 2 | 3| 4 | 5 | 6 | 7 | 8| 9 | null;

export type SquareValue = {
    ans: SudokuAns
    guess: Set<SudokuAns>,
    isFix: boolean // 是不是固定的題目
}
