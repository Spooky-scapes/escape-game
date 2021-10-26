import "./victory.scss";
import { useHistory } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Victory = () => {
  const history = useHistory();
  const resetLocal = () => {
    window.localStorage.setItem("hasCasset", false);
    window.localStorage.setItem("usedCasset", false);
    window.localStorage.setItem("hasCandyBucket", false);
    window.localStorage.setItem("usedCandyBucket", false);
    window.localStorage.setItem("hasKey", false);
    window.localStorage.setItem("usedKey", false);
    window.localStorage.setItem("foundPainting", false);
    document.getElementsByClassName("invCasset")[0].className = "hiddenCasset";
    document.getElementsByClassName("invCandyBucket")[0].className =
      "hiddenCandyBucket";
    document.getElementsByClassName("invKey")[0].className = "hiddenKey";
  };
  const commands = [
    {
      command: ["play again"],
      callback: () => playAgain(),
    },

  ];
  useSpeechRecognition({ commands });

  const playAgain = () => {
    document.getElementsByClassName("playAgainWin")[0].click();
  }

  function spaceBar(event){
    if (event.code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      SpeechRecognition.startListening();
    }
  }

  document.addEventListener("keydown", (event) => {
    spaceBar(event)
  });

  document.addEventListener("keyup", (event) => {
    document.removeEventListener("keydown", spaceBar)
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
    }
  });
  return (
    <div className="victory">
      <h1 className="vic-title">Time to Trick or Treat!</h1>
      <h2
        alt = "Good job! To play again, hold down the spacebar key and say play again"
        className="playAgainWin"
        onClick={() => {
          history.push("/");
          resetLocal();
        }}
      >
        Play Again
      </h2>
    </div>
  );
};

export default Victory;
