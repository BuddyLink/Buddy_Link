import { useState, useEffect } from "react";

const Timer = ({ duration }) => {
  const [time, setTime] = useState(duration);
  const intervalTime = 1000;
  const timeUpdate = () => {
    if(time > 0){
    setTime(time - intervalTime)};
  };
  useEffect(() => {
    setTimeout(timeUpdate, intervalTime);
  }, [time]);
  return <p>{timeFormat(time)}</p>;
};

const timeFormat = (time) => {
  let total_seconds = Number(Math.floor(time / 1000));
  let total_minutes = Number(Math.floor(total_seconds / 60));
  let seconds = Number(total_seconds % 60);

  return `Minutes: ${total_minutes} Seconds: ${seconds}`;
};

export default Timer;
