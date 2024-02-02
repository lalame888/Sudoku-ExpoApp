import { useMemo, useState } from 'react'
import { SquareValue, SudokuAns, SudokuData, SudokuPlayground, SudokuRow } from '../lib/interface/'
import { View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Square } from './Square'

interface GameLevelProps {
    level: number,
    sudokuData: SudokuData
}

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
function setEqual(set: Set<SelectIndex>, value: SelectIndex) {
    return Array.from(set).some((term)=> term.col === value.col && term.row === value.row);
}
export function GameLevel(props: GameLevelProps){
    const initData: SudokuPlayground<SquareValue> = useMemo(()=>{
        return props.sudokuData.init.map((row: SudokuRow<SudokuAns>)=>{
            return row.map((term)=>{
                const value: SquareValue =  {
                    ans: term,
                    guess: new Set(),
                    isFix: term !== null,
                }
                return value
            })
        }) as SudokuPlayground<SquareValue>
    }, [props.sudokuData])
    const [data, setData] = useState<SudokuPlayground<SquareValue>>(initData)
    const [selected, setSelected] = useState<SelectIndex | undefined>(undefined)
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
            const col = colMap.get(term.col);
            if (!col)colMap.set(term.col,[term]);
            else colMap.set(term.col, [...col, term])

            // 九宮格組
            const groupIndex = Math.floor(term.row/3)*3+ Math.floor(term.col/3);
            generateGroup(groupMap, groupIndex, term);

        })
        checkGroupMap(rowMap);
        checkGroupMap(colMap);
        checkGroupMap(groupMap);
        
        return error;
    },[data])
    const MARGIN = 10;  
    const { width, height } = Dimensions.get('window');
    const outerContainerSize = Math.min(width - MARGIN*2, height-MARGIN*2); // 設定外層正方形的大小，可以自行調整
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: MARGIN,
            marginTop: 80,
        },
        title: {
            fontWeight: 'bold'
        },
        checkerboard: {
            width: outerContainerSize-10,
            height: outerContainerSize-10,
        },
        row: {
            flexDirection: "row",
            margin: 0,
            flexGrow: 1,
        },
        console: {
            flex: 1,
            marginTop: 50
        },
        consoleKeyboard: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: (outerContainerSize-10)/2,
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            backgroundColor: 'lightgray'
        },
        numberKey:{
            height: (outerContainerSize-10)/6,
            width: (outerContainerSize-10)/6,
            flexBasis: '33%',
        }
    });
  
    function updateValue(newValue: SquareValue) {
        if (!selected) return;
        const {row, col} = selected;
        const newArray = data.map((row)=> row.map(t => ({...t}))) as SudokuPlayground<SquareValue>
        newArray[row][col] = newValue;
        setData(newArray)
    }
    return (
        <TouchableWithoutFeedback style={{ backgroundColor: 'gray'}} onPress={()=>setSelected(undefined)}>
            <View style={styles.container}>
                <Text style={styles.title}> Level: {props.level} </Text>
                <View style={styles.checkerboard}>
                    {data.map((rows, rowIndex)=>{
                        return(
                            <View style={{...styles.row, marginBottom: (rowIndex%3 ===2 && rowIndex !== 8) ? 3 : 0}} key={rowIndex}>
                                {rows.map((term, colIndex)=>{
                                    const index = {row:rowIndex, col:colIndex};
                                    return (
                                        <Square 
                                            index={colIndex} key={colIndex}
                                            value={term} 
                                            isSelected={selected!== undefined&& selected.row === rowIndex && selected.col === colIndex} 
                                            onPress={()=> setSelected(index) } 
                                          error={setEqual(errorArray,index)}
                                        />
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

                <View style={styles.console}>
                    <View style={styles.consoleKeyboard}>
                    {Array.from(Array(9)).map((t,i)=>{
                        const value ={ans:i+1, guess: new Set(), isFix: false} as SquareValue; 
                        return(
                            <Square 
                                style={styles.numberKey}
                                index={0} key={i}
                                value={value} 
                                isSelected={false} 
                                onPress={()=> {
                                    if (selected) {
                                        updateValue({...value, guess: data[selected.row][selected.col].guess})
                                    }
                                }} 
                            />
                        )
                    })}
                    <Square 
                        style={styles.numberKey}
                        index={0} 
                        isSelected={false} 
                        onPress={()=> {
                            if (selected) updateValue({ans: null, guess: data[selected.row][selected.col].guess, isFix: false})

                        }} 
                    />
                   
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
      
    
}
