// SCSS Imports

import "../../App.scss";
import "../../main.scss";
import "./sceneTwo.scss";

// Asset Imports
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

// Library Imports
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Howl } from "howler";
import { timeoutCollection } from "time-events-manager";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

let playingAudio = "none";

const SceneTwo = () => {
  const [isActive, setActive] = useState(false);
  const history = useHistory();

  const timerTracker = setInterval(function () {
    if (document.getElementById("timer")) {
      let element = document.getElementById("timer").innerHTML;
      if (String(element) === "00:01") {
        stopAllAudio();
        stopAllAudio();
        clearInterval(timerTracker);
      }
    } else clearInterval(timerTracker);
  }, 1000);

  const commands = [
    // To add additional commands, add another command to the commands array, and a callback to handle that command
    {
      command: ["Click on *"],
      callback: (item) => clickImage(item),
    },
    {
      command: ["Go to *"],
      callback: (page) => goTo(page),
    },
    {
      command: ["Read the room"],
      callback: () => readRoom(),
    },
    {
      command: ["Check bag"],
      callback: () => checkBag(),
    },
  ];
  useSpeechRecognition({ commands });

  let casket = false;
  //^^Savion. What dis^^
  const clickableItems = [
    // An array of items that may be said by a user, these are the only words we listen for with the Click on command
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

  // ^^^ this object will map the item as spoken, to the items class name as written ^^^

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

  //this section is used for inventory reading
  let noMoreCasset = false;
  let noMoreCandyBucket = false;
  let noMoreKey = false;

  const checkBag = () => {
    const casset = JSON.parse(window.localStorage.getItem("hasCasset"));
    const candy = JSON.parse(window.localStorage.getItem("hasCandyBucket"));
    const keyBool = JSON.parse(window.localStorage.getItem("hasKey"));
    if (casset && !noMoreCasset) {
      console.log("casset");
      noMoreCasset = true;
    } else {
      console.log("I am empty....");
    }
    if (candy && !noMoreCandyBucket) {
      console.log("candy");
      noMoreCandyBucket = true;
    }
    if (keyBool && !noMoreKey) {
      console.log("key");
      noMoreKey = true;
    }
  };

  function clickImage(item) {
    // this function is used as the callback for the click on command

    item = item.toLowerCase();
    if (clickableItems.includes(item)) {
      item = matchItemToClass[item];
      document.getElementsByClassName(item)[0].click();
    } else {
      sceneTwoAudio.confused.play();
      document.getElementById("narrationBox").innerHTML =
        "I am truly perplexed by your request, speak clearly child and try again.";
      setActive(true);
      setTimeout(function () {
        setActive(false);
      }, 6500);
      // this alert is left for developers, note that it shows the item received from the spoken command, and displays it.
      // alert(
      //   `it thinks you said ${item}, consider adding ${item} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`
      // );
    }
  }

  const readRoom = () => {
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
    if (!bool) {
      audioControl(sceneTwoAudio.scene2FirstDescription);
    } else {
      audioControl(sceneTwoAudio.scene2SecondDescription);
    }
  };

  function goTo(page) {
    // this function is used as the callback for the go to command, in the event that you need to debug you may use the console.log below

    // console.log("🧤 what the api heard....", page);

    if (pagePossibilities.includes(page)) {
      page = mapPageToLink[page];
      document.getElementById(page).click();
    } else if (String(page) === "tutorial") {
      document.getElementsByClassName("visInventory")[0].className =
        "hiddenInventory";
      document.getElementsByClassName("visItemBox")[0].className =
        "hiddenItemBox";
      history.push("/tutorial");
    } else {
      sceneTwoAudio.confused.play();
      document.getElementById("narrationBox").innerHTML =
        "I am truly perplexed by your request, speak clearly child and try again.";
      setActive(true);
      setTimeout(function () {
        setActive(false);
      }, 6500);
    }
  }

  document.addEventListener("keydown", (event) => {
    // This listener allows users to initiate an audio description of the current room they're in, or listen for click on commands for listed items in the room
    setActive(false);
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
    if (event.code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      stopAllAudio();
      SpeechRecognition.startListening();
    }
    //
    // const pagina =
    //   window.location.href === "http://localhost:3000/storage" ||
    //   window.location.href === "https://spooky-scapes.netlify.app/storage";

    // if (event.code === "Enter" && pagina) {
    //   event.preventDefault();
    //   stopAllAudio()
    //   if (event.repeat) {
    //     return;
    //   }

    //   if (!bool) {
    //     sceneTwoAudio.scene2FirstDescription.play();
    //   } else {
    //     sceneTwoAudio.scene2SecondDescription.play();
    //   }
    // }
  });

  document.addEventListener("keyup", (event) => {
    // this listen
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
    }

    const pagina =
      window.location.href === "http://localhost:3000/storage" ||
      window.location.href === "https://spooky-scapes.netlify.app/storage";

    if (event.code === "Enter" && pagina) {
      event.preventDefault();

      if (!bool) {
        sceneTwoAudio.scene2FirstDescription.stop();
      } else {
        sceneTwoAudio.scene2SecondDescription.stop();
      }
    }
  });

  const heardRiddle = () => {
    const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
    if (bool) {
      window.localStorage.setItem("hasCandyBucket", true);
      window.dispatchEvent(new Event("storage"));
      document.getElementsByClassName("coffin")[0].src = openCoffin;
    }
  };

  const assetClicked = (e) => {
    timeoutCollection.removeAll();
    setActive(false);
    const clicked = e.target.className;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";
    stopAllAudio();

    switch (clicked) {
      case "coffin":
        const bool = JSON.parse(window.localStorage.getItem("usedCasset"));
        bool
          ? audioControl(sceneTwoAudio.openCoffinDesc)
          : audioControl(sceneTwoAudio.closedCoffinDesc);
        narrationBox.innerHTML = bool
          ? "A large coffin, it’s open but there isn’t anyone in it. The pungent smell emanating from it fills the room."
          : "A large coffin, the lid is heavy, you wonder what may be inside of it, but you’re too afraid to open it yourself.";
        break;
      case "cowPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          audioControl(sceneTwoAudio.cowPaintingDesc2);
          narrationBox.innerHTML =
            "It is getting close to night, but not really.";
          break;
        }
        audioControl(sceneTwoAudio.cowPaintingDesc);
        narrationBox.innerHTML =
          "A painting of a cow, what a strange painting to own.";
        break;
      case "stoolCabinet":
        audioControl(sceneTwoAudio.stoolCabinetDesc);
        narrationBox.innerHTML =
          "An old worn down stool cabinet that doesn’t open.";
        break;
      case "oldChair":
        audioControl(sceneTwoAudio.oldChairDesc);
        narrationBox.innerHTML =
          "An old worn down chair, it doesn’t look sturdy enough to sit on.";
        break;
      case "holeInWall":
        audioControl(sceneTwoAudio.holeInWallDesc);
        narrationBox.innerHTML =
          "The old purple wallpaper has a huge hole in it, there doesn’t seem to be anything behind that wallpaper but darkness";
        break;
      case "rightCandle":
        audioControl(sceneTwoAudio.candles);
        narrationBox.innerHTML =
          "A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?";
        break;
      case "leftCandle":
        audioControl(sceneTwoAudio.candles);
        narrationBox.innerHTML =
          "A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?";
        break;
      default:
        break;
    }

    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 30000);
  };

  const sceneTwoAudio = {
    scene2FirstDescription: new Howl({
      src: [s2Sounds[0].sceneTwoInitialDescription],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    scene2SecondDescription: new Howl({
      src: [s2Sounds[1].sceneTwoSecondDescription],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    closedCoffinDesc: new Howl({
      src: [s2Sounds[2].closedCoffinDesc],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    openCoffinDesc: new Howl({
      src: [s2Sounds[3].openCoffinDesc],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    stoolCabinetDesc: new Howl({
      src: [s2Sounds[4].stoolCabinetDesc],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    candles: new Howl({
      src: [s2Sounds[5].candles],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    holeInWallDesc: new Howl({
      src: [s2Sounds[6].holeInWallDesc],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    cowPaintingDesc: new Howl({
      src: [s2Sounds[7].cowPaintingDesc],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    oldChairDesc: new Howl({
      src: [s2Sounds[8].oldChairDesc],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    cowPaintingDesc2: new Howl({
      src: [s2Sounds[9].cowPaintingDesc2],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
    }),

    confused: new Howl({
      src: [s2Sounds[10].confused],
      html5: true,
      preload: false,
      onend: function () {
        this.unload();
      },
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
      <Link to="/parlor">
        <div>
          <img
            src={leftArrow}
            id="leftArrow"
            onClick={() => stopAllAudio()}
            alt="ghost arrow pointing left"
          />
        </div>
      </Link>
      <Link to="/witchDen">
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
