import "../../App.scss";
import "../../main.scss";
import "./sceneTwo.scss";
import React, { useState } from "react";

import closedCoffin from "../../assets/SceneTwo/closed-coffin.png";
import openCoffin from "../../assets/SceneTwo/openCasket.png";
import stool from "../../assets/SceneTwo/stool-cabinet.png";
import hole from "../../assets/SceneTwo/holeinwall.png";
import wallCandle from "../../assets/SceneTwo/wall-candle.png";
import oldChair from "../../assets/SceneTwo/old-chair.png";
import savion from "../../assets/ravenClosedFIT.png";
import cowPainting from "../../assets/SceneTwo/cow-painting.png";
import leftArrow from "../../assets/ghostArrowLeft.png";
import rightArrow from "../../assets/ghostArrowRight.png";
import s2Sounds from "./sceneTwoSounds.json";
// import { playingAudio } from "../SceneOne/SceneOne";

import { Link, useHistory } from "react-router-dom";
import {Howl, Howler} from 'howler'
import { timeoutCollection } from "time-events-manager";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


let playingAudio = "none"

const SceneTwo = () => {
  const [isActive, setActive] = useState(false);
  const history = useHistory()

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

  let casket = false;

  const clickableItems = [
    "coffin",
    "coughing",
    "coffee",
    "old chair",
    "cow painting",
    "hole in wall",
    "left candle",
    "left candy",
    "right candle",
    "right candy",
    "stool cabinet",
    "stool",
    "stool cab",
    "raven",
  ];

  // ^^^items in this array should match all of the ${item}'s that are returned and shown in the alert  ^^^

  const pagePossibilities = [
    "right",
    "left",
    "next room",
    "previous room",
    "room one",
    "room three",
    "write",
  ];

  // ^^^ above should need no adjustments, if any are made we should all adjust with you ^^^

  const matchItemToClass = {
    coffin: "coffin",
    coughing: "coffin",
    coffee: "coffin",
    "old chair": "oldChair",
    "hole in wall": "holeInWall",
    "left candle": "leftCandle",
    "left candy": "leftCandle",
    "right candle": "rightCandle",
    "right candy": "rightCandle",
    "stool cabinet": "stoolCabinet",
    "stool cab": "stoolCabinet",
    stool: "stoolCabinet",
    "cow painting": "cowPainting",
  };

  // ^^^ this object will map the item as spoken, to the items class name as written, there are other ways to accomplish this ^^^

  const mapPageToLink = {
    right: "rightArrow",
    left: "leftArrow",
    write: "rightArrow",
    "next room": "rightArrow",
    "previous room": "leftArrow",
    "room one": "leftArrow",
    "room three": "rightArrow",
  };

  // ^^^ should need no adjustment, if adjusted we should all match the adjustment^^^

  function clickImage(item) {
    item = item.toLowerCase();
    console.log("🧤 item", item);
    if (clickableItems.includes(item)) {
      item = matchItemToClass[item];
      document.getElementsByClassName(item)[0].click();
    } else {
      console.log("🧤 item", item);
      alert(
        `it thinks you said ${item}, consider adding ${item} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`
      );
    }
  }

  function goTo(page) {
    console.log("🧤 what the api heard....", page);

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
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"))
    if (event.code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      SpeechRecognition.startListening();
      console.log("🧤 list");
    }
    const pagina = window.location.href === 'http://localhost:3000/storage'|| window.location.href === 'https://spooky-scapes.netlify.app/storage'

    // console.log('🧤 pagina', pagina);

    if(event.code === "Enter" && pagina) {
      event.preventDefault();
      if (event.repeat){
        return
      }

      if (!bool){
        sceneTwoAudio.scene2FirstDescription.play()
      }
      else {
        sceneTwoAudio.scene2SecondDescription.play()
      }
    }
  });

  document.addEventListener("keyup", (event) => {
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"))
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
      console.log("🧤 not");
    }

    const pagina = window.location.href === 'http://localhost:3000/storage' || window.location.href === 'https://spooky-scapes.netlify.app/storage'
    if(event.code === "Enter" && pagina){
      event.preventDefault()
      console.log('🧤 window.location.href', window.location.href);

      if(!bool){
        sceneTwoAudio.scene2FirstDescription.stop()
      } else{
        sceneTwoAudio.scene2SecondDescription.stop()
      }
    }
  });

  const heardRiddle = () => {
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
    if (bool) {
      window.localStorage.setItem("hasCandyBucket", true);
      window.dispatchEvent(new Event("storage"));
      document.getElementsByClassName("coffin")[0].src = openCoffin;
      console.log("🧤 casket", casket);
    }
  };

  const assetClicked = (e) => {
    timeoutCollection.removeAll();
    setActive(false);
    const clicked = e.target.className;
    console.log('🧤 e', e);

    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";
    stopAllAudio()

    switch (clicked) {
      case "coffin":
        const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
        bool ? audioControl(sceneTwoAudio.openCoffinDesc): audioControl(sceneTwoAudio.closedCoffinDesc)
        narrationBox.innerHTML = bool
          ? "A large coffin, it’s open but there isn’t anyone in it. The pungent smell emanating from it fills the room."
          : "A large coffin, the lid is heavy, you wonder what may be inside of it, but you’re too afraid to open it yourself.";
        break;
      case "cowPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          audioControl(sceneTwoAudio.cowPaintingDesc2)
          narrationBox.innerHTML =
            "It is getting close to night, but not really.";
          break;
        }
        audioControl(sceneTwoAudio.cowPaintingDesc)
        narrationBox.innerHTML =
          "A painting of a cow, what a strange painting to own.";
        break;
      case "stoolCabinet":
        // sceneTwoAudio.stoolCabinetDesc.play()
        audioControl(sceneTwoAudio.stoolCabinetDesc)
        narrationBox.innerHTML =
          "An old worn down stool cabinet that doesn’t open.";
        break;
      case "oldChair":
        // sceneTwoAudio.oldChairDesc.play()
        audioControl(sceneTwoAudio.oldChairDesc)
        narrationBox.innerHTML =
          "An old worn down chair, it doesn’t look sturdy enough to sit on.";
        break;
      case "holeInWall":
        // sceneTwoAudio.holeInWallDesc.play()
        audioControl(sceneTwoAudio.holeInWallDesc)
        narrationBox.innerHTML =
          "The old purple wallpaper has a huge hole in it, there doesn’t seem to be anything behind that wallpaper but darkness";
        break;
      case "rightCandle":
        // sceneTwoAudio.candles.play()
        audioControl(sceneTwoAudio.candles)
        narrationBox.innerHTML =
          "A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?";
        break;
      case "leftCandle":
        // sceneTwoAudio.candles.play()
        audioControl(sceneTwoAudio.candles)
        narrationBox.innerHTML =
          "A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?";
        break;
      default:
        break;
    }

    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 15000);
  };

  const sceneTwoAudio = {
    scene2FirstDescription: new Howl({src: [s2Sounds[0].sceneTwoInitialDescription], html5: true}),

    scene2SecondDescription: new Howl({src: [s2Sounds[1].sceneTwoSecondDescription], html5: true}),

    closedCoffinDesc: new Howl({src:[s2Sounds[2].closedCoffinDesc], html5:true}),

    openCoffinDesc: new Howl({src:[s2Sounds[3].openCoffinDesc], html5:true}),

    stoolCabinetDesc: new Howl({src:[s2Sounds[4].stoolCabinetDesc], html5:true}),

    candles: new Howl({src:[s2Sounds[5].candles], html5: true}),

    holeInWallDesc: new Howl({src:[s2Sounds[6].holeInWallDesc],html5: true}),

    cowPaintingDesc: new Howl({src: [s2Sounds[7].cowPaintingDesc], html5: true}),

    oldChairDesc: new Howl({src: [s2Sounds[8].oldChairDesc], html5:true}),

    cowPaintingDesc2: new Howl({src: [s2Sounds[9].cowPaintingDesc2], html5:true})

  }
  const audioControl = (specifiedSound) => {
    playingAudio = specifiedSound
    !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop()
}

