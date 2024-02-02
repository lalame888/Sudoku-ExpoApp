import { useState, useRef, useEffect } from "react";
import { getTimerObject } from "../utils";

export function useTimer(){
    const [timer, setTimer] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<any>(null);
    useEffect(()=>{
        startTimer()
    },[])
    const startTimer = () => {
        setIsPaused(false);
        timerRef.current = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);
    };
  
    const pauseTimer = () => {
      setIsPaused(true);
      clearInterval(timerRef.current);
    };
    const {timeText, showTime} = getTimerObject(timer);
    return {showTime, isPaused, startTimer, pauseTimer, timeText, timer}
}