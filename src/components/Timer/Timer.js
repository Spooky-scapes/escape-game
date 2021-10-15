import "./Timer.scss";
import { Link, BrowserRouter as Router} from "react-router-dom";

const Timer = ({history}) => {
  let finished = false;

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
      console.log(timer)
      if (timer > 0) timer--;
      else {
        console.log("timer finished")
      }
    }, 1000);
  };

  // window.onload = () => {
  //   const fiveMinutes = 5;
  //   let display = document.getElementById("timer");
  //   if (display){
  //     startTimer(fiveMinutes, display);
  //   }
  //   clearInterval(startTimer)
  // };

    return (
      <Router>
      <div className="timerContainer">
        <p id="timer"> 05:00</p>
        <Link id = "invisible" to = "/youdied">
        </Link>
      </div>
      </Router>
    );
};

export default Timer;
