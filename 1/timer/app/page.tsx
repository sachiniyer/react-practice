"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  // create a state variable called timer
  // set the initial value to 0
  const START_TIMER_VAL = 5 * 60;
  const [timer, setTimer] = useState(START_TIMER_VAL);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(counting ? timer - 1 : timer);

      if (timer < 1 && counting !== false) {
        setCounting(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimer, counting, setCounting]);

  const startTimer = () => {
    setCounting(true);
  };

  const stopTimer = () => {
    setCounting(false);
  };

  const resetTimer = () => {
    setTimer(START_TIMER_VAL);
  };

  const formatTime = (time: number) => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <h1>{formatTime(timer)}</h1>
      <button type="button" onClick={startTimer}>
        Start Timer
      </button>
      <button type="button" onClick={stopTimer}>
        Stop Timer
      </button>
      <button type="button" onClick={resetTimer}>
        Reset Timer
      </button>
    </div>
  );
}
