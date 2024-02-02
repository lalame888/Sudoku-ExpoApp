import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GameLevel } from '../component';
import { LevelData } from '../lib/interface';
import { removeCells } from '../lib/utils';
import { useState } from 'react';
import { SudokuLevelAns } from '../lib/utils/levelData';
import GamePage from './Game';


interface HomeProps {
    saveData: Array<LevelData>
    setSaveData(newSave: LevelData): void
}

// TODO: 顯示一個一個的關卡、下一頁之類的
export default function HomePage(props: HomeProps) {
  const [selectLevel, setSelectLevel] = useState<number>(-1);
  

  return (
    <View>
        {   selectLevel === -1 ? <View></View>: 
            <GamePage 
                level={selectLevel} 
                setSaveData={props.setSaveData} 
                back={()=> setSelectLevel(-1)}
            />
        }
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
