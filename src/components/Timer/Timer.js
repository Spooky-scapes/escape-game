import "./Timer.scss";
import {Redirect, BrowserRouter as Router} from 'react-router-dom'
import { useState } from "react";

const Timer = () => {

  const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    setInterval(function(){
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10)
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if (timer > 0) timer--;
      else window.location.replace('https://spooky-scapes.netlify.app/fail')
    }, 1000)
  }

  window.onload = () => {
    const fiveMinutes = 10;
    let display = document.getElementById('timer');
    startTimer(fiveMinutes, display)
  }

  return <div className="timerContainer">
    <p id = "timer"> 05:00</p>
  </div>;
};

export default Timer;
