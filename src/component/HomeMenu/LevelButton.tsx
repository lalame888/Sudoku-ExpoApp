import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

interface LevelButtonProps {
    name: string,
    time: string | undefined,
    onPress(): void;
}
export function LevelButton(props: LevelButtonProps){
    const style =StyleSheet.create({
        button: {
            backgroundColor: props.time ? '#c2f0c8' : '#fff0e3',
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
        color: 'darkgreen',
        },
    })
    return <TouchableOpacity style={style.button} onPress={props.onPress}>
            <Text style={style.levelText}>{props.name}</Text>
            <Text style={style.clearanceTimeText}>{props.time || ''}</Text>
    </TouchableOpacity>
}