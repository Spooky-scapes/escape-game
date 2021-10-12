import "./App.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import SceneOne from "./scenes/SceneOne";
import SceneFour from './scenes/SceneFour'

function App() {
  const commands = [
    {
      command: ["Click on *"],
      callback: () => clickButton(),
    },
  ];

  let buttoney = document.getElementById("bookButton");

  function clickButton() {
    isClicked = false;
    console.log("i'm buttoney");
    buttoney.click();
  }

  const { transcript } = useSpeechRecognition({ commands });
  let [isClicked] = useState(false);

  const buttons = ["bookButton"];


  if (isClicked) {
    clickButton();
    
  }



  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en";
  speech.text = "Im a button I am.";

  function playSound(url) {
    var a = new Audio(url);
    a.play();
  }

  return (
    <div className="App">
      
      <SceneOne />
      <SceneFour />
      <h1>Hello</h1>
      <p>is this rendering</p>

      <button
        id="bookButton"
        className="Button"
        onClick={() => {
          playSound(
            "http://www.simphonics.com/library/WaveFiles/Production%20Wavefiles/FS-98/JSPLASH2.WAV"
          );
        }}
      >
        Im a book!
      </button>

      <button onClick={SpeechRecognition.startListening}>Listen</button>

      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={() => window.speechSynthesis.speak(speech)}>
        My new friend the Button
      </button>
    </div>
  );
}

export default App;
