import "./Timer.scss";
import {useHistory} from "react-router-dom";

const Timer = () => {
  const history = useHistory()
  const startTimer = (duration, display) => {
    let timer = duration,
      minutes,
      seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if (timer > 0) timer--;
      else {
        history.push('/youdied')
      }
    }, 1000);
  };

  window.onload = () => {
    const fifteenMinutes = 60 * 15;
    let display = document.getElementById("timer");
    if (display){
      startTimer(fifteenMinutes, display);
    }
    clearInterval(startTimer)
  };

    return  (
    <div className = 'timerContainer'>
      <p id="timer"> 15:00</p>
    </div>
      )
};

export default Timer;
