import styles from "./clock.module.css";

interface DisplayProps {
  minutes: number;
  seconds: number;
}

export default function Display({ minutes, seconds }: DisplayProps) {
  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className={styles.display}>
      <p>
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
    </div>
  );
}
