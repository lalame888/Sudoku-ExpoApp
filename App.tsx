import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import {HomePage} from './src/page/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { RootStackParamList } from './src/lib/interface/StackNavigator';
import { DataProvider } from './src/lib/hook/Provider';
import GamePage from './src/page/Game';


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <DataProvider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar></StatusBar>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {
                backgroundColor: 'white', //橘色
            }}}>
            <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home'}} />
            <Stack.Screen name="Game" component={GamePage} options={{title: 'RRR'}} />
            
            {/* 其他頁面的設置 */}
          </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </DataProvider>
)
}


