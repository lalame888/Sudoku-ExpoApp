import { View, Text, Button } from "react-native";
import { LevelData } from "../lib/interface";

interface HomeMenuProps {
    enterGame(level: number, name?: string): void;
    saveData: Array<LevelData>
}
export function HomeMenu(props: HomeMenuProps){
return(<View>
    <Text>HomeMenu</Text>
    <Button onPress={()=>{props.enterGame(40)}} title="進入關卡"/>
</View>)
}