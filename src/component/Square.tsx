import { GestureResponderEvent, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { SquareValue } from "../lib/interface";
import { StyleSheet } from 'react-native';
import { useMemo } from "react";

interface SquareProps {
    index: number,
    value?: SquareValue,
    isSelected: boolean
    onPress(): void;
    error?: boolean // 顯示錯誤
    style?: StyleProp<ViewStyle>;
}
export function Square(props: SquareProps){
  const backgroundColor = useMemo(()=>{
    if (!props.value) return 'white';
    if (props.value.isFix) return'lightgray'
    if (props.error) return  '#f09d9d' 
    if(props.value.ans === null ) return 'white' 
    return '#fefbf3'
  },[props.value, props.error])
const styles = StyleSheet.create({
    button: {
      flex:1,
      flexBasis: 1/9, // 每個格子佔外層View的1/9
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor,
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
      style={[styles.button,props.style]} 
      onPress={onPress} 
      disabled={props.value?.isFix}
      activeOpacity={0.65}
    >
      <Text style={styles.text}>{props.value ?  props.value.ans|| '' : '清空'} </Text>
    </TouchableOpacity>
  )
}

