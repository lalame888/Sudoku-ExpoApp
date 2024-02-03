import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface GameProps {
  level: number,
  name?: string,
}

export type RootStackParamList = {
  Home: undefined,
  Game: GameProps,
};
export type HomePageProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type GamePageProps = NativeStackScreenProps<RootStackParamList, 'Game'>;
