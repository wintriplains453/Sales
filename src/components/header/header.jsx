
import { useState, useRef, useEffect } from "react";

import './header.scss';

function Header({time, setTime}) {
  const [intervalId, setIntervalId] = useState(null); 
  const [minutes, setMinutes] = useState(Math.floor(time / 60)); 
  const [secondsLeft, setSecondsLeft] = useState(time % 60); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsLeft === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
        } else {
          setMinutes(minutes - 1);
          setSecondsLeft(59);
        }
      } else {
        setSecondsLeft(secondsLeft - 1);
        setTime(secondsLeft - 1)
      }
    }, 1000); 
    setIntervalId(intervalId);
    return () => clearInterval(intervalId); 
  }, [time, minutes, secondsLeft]);
  
  return (
    <div className="wrapperTimer">
        <p className="headerTitle">Скидка действует:</p>
        <div className="wrapperTime" style={{ color: secondsLeft < 31 && minutes < 1  ? 'red' : '#01B9C5' }}>
          <p className="timer">0{minutes}</p>
          <span>:</span>
          <p className="timer">{secondsLeft.toString().padStart(2, '0')}</p>
        </div>
    </div>
  );
}

export default Header;
