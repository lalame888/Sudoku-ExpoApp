import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface LevelTabButtonProps {
    onPress(): void
    title: string
    activity: boolean
}
export function LevelTabButton(props: LevelTabButtonProps){
    const styles = StyleSheet.create({
        pageButton: {
          flex: 1, // 將按鈕的寬度平均分配
          backgroundColor: props.activity? '#e2b11f' :'#2C3E50',
          padding: 10,
          margin: 5,
          borderRadius: 8,
          alignItems: 'center',
        },
        buttonText: {
          color: '#ECF0F1',
          fontSize: 16,
          fontWeight: 'bold',
        },
      });
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.pageButton}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    )
}

  