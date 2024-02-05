import { Dimensions, View } from "react-native";
import { LevelData } from "../../lib/interface";
import { LevelButton } from "./LevelButton";
import { getTimerObject } from "../../lib/utils";
import { useMemo } from "react";

interface LevelPageProps {
    name: string,
    start: number,
    number: number,
    saveData: Array<LevelData>,
    enterGame(level: number): void
}

export function LevelPage(props: LevelPageProps){
    const screenWidth = Dimensions.get('window').width;
    const nowClear = useMemo(()=>{
        const rangeName = Array.from(Array(props.number)).map((_,index)=> `${props.name} ${index+props.start}`);
        return  props.saveData.filter((d)=>  rangeName.includes(d.name)).length;
    },[props.saveData])
 return (
    <View style={{
        flexDirection: 'row',  // 橫向排列
        flexWrap: 'wrap',      // 超出寬度換行
        justifyContent: 'space-between',  // 水平居中排列
        padding: 15,            // 可調整需要的內邊距
        width: screenWidth,
    }}>
        <LevelButton
            name="進度"
            note={`${nowClear} / ${props.number}`}
            onPress={()=>{}}
            isClear={nowClear === props.number}
        />
        {Array.from(Array(props.number)).map((_,index)=>{
            const level = index + props.start;
            const name = `${props.name} ${level}`;
            const save =  props.saveData.find((s)=> s.name === name);
            return (
                <LevelButton 
                    key={index}
                    name={name} 
                    note={(save && save.time>0) ? getTimerObject(save.time, true).showTime: undefined} 
                    onPress={()=>{ props.enterGame(level)}}
                    isClear={(save && save.time>0)}
                />
            )})
        }
         
    </View>
 )   
}