const stopAllAudio = () => {
  if(playingAudio !== "none"){
    playingAudio.stop()
  }
}

  return (
    <div className="sceneTwo">
      <div>
        <img
          src={closedCoffin}
          alt="an open coffin"
          className="coffin"
          onClick={(e) => {
            assetClicked(e);
            heardRiddle();
          }}
        />
      </div>
      <div></div>
      <div>
        <img
          src={oldChair}
          alt="a very old chair"
          className="oldChair"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={stool}
          alt="an old nasty cabinet"
          className="stoolCabinet"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={hole}
          alt="an odd hole in the wall"
          className="holeInWall"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={wallCandle}
          alt="a lit candle"
          className="rightCandle"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={wallCandle}
          alt="a lit candle"
          className="leftCandle"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={cowPainting}
          alt="an interesting painting"
          className="cowPainting"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={savion}
          className="raven-quiet"
          alt="a squawking talking raven"
        />
      </div>
      <div className="narrationBox">
        <p
          id="narrationBox"
          className={isActive ? "coffin-text-active" : "coffin-text"}
        ></p>
      </div>
      <Link to="/parlor" onClick={(e) => {
              e.preventDefault()
              console.log(playingAudio)
              stopAllAudio()
              history.push("/parlor")
            }}>
        <div>
          <img src={leftArrow} id="leftArrow" onClick={() => stopAllAudio()} alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/witchDen" onClick={(e) => {
              e.preventDefault()
              console.log(playingAudio)
              stopAllAudio()
              history.push("/witchDen")
            }}>
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

export default SceneTwo;
