import "./lobby.scss";
import { Link } from "react-router-dom";
import SpeechRecognition , {useSpeechRecognition } from "react-speech-recognition";


const Lobby = () => {
  const commands = [
    {
      command: ['Play'],
      callback: () => startGame()
    },
    {
      command: ['Tutorial'],
      callback: () => startTutorial()
    }
  ]
  useSpeechRecognition({commands})

  const startGame = () => {
    document.getElementsByClassName('playButton')[0].click()
  }

  const startTutorial = () => {
    document.getElementsByClassName('tutorialButton')[0].click()
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if(event.repeat){return}
      SpeechRecognition.startListening();

    }
  })


  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
    }
  })

  return (
    <div className="lobbyScreen">
      <div className="title">
        <h1>Spooky Scapes!</h1>
      </div>
      <Link to="/parlor">
        <div className="playButton" alt = "Hold the spacebar key and say play to play spooky scapes">
          <h1>Play</h1>
        </div>
      </Link>
      <Link to ="/tutorial">
        <div className = "tutorialButton" alt = "Hold the spacebar key and say tutorial to learn how to use voice commands to play spooky scapes">
          <h1>Tutorial</h1>
        </div>
      </Link>
    </div>
  );
};

export default Lobby;
