import { ReactNode, createContext, useContext, useMemo } from "react";
import { LevelData } from "../interface";
import { SecureStoreState, useSecureStore } from "./SecureStore";

const initData = {
  saveData: [] as LevelData[] | null | undefined , 
  updateSaveData:(newSave: LevelData)=>{},
  status: SecureStoreState['LOADING'] , 
  usedMapNumber: [] as Array<number>
}
const DataContext = createContext(initData);

interface Props {
    children: ReactNode
}
export function DataProvider(props: Props){
    const [saveData, setSaveData, status] = useSecureStore<LevelData[]>('sudokuData',[]);
    function updateSaveData(newSave: LevelData) {
      setSaveData((arr)=>{
        if (!arr) return [newSave];
        const index = arr.findIndex((term)=> term.name === newSave.name);
        if (index === -1) return [...arr, newSave];
        if (newSave.time < arr[index].time) {
            const newArr = [...arr];
            newArr[index] = newSave;
            return newArr;
        }
        return arr;
      })
    }
    const usedMapNumber = useMemo(()=>{
      return saveData?.map((t)=> t.mapNumber) || [];
    },[saveData])
    return (
        <DataContext.Provider value={{ saveData, status, updateSaveData, usedMapNumber }}>
          {props.children}
        </DataContext.Provider>
      );
}
export const useSaveData = () => useContext(DataContext);
