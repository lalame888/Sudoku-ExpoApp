import { GameLevel } from '../component';
import { LevelData } from '../lib/interface';
import { removeCells } from '../lib/utils';
import { useEffect, useState } from 'react';
import { SudokuLevelAns } from '../lib/utils/levelData';
import { View } from 'react-native';
import { useSaveData } from '../lib/hook/Provider';
import { GamePageProps } from '../lib/interface/StackNavigator';


export default function GamePage(props: GamePageProps) {
  const {level, name} = props.route.params;
  const [data, setData] = useState<LevelData>(generate(level, name))
  const {updateSaveData} = useSaveData();
  
  function generate(level: number, name?: string): LevelData {
    const difficulty = Math.sqrt(level + 5) *0.1 * 0.9;
    const ans = SudokuLevelAns[Math.floor(Math.random()* SudokuLevelAns.length)]; // 直接亂數隨機
    const init = removeCells(ans, difficulty)
    return {
      level,
      name: name || `Level ${level}`,
      difficulty,
      data: {ans, init},
      time: -1,
      helpCount: 0
    }
  }
  function Next(){
    setData((oldData)=> {
      const newGame = generate(oldData.level + 1)
      props.navigation.setOptions({title: newGame.name})
      return newGame;
    });
  }
  function Back(){
    props.navigation.navigate('Home')
  }
  useEffect(()=>{
    const newGame = generate(level, name);
    setData(newGame);
    props.navigation.setOptions({title: newGame.name})
  },[level, name])
  
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <GameLevel 
        sudokuData={data}
        next={Next}
        back={Back}
        setSaveData={updateSaveData}
      />
    </View>
  );
}

