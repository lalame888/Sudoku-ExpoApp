import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GameLevel } from './src/component';
import { LevelData, SudokuAns, SudokuPlayground, SudokuRow } from './src/lib/interface';
import { generateSudoku, removeCells } from './src/lib/utils';
import { useState } from 'react';
import { SudokuLevelAns } from './src/lib/utils/levelData';

export default function App() {
  function generate(level: number): LevelData {
    const difficulty = Math.sqrt(level + 5) *0.1 * 0.9;
    const ans = (level < SudokuLevelAns.length) ? SudokuLevelAns[level - 1] : SudokuLevelAns[Math.floor(Math.random()* SudokuLevelAns.length)];
    const init = removeCells(ans, difficulty)
    return {
      level,
      difficulty,
      data: {ans, init},
      time: -1,
      helpCount: 0
    }
  }
  const [data, setData] = useState<LevelData>(generate(1))
  
  function Next(){
    setData((oldData)=> generate(oldData.level + 1));
  }
  

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <GameLevel 
        sudokuData={data}
        back={()=>{}}
        next={Next}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
