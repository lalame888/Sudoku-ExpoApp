import { GameLevel } from '../component';
import { LevelData } from '../lib/interface';
import { generateSudoku, randomInt, removeCells } from '../lib/utils';
import { useEffect, useState } from 'react';
import { SudokuLevelAns } from '../lib/data/';
import { View } from 'react-native';
import { useSaveData } from '../lib/hook/Provider';
import { GamePageProps } from '../lib/interface/StackNavigator';


export default function GamePage(props: GamePageProps) {
  const {level, name} = props.route.params;
  const {updateSaveData, usedMapNumber} = useSaveData();

  const [data, setData] = useState<LevelData>(generate(level, name))
  function findNextMapNumber(): number{
    // 為了不要讓玩過的地圖重複的機制
    if (usedMapNumber.length >= SudokuLevelAns.length) return -1;
    const filterArray = Array.from(Array(SudokuLevelAns.length)).map((t,index)=> index).filter((i)=>{
      return !usedMapNumber.includes(i)
    });
      
    const nextNumber = randomInt(filterArray.length  - 1);
    return filterArray[nextNumber];
  }
  
  function generate(level: number, name?: string): LevelData {
    const difficulty = Math.sqrt(level + 5) *0.1 * 0.9;
    const mapNumber = findNextMapNumber();
    let ans;
    if (mapNumber === -1) {
      try {
        ans = generateSudoku();
      } catch (error) {
        console.log(`生成地圖失敗，重新生成 >> ${error}`);
      }
    } else {
      ans = SudokuLevelAns[mapNumber]; // 直接選擇現有地圖
    }
     if (ans === undefined) {
      console.log(`重新生成地圖失敗，使用現有地圖`);
      ans = SudokuLevelAns[randomInt(SudokuLevelAns.length - 1)];
     }
    const init = removeCells(ans, difficulty)
    return {
      level,
      name: name || `Level ${level}`,
      difficulty,
      data: {ans, init},
      time: -1,
      helpCount: 0,
      mapNumber
    }
  }
  function Next(){
    setData((oldData)=> {
      const newGame = generate(oldData.level + 1)
      return newGame;
    });
  }
  
  function Back(){
    props.navigation.navigate('Home')
  }

  useEffect(()=>{
    const newGame = generate(level, name);
    setData(newGame);
  },[level, name])
  useEffect(()=>{
    props.navigation.setOptions({title: data.name})
  },[data])

  
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

