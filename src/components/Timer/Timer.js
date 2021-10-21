import "./Timer.scss";
import { useHistory, useLocation } from "react-router-dom";

let interval;
let isPaused;
const Timer = () => {
  const history = useHistory();
  const location = useLocation();

  const startTimer = (duration, display) => {
    let timer = duration,
      minutes,
      seconds;
    interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if (timer > 0 && !isPaused) timer--;
      if (timer <= 0 && !isPaused){
        clearInterval(interval)
        document.getElementById("timer").id = "invisible";
        interval = undefined;
        history.push("/youdied");
      }
    }, 1000);
  };

  if (location.pathname === "/victory") {
    clearInterval(interval);
    document.getElementById("timer").id = "invisible";
    interval = undefined;
  }

  if (location.pathname === "/parlor" && !interval) {
    const fifteenMinutes = 15 * 60;
    document.getElementById("invisible").id = "timer";
    let display = document.getElementById("timer");
    startTimer(fifteenMinutes, display);
  }
  if (location.pathname === "/parlor" && interval){
    isPaused = false;
  }

  if (location.pathname === "/tutorial" && interval){
    isPaused = true;
  }

  return (
    <div className="timerContainer">
      <p id="invisible"> 15:00</p>
    </div>
  );
};

export default Timer;
