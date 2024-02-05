import { View, Text, Button, ScrollView, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, StyleSheet, Dimensions } from "react-native";
import { LevelData } from "../../lib/interface";
import { useEffect, useRef, useState } from "react";
import { LevelPage } from "./LevelPage";
import { LevelTabButton } from "./LevelTabButton";
import React from "react";

enum Direction {
    'left',
    'right'
}
const LevelsTabs = ['簡單', '初級', '中級', '高級', '困難'];

interface HomeMenuProps {
    enterGame(level: number, name?: string): void;
    saveData: Array<LevelData>
}
export function HomeMenu(props: HomeMenuProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
      if (scrollViewRef.current) {
        const offsetX = (currentPage - 1) * Dimensions.get('window').width;
        scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
      }
    }, [currentPage]);
    
  const handleArrowClick = (direction: Direction) => {
    // 根據方向調整當前顯示的關卡頁面
    if (direction === Direction['right']) {
      setCurrentPage(currentPage + 1);
    } else if (direction === Direction['left'] && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setCurrentPage(newPage + 1);
    console.log('E');
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-around', flexDirection: 'row', height: 'auto', padding: 10}}>
        {LevelsTabs.map((term, index)=>{
          return (
            <LevelTabButton 
              key={index} 
              title={term} 
              onPress={()=> setCurrentPage(index+1)}
              activity={index+1 === currentPage}
            />
          )
        })}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        // onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        style={{ flex: 1 }}
      >
        {
          Array.from(Array(5)).map((_,index)=>{
            const startLevel = index*20 + 1;
            return (<LevelPage
                key={index} 
                start={startLevel} 
                number={20} 
                saveData={props.saveData} 
                enterGame={(level)=>{
                  props.enterGame(level, `Level ${level}`)
                }}
                name={'Level'}
              />
            )
          })
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // 與容器相同高度
    width: 50,
  },
  leftArrow: {
    left: 0,
  },
  rightArrow: {
    right: 0,
  }
  
});
