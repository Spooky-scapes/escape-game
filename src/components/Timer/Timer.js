import "./Timer.scss";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from 'react'


const Timer = () => {

  const [seconds, setSeconds] = useState(5)
  const history = useHistory()
  const redirect = () => {
    history.push('/youdied')
  }
  // useEffect(()=>{
  //   let myInterval = setInterval(() => {
  //     if (seconds > 0){
  //       setSeconds(seconds - 1)
  //     } else {
  //       history.push('/youdied')
  //     }
  //   }, 1000)
  //   return () => {
  //     clearInterval(myInterval)
  //   }
  // })

  // let finished = false;
  // const history = useHistory()
  // const startTimer = (duration, display) => {
  //   let timer = duration,
  //     minutes,
  //     seconds;
  //   setInterval(function () {
  //     minutes = parseInt(timer / 60, 10);
  //     seconds = parseInt(timer % 60, 10);
  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     seconds = seconds < 10 ? "0" + seconds : seconds;
  //     display.textContent = minutes + ":" + seconds;
  //     console.log(timer)
  //     if (timer > 0) timer--;
  //     else {
  //       history.push('/youdied')
  //     }
  //   }, 1000);
  // };

  // window.onload = () => {
  //   const fiveMinutes = 5;
  //   let display = document.getElementById("timer");
  //   if (display){
  //     startTimer(fiveMinutes, display);
  //   }
  //   clearInterval(startTimer)
  // };

    return <div>
      <p id="timer"> {seconds}</p>
      <button onClick ={redirect}>redirect</button>
      </div>
};

export default Timer;
