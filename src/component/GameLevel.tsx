import { useMemo, useState } from 'react'
import { SquareValue, SudokuAns, SudokuData, SudokuPlayground, SudokuRow } from '../lib/interface/'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { Square } from './Square'

interface GameLevelProps {
    level: number,
    sudokuData: SudokuData
}

export function GameLevel(props: GameLevelProps){
   
    const initData: SudokuPlayground<SquareValue> = useMemo(()=>{
        return props.sudokuData.init.map((row: SudokuRow<SudokuAns>)=>{
            return row.map((term)=>{
                const value: SquareValue =  {
                    ans: term,
                    guess: new Set(),
                    isFix: true,
                }
                return value
            })
        }) as SudokuPlayground<SquareValue>
    }, [props.sudokuData])
    const [data, setData] = useState<SudokuPlayground<SquareValue>>(initData)
const MARGIN = 50;  
const { width, height } = Dimensions.get('window');
const outerContainerSize = Math.min(width - MARGIN*2, height-MARGIN*2); // 設定外層正方形的大小，可以自行調整
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: MARGIN,
    },
    title: {
        fontWeight: 'bold'
    },
    playground: {
        width: outerContainerSize-10,
        height: outerContainerSize-10,
        borderColor: 'gray', borderWidth: 1,
    },
    row: {
        flexDirection: "row",
        margin: 0,
        flexGrow: 1,
    },
});
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Level: {props.level} </Text>
            <View style={styles.playground}>
                {data.map((rows, index)=>{
                    return(
                        <View style={{...styles.row, marginBottom: (index%3 ===2 && index !== 8) ? 2 : 0}} key={index}>
                            {rows.map((term, i)=>{
                                return <Square index={i} key={i} value={term} setValue={(newValue)=>{
                                    const newArray = data.map((row)=> row.map(t => ({...t}))) as SudokuPlayground<SquareValue>
                                    newArray[index][i] = newValue;
                                    setData(newArray)
                                }}/>
                            })}
                        </View>
                    )
                })}
            </View>
        </View>
    )
      
    
}
