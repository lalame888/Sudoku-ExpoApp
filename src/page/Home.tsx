import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { HomePageProps } from '../lib/interface/StackNavigator';
import { SecureStoreState } from '../lib/hook';
import { HomeMenu } from '../component/HomeMenu';
import { useSaveData } from '../lib/hook/Provider';


// TODO: 顯示一個一個的關卡、下一頁之類的
 export function HomePage({ navigation, route }: HomePageProps){
 // 載入資料
  const {saveData, status} = useSaveData();
  function enterGame(level: number, name?: string) {
    navigation.navigate('Game', {level, name})
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white',  justifyContent: 'center', alignItems: 'center'}}>
        {   
        (status === SecureStoreState['LOADING'] || !saveData) ? 
            <Text><ActivityIndicator size="large" color="blue" /></Text>:
        
           <HomeMenu enterGame={enterGame} saveData={saveData}/>
        }
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

