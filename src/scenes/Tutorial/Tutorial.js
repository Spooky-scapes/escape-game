import React from "react";
import { Howl } from "howler";
import { Link } from "react-router-dom";
import "./tutorial.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

let playingAudio = "none";
const Tutorial = () => {
  const tutorialSound =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Spooky%20Sounds%2FTutorialUpdated.m4a?alt=media&token=59d7330c-5907-4be4-881c-5fc6c91d043c/allow-cors";
  const tutorial = new Howl({
    src: [tutorialSound],
    html5: true,
  });

  const audioControl = (specifiedSound) => {
    playingAudio = specifiedSound;
    !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop();
  };
  const stopAllAudio = () => {
    if (playingAudio !== "none") {
      playingAudio.stop();
      playingAudio.unload();
    }
  };

  const commands = [
    {
      command: ["Play *"],
      callback: (item) => clickButton(item),
    },
    {
      command: ["home"],
      callback: () => goHome(),
    },
  ];

  useSpeechRecognition({ commands });

  const items = ["tutorial", "game"];
  function clickButton(item) {
    item = item.toLowerCase();

    if (items.includes(item)) {
      switch (item) {
        case "game":
          document.getElementById("playGame").click();
          break;
        case "tutorial":
          document.getElementById("playTutorial").click();
          break;
        default:
          break;
      }
    }
  }
  function goHome() {
    document.getElementById("goHome").click();
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
      stopAllAudio();
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
    <div className="tutorial">
      <div className="content">
        <button
          className="tutorialButtons"
          type="button"
          id="playTutorial"
          onClick={() => {
            audioControl(tutorial);
          }}
        >
          Play Tutorial
        </button>
        <button
          className="tutorialButtons"
          type="button"
          id="pauseTutorial"
          onClick={() => {
            stopAllAudio();
          }}
        >
          Stop Tutorial
        </button>
        <p className="tutorialText">
          {" "}
          To hear a description of the room, press the enter or return key.{" "}
        </p>
        <p className="tutorialText">
          To inspect an item, hold down the spacebar key and say ‘click on’ then
          the item name.
        </p>
        <p className="tutorialText">
          To navigate around the rooms, hold down the spacebar and say ‘go to
          next room’ or go to previous room.
        </p>
        <p className="tutorialText">
          {" "}
          You can also say “go to left” or “go to right".{" "}
        </p>
        <p className="tutorialText">
          If you need to return to this tutorial, hold down the spacebar and say
          “go to tutorial".
        </p>
        <p className="tutorialText">
          {" "}
          If you are ready to play, hold down the spacebar and say “play game”.{" "}
        </p>
        <Link to="/">
          <button
            className="tutorialButtons"
            type="button"
            id="goHome"
            onClick={() => {
              stopAllAudio();
            }}
          >
            Home
          </button>
        </Link>
        <Link to="/parlor">
          <button
            className="tutorialButtons"
            type="button"
            id="playGame"
            onClick={() => {
              showInv();
              stopAllAudio();
            }}
          >
            Play Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Tutorial;
