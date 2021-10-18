import "./lobby.scss";
import { Link } from "react-router-dom";

import SpeechRecognition , {useSpeechRecognition } from "react-speech-recognition";


import Timer from '../../components/Timer/Timer.js'


const Lobby = () => {
  const commands = [
    {
      command: ['Play'],
      callback: () => startGame()
    }
  ]
  useSpeechRecognition({commands})

  const startGame = () => {
    document.getElementsByClassName('playButton')[0].click()
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      if(event.repeat){return}
      SpeechRecognition.startListening();

    }
  })


  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      SpeechRecognition.stopListening();
    }
  })

  return (
    <div className="lobbyScreen">
      <div className="title">
        <h1>Spooky Scapes!</h1>
      </div>
      <Link to="/scene1">
        <div className="playButton">
          <h1>Play</h1>
        </div>
      </Link>
    </div>
  );
};

export default Lobby;
