import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./clock.module.css";
import Display from "./Display";

export default function Clock() {
  const expiryTimeRef = useRef<number | null>(null);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(1500);
  const isRunning = intervalId !== null;

  const startTimer = () => {
    pauseTimer();

    expiryTimeRef.current = Date.now() + secondsRemaining * 1000;

    const id = setInterval(() => {
      if (!expiryTimeRef.current) {
        pauseTimer();
        return;
      }
      const newRemaining = Math.round(
        (expiryTimeRef.current - Date.now()) / 1000,
      );

      if (newRemaining <= 0) {
        pauseTimer();
        setSecondsRemaining(0);
      } else {
        setSecondsRemaining(newRemaining);
      }
    }, 1000);
    setIntervalId(id);
  };

  const pauseTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const resetTimer = () => {
    pauseTimer();
    setSecondsRemaining(1500);
  };

  useEffect(() => {
    return () => {
      pauseTimer();
    };
  }, [pauseTimer]);

  return (
    <div className={styles.container}>
      <Display
        minutes={Math.floor(secondsRemaining / 60)}
        seconds={secondsRemaining % 60}
      />
      <button type="button" onClick={startTimer} disabled={isRunning}>
        Start clock
      </button>
      <button type="button" onClick={pauseTimer} disabled={!isRunning}>
        Pause clock
      </button>
      <button type="button" onClick={resetTimer}>
        Reset clock
      </button>
    </div>
  );
}
