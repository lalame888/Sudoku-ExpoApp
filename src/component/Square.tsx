import { Dimensions, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { SquareValue } from "../lib/interface";
import { StyleSheet } from 'react-native';
import Popover from "react-native-popover-view";

interface SquareProps {
    index: number,
    value: SquareValue,
    setValue(newValue: SquareValue): void;
    error?: boolean // 顯示錯誤
}
export function Square(props: SquareProps){
  const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    button: {
      flexBasis: '11%', // 每個格子佔外層View的1/3
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: props.error ? '#f09d9d' : '#fefbf3',
      borderColor: 'gray', borderWidth: 1,
      marginRight: props.index %3 === 2 ? 2 : 0,
      borderRightWidth:  props.index %3 === 2 ? 2 : 0,
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
  function onPress (){

  }
    return (
        <Popover
        
          from={(
            <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{props.value.ans || ''} </Text>
            </TouchableOpacity>
          )}
        >
        <View style={styles.popover}>

        </View>
    </Popover>)
}

