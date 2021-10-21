import React from "react";
import { Howl, Howler } from "howler";
import { Link } from "react-router-dom";
import "./tutorial.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Tutorial = () => {
  const tutorialSound =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Spooky%20Sounds%2FSpookyTutorial.m4a?alt=media&token=26542141-47e3-460b-a2c5-57726893829b/allow-cors";
  const tutorial = new Howl({
    src: [tutorialSound],
    html5: true,
  });

<<<<<<< HEAD
  let playingAudio;
  const audioControl = (specifiedSound) => {
    playingAudio = specifiedSound;
    !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop();
  };
  const stopAllAudio = () => {
    playingAudio.stop();
  };
=======
    let playingAudio
    const audioControl = (specifiedSound) => {
        playingAudio = specifiedSound
        !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop()
        console.log('🧤 playingAudio', playingAudio);

    }
    const stopAllAudio = () => {
        playingAudio.stop()
    }
>>>>>>> de43d1f1ba18cfcee8596a5cd7a1e3205fc295f5

  const commands = [
    {
      command: ["play"],
      callback: () => clickButton(),
    },
  ];

<<<<<<< HEAD
  useSpeechRecognition({ commands });
=======
    const commands = [
        {
            command: ["Play *"],
            callback: (item) => clickButton(item)
        },
        {
            command: ["home"],
            callback: () => goHome()
        }
    ];
>>>>>>> de43d1f1ba18cfcee8596a5cd7a1e3205fc295f5

  function clickButton() {
    document.getElementById("playGame").click();
  }

<<<<<<< HEAD
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      SpeechRecognition.startListening();
=======
    const items = ['tutorial','game']

    function clickButton(item){
        item = item.toLowerCase()
        console.log('🧤 item', item);

        if(items.includes(item)) {
            switch (item) {
                case "game":
                    document.getElementById('playGame').click()
                    break;
                case "tutorial":
                    document.getElementById('playTutorial').click()
                    break;
                default:
                    break;
            }
        }
    }
    function goHome() {
        document.getElementById("goHome").click()
>>>>>>> de43d1f1ba18cfcee8596a5cd7a1e3205fc295f5
    }
  });

  document.addEventListener("keyup", (event) => {
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

<<<<<<< HEAD
  return (
    <div>
      <button
        type="button"
        id="playTutorial"
        onClick={() => {
          audioControl(tutorial);
        }}
      >
        Play Tutorial
      </button>
      <button
        type="button"
        id="pauseTutorial"
        onClick={() => {
          stopAllAudio();
        }}
      >
        Stop Tutorial
      </button>
      <p> To hear a description of the room, press the enter or return key. </p>
      <p>
        To inspect an item, hold down the spacebar key and say ‘click on’ then
        the item name.
      </p>
      <p>
        To navigate around the rooms, hold down the spacebar and say ‘go to next
        room’ or go to previous room.
      </p>
      <p> You can also say “go to left” or “go to right. </p>
      <p>
        If you need to return to this tutorial, hold down the spacebar and say
        “go to tutorial".
      </p>
      <p> If you are ready to play, hold down the spacebar and say “play”. </p>
      <Link to="/">
        <button type="button" id="goHome">
          Home
        </button>
      </Link>
      <Link to="/parlor">
        <button type="button" id="playGame" onClick={() => showInv()}>
          Start Playing
        </button>
      </Link>
    </div>
  );
};
=======
    return (
        <div>
        <button type="button" id="playTutorial" onClick={ () => {audioControl(tutorial)}}>Play Tutorial</button>
        <button type="button" id="stopTutorial" onClick={ () => {stopAllAudio()}}>Stop Tutorial</button>
        <p> To hear a description of the room, press the enter or return key. </p>
        <p> To inspect an item, hold down the spacebar key and say ‘click on’ then the item name. </p>
        <p> To navigate around the rooms, hold down the spacebar and say  ‘go to next room’ or go to previous room. </p>
        <p> You can also say “go to left” or “go to right. </p>
        <p> If you need to return to this tutorial, hold down the spacebar and say “go to tutorial". </p>
        <p> If you are ready to play, hold down the spacebar and say “play game”. </p>
        <Link to = "/" ><button type="button" id="goHome" > Home </button></Link>
        <Link to = "/parlor"> <button type="button" id="playGame" > Start Playing </button></Link>
        </div>
    )
}
>>>>>>> de43d1f1ba18cfcee8596a5cd7a1e3205fc295f5

export default Tutorial;
