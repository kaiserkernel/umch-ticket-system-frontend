import React, { useEffect, useState } from "react";

const DownTimer = ({ remainTime }) => {
  const [timer, setTimer] = useState(remainTime);
  const [intervalId, setIntervalId] = useState(null);

  const [hours, setHours] = useState(Math.floor(remainTime / (1000 * 60 * 60)));
  const [minutes, setMinutes] = useState(
    Math.floor(remainTime / (1000 * 60)) % 60
  );
  const [seconds, setSeconds] = useState(Math.floor(remainTime / 1000) % 60);

  useEffect(() => {
    if (timer > 0) {
      const id = window.setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1000;
          setHours(Math.floor(newTime / (1000 * 60 * 60)));
          setMinutes(Math.floor(newTime / (1000 * 60)) % 60);
          setSeconds(Math.floor(newTime / 1000) % 60);
          return newTime;
        });
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalId);
    }
  }, [timer, intervalId]);

  if (timer <= 0) {
    return <></>;
  }

  return (
    <div>
      Remained time: {hours}h {minutes}m {seconds}s
    </div>
  );
};

export { DownTimer };
