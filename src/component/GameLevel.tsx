import { useMemo, useState } from 'react'
import { SquareValue, SudokuAns, SudokuData, SudokuPlayground, SudokuRow } from '../lib/interface/'
import { View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Square } from './Square'

interface GameLevelProps {
    level: number,
    sudokuData: SudokuData
}

type SelectIndex = {
    row: number,
    col: number
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
            flexGrow: 1,
            marginTop: 50
        },
        consoleKeyboard: {
            flexDirection: 'row',
            flex: 1, 
            width: outerContainerSize-10,
            alignItems: 'flex-end',
            marginBottom: 40
        },
        numberKey:{
            borderRadius: 10,
            height: 50
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
                                    return (
                                        <Square 
                                            index={colIndex} key={colIndex}
                                            value={term} 
                                            isSelected={selected!== undefined&& selected.row === rowIndex && selected.col === colIndex} 
                                            onPress={()=> setSelected({row:rowIndex, col:colIndex}) } 
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
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
      
    
}
