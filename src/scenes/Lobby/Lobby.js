import "./lobby.scss";
import { Link } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Lobby = () => {
  window.localStorage.setItem("hasCasset", false);
  window.localStorage.setItem("usedCasset", false);
  window.localStorage.setItem("hasCandyBucket", false);
  window.localStorage.setItem("usedCandyBucket", false);
  window.localStorage.setItem("hasKey", false);
  window.localStorage.setItem("usedKey", false);
  window.localStorage.setItem("foundPainting", false);

  const commands = [
    {
      command: ["Play"],
      callback: () => startGame(),
    },
    {
      command: ["Tutorial"],
      callback: () => startTutorial(),
    },
  ];
  useSpeechRecognition({ commands });

  const startGame = () => {
    document.getElementsByClassName("playButton")[0].click();
  };

  const startTutorial = () => {
    document.getElementsByClassName("tutorialButton")[0].click();
  };

  function spaceBar(event) {
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

  const showInv = () => {
    document.getElementsByClassName("hiddenInventory")[0].className =
      "visInventory";
    document.getElementsByClassName("hiddenItemBox")[0].className =
      "visItemBox";
  };

  return (
    <div className="lobbyScreen">
      <div className="title">
        <h1>Spooky Scapes!</h1>
      </div>
      <Link to="/parlor">
        <div
          className="playButton"
          alt="Hold the spacebar key and say play to play spooky scapes"
        >
          <h1 onClick={() => showInv()}>Play</h1>
        </div>
      </Link>
      <Link to="/tutorial">
        <div
          className="tutorialButton"
          alt="Hold the spacebar key and say tutorial to learn how to use voice commands to play spooky scapes"
        >
          <h1>Tutorial</h1>
        </div>
      </Link>
    </div>
  );
};

export default Lobby;
