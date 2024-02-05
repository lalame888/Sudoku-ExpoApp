import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

interface LevelButtonProps {
    name: string,
    note: string | undefined,
    onPress(): void;
    isClear?: boolean
}
export function LevelButton(props: LevelButtonProps){
    const isInfo = props.name === '進度';
    const style =StyleSheet.create({
        button: {
            backgroundColor: (props.isClear) ? '#c2f0c8' :  (isInfo) ?'lightgray' :'#fff0e3',
            padding: 10,
            margin: 5,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            width: '25%'
        },
        levelText: {
            fontSize: 18,
            fontWeight: 'bold',
          },
        clearanceTimeText: {
        marginTop: 5,
        color: props.isClear ? 'darkgreen' : 'black',
        },
    })
    return <TouchableOpacity style={style.button} onPress={props.onPress}>
            <Text style={style.levelText}>{props.name}</Text>
            <Text style={style.clearanceTimeText}>{props.note || ''}</Text>
    </TouchableOpacity>
}