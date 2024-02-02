import { GameLevel } from '../component';
import { LevelData } from '../lib/interface';
import { removeCells } from '../lib/utils';
import { useState } from 'react';
import { SudokuLevelAns } from '../lib/utils/levelData';


interface GameProps {
    level: number,
    setSaveData(newSave: LevelData): void
    back(): void;
}
export default function GamePage(props: GameProps) {
  const [data, setData] = useState<LevelData>(generate(props.level))
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
  function Next(){
    setData((oldData)=> generate(oldData.level + 1));
  }
  
  return (
    <GameLevel 
      sudokuData={data}
      back={props.back}
      next={Next}
      setSaveData={props.setSaveData}
    />
  );
}

