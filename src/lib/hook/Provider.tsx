import { ReactNode, createContext, useContext } from "react";
import { LevelData } from "../interface";
import { SecureStoreState, useSecureStore } from "./SecureStore";

const DataContext = createContext({saveData: [] as LevelData[] | null | undefined , updateSaveData:(newSave: LevelData)=>{},status: SecureStoreState['LOADING'] });

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
    return (
        <DataContext.Provider value={{ saveData, status, updateSaveData }}>
          {props.children}
        </DataContext.Provider>
      );
}
export const useSaveData = () => useContext(DataContext);
