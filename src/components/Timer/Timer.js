import "./Timer.scss";
import { useHistory, useLocation } from "react-router-dom";
import { Howl } from "howler";

let interval;
let isPaused;
const Timer = () => {
  const history = useHistory();
  const location = useLocation();

  const failAudio = new Howl({
    src: "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2FFailAudio.m4a?alt=media&token=f11504b5-4ebc-479b-a638-7d30def43073/allow-cors",
    html5: true,
    volume: 0.5,
  })
  const failSoundEffect = new Howl({
    src: "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2FFailSoundEffect.mp3?alt=media&token=3fce3925-359c-4871-90d8-5ef91d166d7e/allow-cors",
    html5: true,
  })

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
      if (timer >= 0 && !isPaused && !JSON.parse(window.localStorage.getItem("foundPainting"))) timer--;
      if (timer < 0 && !isPaused){
        clearInterval(interval)
        interval = undefined;
        failAudio.play();
        failSoundEffect.play();
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
