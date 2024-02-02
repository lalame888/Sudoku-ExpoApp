import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GameLevel } from './src/component';
import { SudokuAns, SudokuPlayground, SudokuRow } from './src/lib/interface';

export default function App() {
  const fakeData: SudokuRow<SudokuAns> = [1,2,3,4,5,6,7,8,9];
  const fakeRow: SudokuPlayground<SudokuAns> = [fakeData,fakeData,fakeData,fakeData,fakeData,fakeData,fakeData,fakeData,fakeData];
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <GameLevel level={0} sudokuData={{
        init: fakeRow,
        ans: fakeRow
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
