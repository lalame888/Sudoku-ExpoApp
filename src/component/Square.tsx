import { GestureResponderEvent, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { SquareValue } from "../lib/interface";
import { StyleSheet } from 'react-native';

interface SquareProps {
    index: number,
    value: SquareValue,
    isSelected: boolean
    onPress(): void;
    error?: boolean // 顯示錯誤
    style?: any
}
export function Square(props: SquareProps){
const styles = StyleSheet.create({
    button: {
      flex:1,
      flexBasis: 1/9, // 每個格子佔外層View的1/9
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: props.value.isFix? 'lightgray': props.error ? '#f09d9d' : '#fefbf3',
      borderColor: props.isSelected? 'red' :  'gray',
      borderWidth: 1, 
      marginRight: props.index %3 === 2 ? 3 : 0,
    },
    text: {},
    popover: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      width: 50,
      height: 50
    }
  });
  function onPress(event: GestureResponderEvent){
    event.stopPropagation();
    props.onPress();
  }
  return (
    <TouchableOpacity 
      style={{...styles.button, ...props.style  }} 
      onPress={onPress} 
      disabled={props.value.isFix}
    >
      <Text style={styles.text}>{props.value.ans || ''} </Text>
    </TouchableOpacity>
  )
}

