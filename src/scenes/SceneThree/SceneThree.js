import "../../main.scss";
import "./SceneThree.scss";
import grandFatherClock from "../../assets/SceneThreeAssets/GrandfatherClock.png";
import cauldron from "../../assets/SceneThreeAssets/Cauldron2.png";
import witch from "../../assets/SceneThreeAssets/witch.png";
import harvestPainting from "../../assets/SceneThreeAssets/farm-painting.png";
import woodenspoon from "../../assets/SceneThreeAssets/woodenspoon.png";
import arrowRight from "../../assets/SceneThreeAssets/ghostArrowRight.png";
import arrowLeft from "../../assets/SceneThreeAssets/ghostArrowLeft.png";
import ravenClosed from "../../assets/SceneOne/ravenClosedFIT.png";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/Background.jpg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import sceneThreeSounds from "./SceneThreeSounds.json";
import { Howl } from "howler";
import {useHistory} from 'react-router-dom';

let playingAudio = "none";

const SceneThree = () => {
  const history = useHistory();
  const [isActive, setActive] = useState(false);
  const hasBucket = () => {
    const bool = JSON.parse(window.localStorage.getItem("hasCandyBucket"));
    if (bool) {
      window.localStorage.setItem("usedCandyBucket", true);
      window.dispatchEvent(new Event("storage"));
    }
  };
  const iHateIntervals = setInterval(function(){
    if (document.getElementById('timer')){
      let oof = document.getElementById('timer').innerHTML
      if (String(oof) === "00:01"){
        stopAllAudio();
        stopAllAudio();
        clearInterval(iHateIntervals);
      }
    } else clearInterval(iHateIntervals)
  }, 1000);


  //audio for SceneThree
  const location =
    window.location.href === "http://localhost:3000/witchDen" ||
    window.location.href === "https://spooky-scapes.netlify.app/witchDen";

  const sceneThreeAudio = {
    sceneThreeDescription: new Howl({
      src: [sceneThreeSounds[3].sceneThreeDesc],
      html5: true,
    }),
    giveCandyToWitch: new Howl({
      src: [sceneThreeSounds[0].giveCandyToWitch],
      html5: true,
    }),
    lilyCauldronOne: new Howl({
      src: [sceneThreeSounds[1].lilyCauldronOne],
      html5: true,
    }),
    clock: new Howl({ src: [sceneThreeSounds[2].clock], html5: true }),
    paintingOne: new Howl({
      src: [sceneThreeSounds[4].paintingOne],
      html5: true,
    }),
    paintingTwo: new Howl({
      src: [sceneThreeSounds[5].paintingTwo],
      html5: true,
    }),
    woodenspoon: new Howl({
      src: [sceneThreeSounds[6].woodenSpoon],
      html5: true,
    }),
    lilyCauldronTwo: new Howl({
      src: [sceneThreeSounds[7].lilyCauldronTwo],
      html5: true,
    }),
    talkToWitchFirst: new Howl({
      src: [sceneThreeSounds[8].talkToWitchFirst],
      html5: true,
    }),
    witchLine: new Howl({ src: [sceneThreeSounds[9].witchLine], html5: true }),
  };

  document.addEventListener("keydown", (event) => {
    if (event.code === "Enter" && location) {
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      sceneThreeAudio.sceneThreeDescription.play();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Enter" && location) {
      event.preventDefault();
      sceneThreeAudio.sceneThreeDescription.stop();
    }
  });

  const audioControl = (specifiedSound) => {
    playingAudio = specifiedSound;
    !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop();
  };

  const stopAllAudio = () => {
    if (playingAudio !== "none") {
      playingAudio.stop();
    }
  };

  // voice cammand
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
    "painting",
    "witch",
    "wooden spoon",
    "spoon",
    "grandfather clock",
    "clock",
    "old clock",
    "grand father clock",
    "cauldron",
    "pot",
    "which",
  ];

  const pagePossibilities = [
    "right",
    "left",
    "next room",
    "previous room",
    "room two",
    "room four",
    "write",
  ];

  const matchItemToClass = {
    painting: "harvestPainting",
    witch: "witch",
    "wooden spoon": "woodenSpoon",
    spoon: "woodenSpoon",
    "grandfather clock": "grandFatherClock",
    "old clock": "grandFatherClock",
    cauldron: "cauldron",
    pot: "cauldron",
    which: "witch",
    clock: "grandFatherClock",
  };

  const mapPageToLink = {
    "right": "arrowRight",
    "left": "arrowLeft",
    "write": "arrowRight",
    "next room": "arrowRight",
    "previous room": "arrowLeft",
    "room two": "arrowLeft",
    "room four": "arrowRight",
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
      document.getElementsByClassName(page)[0].click();
    }  else if (String(page) === "tutorial"){
      document.getElementsByClassName("visInventory")[0].className =
      "hiddenInventory";
    document.getElementsByClassName("visItemBox")[0].className =
      "hiddenItemBox";
      history.push("/tutorial")
    } else {
      alert(
        `it thinks you said ${page}, consider adding ${page} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`
      );
    }
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

  const assetClicked = (e) => {
    setActive(false);
    const clicked = e.target.className;
    const paintingClicked = e.target.id;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";
    stopAllAudio();
    switch (clicked || paintingClicked) {
      case "woodenSpoon":
        narrationBox.innerHTML =
          "A wooden spoon, a witch’s favorite tool. Potion stirrer and wand! What more could a witch want?";
        audioControl(sceneThreeAudio.woodenspoon);
        break;
      case "cauldron":
        let bool = JSON.parse(window.localStorage.getItem("usedCandyBucket"));
        bool
          ? audioControl(sceneThreeAudio.lilyCauldronTwo)
          : audioControl(sceneThreeAudio.lilyCauldronOne);
        narrationBox.innerHTML = bool
          ? "The smell is rather pleasant now, sweet and spicy, with a hint of something citricy.” Lily: “I was making my famous candied chilis! Now scram you oversized crow!” *squack*"
          : "Lily’s cauldron. It seems to be made out of cast iron with skull motifs on four sides of it. In the witch's pot is an unholy amount of chili peppers boiling. I am not sure what she is making, but it hurts to breathe it in.";
        break;
      case "witch":
        const hasCandyBucket = JSON.parse(
          window.localStorage.getItem("hasCandyBucket")
        );
        const usedCandyBucket = JSON.parse(
          window.localStorage.getItem("usedCandyBucket")
        );
        if (usedCandyBucket) {
          narrationBox.innerHTML =
            "Thank you for your lovely gift. I found this at the bottom of your candy bucket. I hope you make it out of here alive... *witches laugh*";
          window.localStorage.setItem("hasKey", true);
          window.dispatchEvent(new Event("storage"));
          audioControl(sceneThreeAudio.witchLine);
          break;
        }
        hasCandyBucket
          ? audioControl(sceneThreeAudio.giveCandyToWitch)
          : audioControl(sceneThreeAudio.talkToWitchFirst);
        narrationBox.innerHTML = hasCandyBucket
          ? "Is that candy, for me? Thank you kindly. Come and drink some of this potion sweaty. I have a feeling that you will need this in order to get out of here."
          : "Oh hello there deary. It appears you have also been stolen into the belly of this house monster. Child, I am missing something to counteract the spiciness of my brew here and I was wondering if you could help and old lady out?";
        break;
      case "grandFatherClock":
        narrationBox.innerHTML =
          "An old grandfather clock that has stopped working ages ago. It’s beautiful smooth dark wood has been kept in decent shape. It’s a shame that we are the only ones who get to enjoy this.";
        audioControl(sceneThreeAudio.clock);
        break;
      case "harvestPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          narrationBox.innerHTML =
            "The clouds do cast a shadow, but the painting is set during the day.";
          audioControl(sceneThreeAudio.paintingTwo);
          break;
        }
        narrationBox.innerHTML =
          "This painting depicts three women harvesting golden wheat on a hot fall day. A fluffy cloud looms in the distance foreshadowing a muddy week ahead.";
        audioControl(sceneThreeAudio.paintingOne);
        break;

      default:
        break;
    }
    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 15000);
    return;
  };

  return (
    <div className="sceneThreeBG">
      <div>
        <img
          className="woodenSpoon"
          src={woodenspoon}
          alt="A witches trusty wooden spoon"
          onClick={(event) => assetClicked(event)}
        ></img>
      </div>
      <div>
        <img
          className="cauldron"
          src={cauldron}
          alt="A black cauldron with skulls on it"
          onClick={(event) => assetClicked(event)}
        ></img>
      </div>
      <div>
        <img
          className="witch"
          src={witch}
          alt="A spooky witch sitting in a rocking-chair"
          onClick={(event) => {
            assetClicked(event);
            hasBucket();
          }}
        ></img>
      </div>
      <div>
        <img
          className="grandFatherClock"
          src={grandFatherClock}
          alt="A grandfather clock"
          onClick={(event) => assetClicked(event)}
        ></img>
      </div>
      <div>
        <img
          className="ravion"
          src={ravenClosed}
          alt="A spooky, but helpful raven"
        ></img>
      </div>
      <div>
        <img
          id="harvestPainting"
          src={harvestPainting}
          alt="classical painting of farmers working"
          onClick={(event) => assetClicked(event)}
        ></img>
      </div>
      <div className="narrationBox">
        <p id="narrationBox"></p>
      </div>
      <Link to="/entryway">
        <div>
          <img
            className="arrowRight"
            src={arrowRight}
            alt="An arrow that looks ghostly"
            onClick={() => stopAllAudio()}
          ></img>
        </div>
      </Link>
      <Link to="/storage">
        <div>
          <img
            className="arrowLeft"
            src={arrowLeft}
            alt="An arrow that looks ghostly"
            onClick={() => stopAllAudio()}
          ></img>
        </div>
      </Link>
    </div>
  );
};

export default SceneThree;
