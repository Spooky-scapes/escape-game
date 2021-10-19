import "./SceneFour.scss";
import mainDoor from "../../assets/SceneFour/main-door.png";
import Window from "../../assets/SceneFour/window.png";
import dog from "../../assets/SceneFour/Bonedog.png";
import mat from "../../assets/SceneFour/mat.png";
import cassette from "../../assets/SceneFour/cassette-tape.png";
import closedRaven from "../../assets/SceneFour/ravenClosedFIT.png";
import openRaven from "../../assets/SceneFour/ravenOpenFIT.png";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/ghostArrowLeft.png";
import rightArrow from "../../assets/ghostArrowRight.png";
import moonPainting from "../../assets/SceneFour/moon-painting.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, { useState } from "react";
import { timeoutCollection } from "time-events-manager";
import { useHistory } from "react-router-dom";
import { Howl, Howler } from "howler";
import { getStorage, ref } from "firebase/storage";

const SceneFour = () => {
  const [isActive, setActive] = useState(false);
  const history = useHistory();
  const commands = [
    {
      command: ["Click on *"],
      callback: (item) => clickImage(item),
    },
    {
      command: ["Go to *"],
      callback: (page) => goTo(page),
    },
  ];

  useSpeechRecognition({ commands });

  const clickableItems = [
    "door",
    "window",
    "painting",
    "bone dog",
    "mat",
    "math",
    "map",
    "matt",
    "raven",
    "reva",
  ];

  const pagePossibilities = [
    "right",
    "left",
    "next room",
    "previous room",
    "room one",
    "room three",
    "write",
  ];

  const matchItemToClass = {
    door: "door",
    window: "Window",
    painting: "moonPainting",
    "bone dog": "boneDog",
    mat: "mat",
    math: "mat",
    map: "mat",
    matt: "mat",
    raven: "closedRaven",
    reva: "closedRaven",
  };

  const mapPageToLink = {
    right: "rightArrow",
    left: "leftArrow",
    write: "rightArrow",
    "next room": "rightArrow",
    "previous room": "leftArrow",
    "room three": "leftArrow",
    "room one": "rightArrow",
  };

  function clickImage(item) {
    item = item.toLowerCase();
    if (clickableItems.includes(item)) {
      item = matchItemToClass[item];
      document.getElementsByClassName(item)[0].click();
    } else {
      alert(
        `it thinks you said ${item}, consider adding ${item} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`
      );
    }
  }

  function goTo(page) {
    if (pagePossibilities.includes(page)) {
      page = mapPageToLink[page];
      document.getElementById(page).click();
    } else {
      alert(
        `it thinks you said ${page}, consider adding ${page} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`
      );
    }
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

  const boneDogBarking =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2FBonedogBarking.m4a?alt=media&token=fafc12c5-9afb-4358-943b-de6cd48b3d24";
  const doorClicking =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2Fdoor-clicking.mp3?alt=media&token=456f604a-cb46-4d94-8d3b-3d977a694799";
  const doorSwinging =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2Fdoor-swingin-open.mp3?alt=media&token=5edb8c79-984c-4952-a13b-37947e384226";
  const matShuffling =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2Fmat-shuffling.mp3?alt=media&token=9d2b2390-d782-475b-a8ee-21927f1656ba";
  const windowRattling =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Scene%204%2Fwindow-rattling.mp3?alt=media&token=ef44a750-4d72-456c-8b1f-170372b8b9f1";
  const cawPath =
    "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/caw.mp3?alt=media&token=cd4cc366-1a6b-47f6-912b-5b5eb21096f2/allow-cors";

  function playSound(sound) {
    const a = new Howl({
      src: [sound],
      html5: true,
    });
    a.play();
  }
  function playDoor(sound) {
    const a = new Howl({
      src: [sound],
      volume: 0.4,
      html5: true,
    });
    a.play();
  }
  const assetClicked = (e) => {
    timeoutCollection.removeAll();
    setActive(false);
    const clicked = e.target.className;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";

    switch (clicked) {
      case "door":
        let found = JSON.parse(window.localStorage.getItem("foundPainting"));
        if (found) {
          playDoor(doorSwinging);
          narrationBox.innerHTML =
            "*door swinging open* You did what we couldn’t! Congratulations and happy Halloween!";
          setTimeout(() => {
            history.push("/victory");
          }, 6000);
          break;
        }
        narrationBox.innerHTML =
          "If only we could open it somehow...we could escape!";
        break;
      case "moonPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          playSound(doorClicking);
          narrationBox.innerHTML = " *click* That did something!";
          window.localStorage.setItem("foundPainting", true);
          break;
        }
        narrationBox.innerHTML =
          "I can’t decide whether this painting is ominous or not. The farmer seems grim and yet the moon shines brightly.";
        break;
      case "closedRaven":
        playSound(cawPath);
        narrationBox.innerHTML = " *squawk*";
        break;
      case "boneDog":
        playSound(boneDogBarking);
        narrationBox.innerHTML = "*barking*";
        break;
      case "Window":
        playSound(windowRattling);
        narrationBox.innerHTML =
          "*rattling* Definitely seems locked from where I’m sitting";
        break;
      case "mat":
        let hasCasset = JSON.parse(window.localStorage.getItem("hasCasset"));
        if (hasCasset) {
          narrationBox.innerHTML = "It still smells like dust";
          break;
        }
        window.localStorage.setItem("hasCasset", true);
        playSound(matShuffling);
        document.getElementsByClassName("cassette")[0].className = "hidden";
        narrationBox.innerHTML =
          "*shuffling* Look, a cassette tape is hidden under the mat, wonder what’s on it?";
        break;
      default:
        break;
    }

    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 15000);
  };

  return (
    <div className="container">
      <img
        className="door"
        src={mainDoor}
        alt="front door"
        onClick={(e) => assetClicked(e)}
      />
      <img
        className="Window"
        src={Window}
        alt="Window to the left of door"
        onClick={(e) => assetClicked(e)}
      />

      <img
        className="moonPainting"
        src={moonPainting}
        alt="Autumn themed painting with a night sky and a crescent moon overlooking a farmer"
        onClick={(e) => assetClicked(e)}
      />
      <img
        className="boneDog"
        src={dog}
        alt="cute little bonedog"
        onClick={(e) => assetClicked(e)}
      />
      <img className="cassette" src={cassette} alt="hidden cassette tape" />
      <img
        className="mat"
        src={mat}
        alt="dusty old mat"
        onClick={(e) => assetClicked(e)}
      />
      <img
        className="closedRaven"
        src={closedRaven}
        alt="raven watching you"
        onClick={(e) => assetClicked(e)}
      />
      <div className="narrationBox">
        <p id="narrationBox"></p>
      </div>
      <Link to="/witchDen">
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/parlor">
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
