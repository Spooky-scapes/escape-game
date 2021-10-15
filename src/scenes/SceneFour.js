import "../assets/SceneFour/SceneFour.scss";
import mainDoor from "../assets/SceneFour/main-door.png";
import Window from "../assets/SceneFour/window.png";
import dog from "../assets/SceneFour/Bonedog.png";
import mat from "../assets/SceneFour/mat.png";
import cassette from "../assets/SceneFour/cassette-tape.png";
import closedRaven from "../assets/SceneFour/ravenClosedFIT.png";
import openRaven from "../assets/SceneFour/ravenOpenFIT.png";
import { Link } from "react-router-dom";
import leftArrow from "../assets/ghostArrowLeft.png";
import rightArrow from "../assets/ghostArrowRight.png";
import moonPainting from "../assets/SceneFour/moon-painting.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";

const SceneFour = () => {
  const commands = [
    {
      command: ["Click on door"],
      callback: () => clickImage(),
    },
  ];

  useSpeechRecognition({ commands });

  const image = document.getElementById("door");

  function clickImage() {
    image.click();
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.startListening();
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
    }
  });

  return (
    <div className="container">
      <img
        id="door"
        className="mainDoor"
        src={mainDoor}
        alt="front door"
        onClick={() => alert("this is the door")}
      />
      <img
        className="Window"
        src={Window}
        alt="Window to the left of door"
        onClick={() => alert("this is the window")}
      />

      <img
        className="moonPainting"
        src={moonPainting}
        alt="Autumn themed painting with a night sky and a crescent moon overlooking a farmer"
        onClick={() => {
          alert(
            "What an interesting painting. I've lived here for a while, but I always come back to this one for some reason."
          );
          let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
          if (usedKey) {
            alert("This is it! This is the painting!");
          }
        }}
      />
      <img
        className="dog"
        src={dog}
        alt="cute little bonedog"
        onClick={() => alert("this is the bone dog")}
      />
      <img className="cassette" src={cassette} alt="hidden cassette tape" />
      <img
        className="mat"
        src={mat}
        alt="dusty old mat"
        onClick={() => {
          alert("this is the mat");
          window.localStorage.setItem("hasCasset", true);
        }}
      />
      <img
        className="closedRaven"
        src={closedRaven}
        alt="raven watching you"
        onClick={() => alert("this is the raven")}
      />
      <Link to="/scene3">
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/scene1">
        <div>
          <img
            src={rightArrow}
            id="rightArrow"
            alt="ghost arrow pointing right"
          />
        </div>
      </Link>
    </div>
  );
};

export default SceneFour;
