import "./SceneFour.scss";
import mainDoor from "../../assets/SceneFour/main-door.png";
import Window from "../../assets/SceneFour/window.png";
import dog from "../../assets/SceneFour/Bonedog.png";
import mat from "../../assets/SceneFour/mat.png";
import cassette from "../../assets/SceneFour/cassette-tape.png";
import closedRaven from "../../assets/SceneFour/ravenClosedFIT.png";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/ghostArrowLeft.png";
import rightArrow from "../../assets/ghostArrowRight.png";
import moonPainting from "../../assets/SceneFour/moon-painting.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Howl } from "howler";
import s4sounds from "./SceneFourSounds.json";

let playingAudio = "none";

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
    "laugh",
    "bone",
    "bone.",
    "mac",
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
    "door": "door",
    "window": "Window",
    "painting": "moonPainting",
    "bone dog": "boneDog",
    "bone": "boneDog",
    "bone.": "boneDog",
    "mat": "mat",
    "math": "mat",
    "map": "mat",
    "matt": "mat",
    "mac": "mat",
    "raven": "closedRaven",
    "reva": "closedRaven",
  };

  const mapPageToLink = {
    "right": "rightArrow",
    "left": "leftArrow",
    "laugh": "leftArrow",
    "write": "rightArrow",
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
    }  else if (String(page) === "tutorial"){
      history.push("/tutorial")
    }
     else {
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
    const pagina =
      window.location.href === "http://localhost:3000/entryway" ||
      window.location.href === "https://spooky-scapes.netlify.app/entryway";
    if (event.code === "Enter" && pagina) {
      event.preventDefault();
      if (event.repeat) {
        return;
      } else {
        audioCues.sceneFourDescription.play();
      }
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
    }
    const pagina =
      window.location.href === "http://localhost:3000/entryway" ||
      window.location.href === "https://spooky-scapes.netlify.app/entryway";
    if (event.code === "Enter" && pagina) {
      event.preventDefault();
      audioCues.sceneFourDescription.stop();
    }
  });

  const audioCues = {
    sceneFourDescription: new Howl({
      src: [s4sounds[0].sceneFourDescription],
      html5: true,
    }),
    window: new Howl({
      src: [s4sounds[1].window],
      html5: true,
    }),
    cassette: new Howl({
      src: [s4sounds[2].cassette],
      html5: true,
    }),
    lockedDoor: new Howl({
      src: [s4sounds[3].lockedDoor],
      html5: true,
    }),
    paintingDescription: new Howl({
      src: [s4sounds[4].paintingDescription],
      html5: true,
    }),
    dust: new Howl({
      src: [s4sounds[5].dust],
      html5: true,
    }),
    didSomething: new Howl({
      src: [s4sounds[6].didSomething],
      html5: true,
    }),
    victory: new Howl({
      src: [s4sounds[7].victory],
      html5: true,
    }),
    boneDogBarking: new Howl({
      src: [s4sounds[8].boneDogBarking],
      html5: true,
      volume: 0.6,
    }),
    doorClicking: new Howl({
      src: [s4sounds[9].doorClicking],
      html5: true,
    }),
    doorSwinging: new Howl({
      src: [s4sounds[10].doorSwinging],
      html5: true,
      volume: 0.5,
    }),
    matShuffling: new Howl({
      src: [s4sounds[11].matShuffling],
      html5: true,
    }),
    windowRattling: new Howl({
      src: [s4sounds[12].windowRattling],
      html5: true,
    }),
    caw: new Howl({
      src: [s4sounds[13].caw],
      html5: true,
    }),
    doorHandle: new Howl({
      src: [s4sounds[14].doorHandle],
      html5: true,
    }),
  };
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

  const hideInv = () => {
    document.getElementsByClassName("visInventory")[0].className =
      "hiddenInventory";
    document.getElementsByClassName("visItemBox")[0].className =
      "hiddenItemBox";
  };

  const assetClicked = (e) => {
    setActive(false);
    const clicked = e.target.className;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";
    stopAllAudio();
    switch (clicked) {
      case "door":
        let found = JSON.parse(window.localStorage.getItem("foundPainting"));
        if (found) {
          audioControl(audioCues.doorSwinging);
          audioControl(audioCues.victory);
          narrationBox.innerHTML =
            "*door swinging open* You did what we couldn’t! Congratulations and Happy Halloween!";
          setTimeout(() => {
            hideInv();
            window.dispatchEvent(new Event("reset"));
            history.push("/victory");
          }, 6500);
          break;
        }
        audioControl(audioCues.doorHandle);
        audioControl(audioCues.lockedDoor);
        narrationBox.innerHTML =
          "*racketing* If only we could open it somehow...we could escape!";
        break;
      case "moonPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          audioControl(audioCues.doorClicking);
          audioControl(audioCues.didSomething);
          narrationBox.innerHTML = " *click* That did something!";
          window.localStorage.setItem("foundPainting", true);
          break;
        }
        audioControl(audioCues.paintingDescription);
        narrationBox.innerHTML =
          "I can’t decide whether this painting is ominous or not. The farmer seems grim and yet the moon shines brightly.";
        break;
      case "closedRaven":
        audioControl(audioCues.caw);
        narrationBox.innerHTML = " *squawk*";
        break;
      case "boneDog":
        audioControl(audioCues.boneDogBarking);
        narrationBox.innerHTML = "*barking*";
        break;
      case "Window":
        audioControl(audioCues.windowRattling);
        audioControl(audioCues.window);
        narrationBox.innerHTML =
          "*rattling* Definitely seems locked from where I’m sitting";
        break;
      case "mat":
        let hasCasset = JSON.parse(window.localStorage.getItem("hasCasset"));
        if (!hasCasset) {
          window.localStorage.setItem("hasCasset", true);
          audioControl(audioCues.matShuffling);
          audioControl(audioCues.cassette);
          window.dispatchEvent(new Event("storage"));
          document.getElementsByClassName("cassette")[0].className = "hidden";
          narrationBox.innerHTML =
            "*shuffling* Look, a cassette tape is hidden under the mat, wonder what could be on it?";
          break;
        }
        audioControl(audioCues.dust);
          narrationBox.innerHTML = "It still smells like dust";
          break;

      default:
        break;
    }

    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 30000);
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
      <img className={JSON.parse(window.localStorage.getItem("hasCasset"))? "hidden": "cassette"} src={cassette} alt="hidden cassette tape" />
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
        <p
          id="narrationBox"
          className={isActive ? "text-active" : "text-hidden"}
        ></p>
      </div>
      <Link to="/witchDen">
        <div>
          <img
            src={leftArrow}
            id="leftArrow"
            alt="ghost arrow pointing left"
            onClick={() => stopAllAudio()}
          />
        </div>
      </Link>
      <Link to="/parlor">
        <div>
          <img
            src={rightArrow}
            id="rightArrow"
            alt="ghost arrow pointing right"
            onClick={() => stopAllAudio()}
          />
        </div>
      </Link>
    </div>
  );
};

export default SceneFour;
