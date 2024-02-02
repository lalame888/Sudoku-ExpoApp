import { useState, useRef, useEffect, useCallback } from "react";
import { getTimerObject } from "../utils";

export function useTimer(){
    const [timer, setTimer] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<any>(null);
    useEffect(()=>{
        resetTimer()
        startTimer()
    },[])
    const startTimer = useCallback(() => {
        setIsPaused(false);
        timerRef.current = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

    },[]);
  
    const pauseTimer = useCallback(() => {
      setIsPaused(true);
      clearInterval(timerRef.current);
    },[]);
    const resetTimer = useCallback(() => {
        setTimer(0);
        setIsPaused(false);
        clearInterval(timerRef.current);
      },[]);
    const {timeText, showTime} = getTimerObject(timer);
    return {showTime, isPaused, startTimer, pauseTimer, timeText, timer, resetTimer}
}