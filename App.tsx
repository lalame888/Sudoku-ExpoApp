import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GameLevel } from './src/component';
import { LevelData, SudokuAns, SudokuPlayground, SudokuRow } from './src/lib/interface';
import { generateSudoku, removeCells } from './src/lib/utils';
import { useState } from 'react';
import { SudokuLevelAns } from './src/lib/utils/levelData';
import { SecureStoreState, useSecureStore } from './src/lib/hook';
import HomePage from './src/page/Home';

export default function App() {
  // 載入資料
  const [saveData, setSaveData, status] = useSecureStore<LevelData[]>('sudokuData',[]);
  function updateSaveData(newSave: LevelData) {
    setSaveData((arr)=>{
      if (!arr) return [newSave];
      const index = arr.findIndex((term)=> term.level);
      if (index === -1) return [...arr, newSave];
      const newArr = [...arr];
      newArr[index] = newSave;
      return newArr;
    })
  }
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      {(status === SecureStoreState['LOADING'] || !saveData) ? 
          <Text><ActivityIndicator size="large" color="blue" /></Text>
        :
      <HomePage
        saveData={saveData}
        setSaveData={updateSaveData}
      />}
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
