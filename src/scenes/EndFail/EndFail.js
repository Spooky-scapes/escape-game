import "./EndFail.scss";
import { useHistory } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Howl } from "howler";

const EndFail = () => {

  const history = useHistory();
  const hideInv = () => {
    document.getElementsByClassName("visInventory")[0].className =
      "hiddenInventory";
    document.getElementsByClassName("visItemBox")[0].className =
      "hiddenItemBox";
  };
  if (document.getElementsByClassName('visInventory')[0]){
    hideInv();
  }

  const commands = [
    {
      command: ["play again"],
      callback: () => playAgain(),
    },

  ];
  useSpeechRecognition({ commands });

  const playAgain = () => {
    document.getElementsByClassName("playAgain")[0].click();
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      SpeechRecognition.startListening();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
    }
  });

  const failAudio = new Howl({
    src: "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2FFailAudio.m4a?alt=media&token=f11504b5-4ebc-479b-a638-7d30def43073/allow-cors",
    html5: true,
    volume: 0.3,
  })
  const failSoundEffect = new Howl({
    src: "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2FFailSoundEffect.mp3?alt=media&token=3fce3925-359c-4871-90d8-5ef91d166d7e/allow-cors",
    html5: true,
    volume: 0.3,
  })


  return (
    <div className="youFail">
      <h1 className="deadText">You Died</h1>
      <h2
        alt = "Oh no! You ran out of time! To try again, click on play again or hold down the spacebar key and say play again"
        className="playAgain"
        onClick={() => {
          history.push("/");
        }}
      >
        Play Again
      </h2>
    </div>
  );
};

export default EndFail;
