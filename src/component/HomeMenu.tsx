import { View, Text, Button } from "react-native";
import { LevelData } from "../lib/interface";
import { useMemo } from "react";

interface HomeMenuProps {
    enterGame(level: number, name?: string): void;
    saveData: Array<LevelData>
}
export function HomeMenu(props: HomeMenuProps) {
const TOTAL = 100;
const saveData: Array<LevelData> = useMemo(()=>{
    return props.saveData.filter((data)=> data.time!== -1 && data.name.includes('Level '));
},[props.saveData])

return(<View>
    <Text>HomeMenu</Text>
    <Button onPress={()=>{props.enterGame(40)}} title="進入關卡"/>
</View>)
}