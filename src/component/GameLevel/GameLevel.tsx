import { LevelData, SquareValue, SudokuAns, SudokuPlayground } from '../../lib/interface/'
import { FontAwesome5 } from '@expo/vector-icons';
import { View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, Modal, TouchableOpacity, Button } from 'react-native'
import { Square } from './Square'
import { useTimer } from '../../lib/hook'
import { useSudoku } from './useHook/useSudoku'
import { useEffect } from 'react';

// TODO:
/**
 * 1. 主畫面
 * 2. 開關錯誤檢查功能 （不要一開始就開啟，或是可以預設開啟，後來關閉）
 * 3. 筆記、猜測功能切換
 * 4. 設置：回主頁面、重新遊戲、跟開關錯誤項之類的設定放一起
 * 5. 回上一頁或回主畫面的時候double check，確認是否要捨棄目前的遊戲進度（如果有填寫內容的時候問）
 */
interface GameLevelProps {
    sudokuData: LevelData,
    next(): void,
    back(): void,
    setSaveData(newSave: LevelData): void;
}

export function GameLevel(props: GameLevelProps){
    const {timer, timeText, showTime, isPaused, startTimer, pauseTimer} = useTimer(props.sudokuData.data);
    const {data,selected,setSelected, isError , isSuccess, updateValue, superCheat} = useSudoku(props.sudokuData.data) 
    const MARGIN = 10;  
    const { width, height } = Dimensions.get('window');
    const outerContainerSize = Math.min(width - MARGIN, ((height-60)/2)-MARGIN*2); // 設定外層正方形的大小，可以自行調整
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: MARGIN,
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
            marginTop: 40
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
        },
        modelView: {
            flex: 1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: 'white'
        }
    });
    useEffect(()=>{
        // 完成關卡
        if (isSuccess) {
            pauseTimer(); // 停止計時
            props.setSaveData({  // 儲存資料
                ...props.sudokuData,
                time: timer,
                data: {
                    ...props.sudokuData.data,
                    ans: data.map((row)=> row.map((col)=> col.ans)) as SudokuPlayground<SudokuAns>
                }
            })
        }
    },[isSuccess])

    return (
        <View>
            <TouchableWithoutFeedback style={{ backgroundColor: 'gray', flex:1}} onPress={()=>setSelected(undefined)}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}> Level: {props.sudokuData.level} </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text>經過時間 {showTime}</Text>
                            <TouchableOpacity onPress={pauseTimer} style={{marginLeft: 10}}>
                                <FontAwesome5 name="pause-circle" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
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
                        <View>
                            <Button title='作弊' onPress={superCheat}/>
                        </View>
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
            <Modal visible={isPaused && !isSuccess}>
                <View style={styles.modelView}>
                    <Text>遊戲暫停! </Text>
                    <Text style={{marginBottom: 10}}>{showTime}</Text>
                    <Button onPress={startTimer} title='繼續'/>
                </View>
                
            </Modal>
            <Modal visible={isSuccess} 
                animationType="none"
                transparent={true} 
            >
                <View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.5)' , justifyContent: 'flex-end', paddingBottom: '15%',
    alignItems: 'center',}} >
                    <View style={{flex:1/6, flexWrap: 'wrap', backgroundColor: 'white', padding: 50, borderRadius: 20, borderColor: 'gray', borderWidth: 1, justifyContent: 'space-around'}}>
                        <Text>完成關卡！ 花費時間: {timeText}</Text>
                        <View  style={styles.textContainer}>
                            <Button title='回主頁面' onPress={props.back}/>
                            <Button title='下一關' onPress={props.next}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
      
    
}
