import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum SecureStoreState {
  'LOADING',
  'READY',
}

export function useSecureStore<T>(
  key: string,
  init?: T,
): [
  T | undefined | null,
  React.Dispatch<React.SetStateAction<T | undefined | null>>,
  SecureStoreState,
] {
  const appName = 'SudokuApp';
  const [state, setState] = useState<SecureStoreState>(
    SecureStoreState.LOADING,
  );
  const [data, setData] = useState<T | undefined | null>(undefined);
  useEffect(() => {
    const loadData = async () => {
      const savedState = await AsyncStorage.getItem(`@${appName}:${key}`);

      setState(SecureStoreState.READY);
      if (savedState !== null) {
        try {
          const jsonObject = JSON.parse(savedState);
          setData(jsonObject);
        } catch (error) {
          setData(savedState as T);
        }
      } else {
        setData(init);
      }
    };
    loadData();
  }, [key]);

  useEffect(() => {
    const saveData = async () => {
      if (data !== null && data !== undefined) {
        const stringify =
          data && typeof data === 'object' ? JSON.stringify(data) : data;
        await AsyncStorage.setItem(
          `@${appName}:${key}`,
          stringify.toString() as string,
        );
      }
    };
    saveData();
  }, [data, key]);
  return [data, setData, state];
}
