import { useCallback, useEffect, useMemo, useState } from "react"
import { SudokuPlayground, SquareValue, SudokuRow, SudokuAns, SudokuData } from "../../../lib/interface"

type SelectIndex = {
    row: number,
    col: number
}

type CheckErrorTerm = {
    row: number,
    col: number,
    ans: number | null
}
type CheckMap = Map<number,Array<CheckErrorTerm>>

export function useSudoku(sudokuData: SudokuData){
    // 設置起始題目
    const initData: SudokuPlayground<SquareValue> = useMemo(()=>{
        return sudokuData.init.map((row: SudokuRow<SudokuAns>)=>{
            return row.map((term)=>{
                const value: SquareValue =  {
                    ans: term,
                    guess: new Set(),
                    isFix: term !== null,
                }
                return value
            })
        }) as SudokuPlayground<SquareValue>
    }, [sudokuData])

    const [data, setData] = useState<SudokuPlayground<SquareValue>>(initData)
    const [selected, setSelected] = useState<SelectIndex | undefined>(undefined)
    useEffect(()=>{
        setData(initData);
        setSelected(undefined);
    },[sudokuData])


    // 判斷有錯誤的座標
    const errorArray: Set<SelectIndex> = useMemo(()=>{
        const error = new Set<SelectIndex>();
        const indexArray: Array<CheckErrorTerm> = data.flatMap((row, rowIndex)=> row.map((col, colIndex)=> ({ans: col.ans, row: rowIndex, col:colIndex})))
        function generateGroup(group: CheckMap, key: number, value: CheckErrorTerm) {
            const term = group.get(key);
            if (!term)group.set(key,[value]);
            else group.set(key, [...term, value])
        }
        function checkGroupMap(group: CheckMap){
            function checkGroup(row: Array<CheckErrorTerm>) {
                if (row.every((term)=> term.ans))  { // 該組裡面都有東西
                    const checkSet = new Set(row.map((t)=> t.ans))
    
                    if (checkSet.size !== row.length) {
                        row.forEach((term)=>{
                            error.add({row: term.row, col: term.col})
                        })
                    }
                    
                }
            }
            Array.from(group.entries()).map((v)=> v[1]).forEach((row)=>{
                checkGroup(row);
            })
        }

        const rowMap: CheckMap = new Map()
        const colMap: CheckMap = new Map()
        const groupMap: CheckMap = new Map()
        indexArray.forEach((term)=>{
            // 橫列
            generateGroup(rowMap, term.row, term);

            // 直列
            generateGroup(colMap, term.col, term);

            // 九宮格組
            const groupIndex = Math.floor(term.row/3)*3+ Math.floor(term.col/3);
            generateGroup(groupMap, groupIndex, term);

        })
        checkGroupMap(rowMap);
        checkGroupMap(colMap);
        checkGroupMap(groupMap);
        
        return error;
    },[data])

    // 是否成功完成遊戲
    const isSuccess = useMemo(()=>{
        if (errorArray.size>0) return false;
        const indexArray: Array<CheckErrorTerm> = data.flatMap((row, rowIndex)=> row.map((col, colIndex)=> ({ans: col.ans, row: rowIndex, col:colIndex})))
        if (indexArray.every((t)=> t.ans)) return true; // 沒有錯誤、每個都有填寫 => 答對
        return false;
    },[data, errorArray])

    // 更新格子的數值
    const updateValue = useCallback((newValue: SquareValue)=>{
        if (!selected) return;
        const {row, col} = selected;
        const newArray = data.map((row)=> row.map(t => ({...t}))) as SudokuPlayground<SquareValue>
        newArray[row][col] = newValue;
        setData(newArray)
    },[selected, data])

    // 給予座標，回答該座標是否已被標記為錯誤
    const isError = useCallback((index: SelectIndex)=>{
        return Array.from(errorArray).some((term)=> term.col === index.col && term.row === index.row);
    },[errorArray])

    const superCheat = useCallback(()=>{
        const ans = sudokuData.ans.map((row: SudokuRow<SudokuAns>)=>{
            return row.map((term)=>{
                const value: SquareValue =  {
                    ans: term,
                    guess: new Set(),
                    isFix: true,
                }
                return value
            })
        }) as SudokuPlayground<SquareValue>
        setData(ans);
    },[sudokuData])

    return {data,selected,setSelected, isError , isSuccess, updateValue,
        superCheat
    
    }
}