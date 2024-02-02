import { SquareValue, SudokuData } from '../lib/interface/'
import { View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, Modal } from 'react-native'
import { Square } from './Square'
import { useTimer } from '../lib/hook'
import { useSudoku } from './useHook/useSudoku'

interface GameLevelProps {
    level: number,
    sudokuData: SudokuData
}

export function GameLevel(props: GameLevelProps){
    const {timeText, showTime, isPaused, startTimer, pauseTimer} = useTimer();
    const {data,selected,setSelected, isError , isSuccess, updateValue} = useSudoku(props.sudokuData) 
    const MARGIN = 10;  
    const { width, height } = Dimensions.get('window');
    const outerContainerSize = Math.min(width - MARGIN*2, (height/2)-MARGIN*2); // 設定外層正方形的大小，可以自行調整
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: MARGIN,
            marginTop: 80,
        },
        textContainer: {
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 10
        },
        title: {
            fontWeight: 'bold',
            marginRight: 10,
            fontSize: 18,
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

    return (
        <View>
            <TouchableWithoutFeedback style={{ backgroundColor: 'gray', flex:1}} onPress={()=>setSelected(undefined)}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}> Level: {props.level} </Text>
                        <Text>經過時間 {showTime}</Text>
                    </View>
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
                                                error={isError(index)}
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
                        <Square  // 清空
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
            <Modal visible={isSuccess}>
                完成關卡！ 花費時間: {timeText}
                
            </Modal>
        </View>
    )
      
    
}
