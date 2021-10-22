// IMPORT REACT, ALL ASSETS FOR SCENE ONE, CSS, SOUNDS, AND ANY OTHER ITEMS
import React, { useState } from "react";
import boatPainting from "../../assets/SceneOne/boat-painting.png";
import bookCase from "../../assets/SceneOne/empty-bookcase.jpeg";
import lockedDiary from "../../assets/SceneOne/locked-diary.png";
import endTable from "../../assets/SceneOne/victorian-cabinet.png";
import bookShelf from "../../assets/SceneOne/bookshelf-full.png";
import crystalSkull from "../../assets/SceneOne/crystal-skull.png";
import cassettePlayer from "../../assets/SceneOne/cassette-player.png";
import ravenClosed from "../../assets/SceneOne/ravenClosedFIT.png";
import leftArrow from "../../assets/ghostArrowLeft.png";
import rightArrow from "../../assets/ghostArrowRight.png";
import "./sceneone.scss";
import "../../main.scss";
import "../../App.scss";
import s1sounds from "./sceneOneSounds.json";
import { Link, useHistory } from "react-router-dom";
import { Howl } from "howler";
import { getStorage, ref } from "firebase/storage";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// SCENE 1 IS RESPONSIBLE FOR SETTING THE INITIAL LOCAL STORAGE
//jk that's been moved to Lobby. Sawyy <.< >.>

// DEFINE GLOBAL VARIABLE TO IDENTIFY WHICH AUDIO IS CURRENTLY PLAYING
let playingAudio = "none";

// DEFINE FUNCTIONAL COMPONENT
const SceneOne = () => {
  // SET STATES NEEDED FOR SCENE TO RUN
  const [isActive, setActive] = useState(false);
  const [hiddenDiary, setHidden] = useState(true);
  const history = useHistory();

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

  // THE COMMANDS ARRAY DEFINES THE TYPES OF VOICE COMMANDS THAT CAN BE GIVEN
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

  // THIS TELLS SPEECH RECOGNITION TO USE THE COMMANDS DEFINED ABOVE
  useSpeechRecognition({ commands });

  // DEFINE ALL POSSIBLE VARIATIONS OF WHAT THE SPEECH TO TEXT MAY HEAR
  // FOR EXAMPLE, "COFFIN" MAY SOUND LIKE "COFFEE" SO INCLUDE BOTH IN THE ARRAY.
  // CLICKABLE ITEMS WILL MATCH WITH THE "CLICK ON *" COMMANDS
  const clickableItems = [
    "empty bookcase",
    "bookcase",
    "empty bookshelf",
    "bookshelf",
    "boat painting",
    "painting",
    "end table",
    "table",
    "skull",
    "crystal skull",
    "full book",
    "full book case",
    "full book shelf",
    "full bookshelf",
    "full bookcase",
    "cassette player",
    "cassette tape",
    "raven",
  ];

  // PAGE POSSIBILITIES WILL MATCH WITH THE "GO TO *" COMMANDS
  const pagePossibilities = [
    "right",
    "left",
    "next room",
    "previous room",
    "room two",
    "room four",
    "write",
  ];

  // THIS OBJECT MATCHES WHAT THE SPEECH RECOGNITION HEARD TO AN ACTUAL CLASS IN SCENE ONE
  const matchItemToClass = {
    "empty bookcase": "bookCase",
    bookcase: "bookCase",
    "empty bookshelf": "bookCase",
    bookshelf: "bookCase",
    "boat painting": "boatPainting",
    painting: "boatPainting",
    "end table": "endTable",
    table: "endTable",
    skull: "crystal-skull",
    "crystal skull": "crystal-skull",
    "full book": "full-bookshelf",
    "full book case": "full-bookshelf",
    "full book shelf": "full-bookshelf",
    "full bookshelf": "full-bookshelf",
    "full bookcase": "full-bookshelf",
    "cassette player": "cassettePlayer",
    "cassette": "cassettePlayer",
    raven: "ravenClosed",
  };

  // THIS OBJECT MATCHES WHAT THE SPEECH RECOGNITION HEARD TO EITHER THE LEFT ARROW OR THE RIGHT ARROW
  const mapPageToLink = {
    right: "rightArrow",
    left: "leftArrow",
    write: "rightArrow",
    "next room": "rightArrow",
    "previous room": "leftArrow",
    "room four": "leftArrow",
    "room two": "rightArrow",
  };

  // THIS FUNCTION TAKES THE SPEECH TO TEXT AND CLICKS ON THE CORRELATED ITEM
  function clickImage(item) {
    stopAllAudio()
    item = item.toLowerCase();
    if (clickableItems.includes(item)) {
      item = matchItemToClass[item];
      document.getElementsByClassName(item)[0].click();
    } else {
      descriptions.confused.play()
      document.getElementById("narrationBox").className = 'painting-text-active'
      document.getElementById("narrationBox").innerHTML = 'I am truly perplexed by your request, speak clearly child and try again.'
      setTimeout(()=> document.getElementById("narrationBox").className = 'painting-text', 6500)
      // alert(
      //   `it thinks you said ${item}, consider adding ${item} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`
      // );
    }
  }

  function goTo(page) {
    console.log("🧤 what the api heard....", page);
    stopAllAudio()

    if (pagePossibilities.includes(page)) {
      page = mapPageToLink[page];
      document.getElementById(page).click();
    } else if (String(page) === "tutorial"){
        document.getElementsByClassName("visInventory")[0].className =
          "hiddenInventory";
        document.getElementsByClassName("visItemBox")[0].className =
          "hiddenItemBox";
      history.push("/tutorial")
    }else {
      descriptions.confused.play()
      document.getElementById("narrationBox").className = 'painting-text-active'
      document.getElementById("narrationBox").innerHTML = 'I am truly perplexed by your request, speak clearly child and try again.'
      setTimeout(()=> document.getElementById("narrationBox").className = 'painting-text', 6500)
      // alert(
      //   `it thinks you said ${page}, consider adding ${page} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`
      // );
    }
  }

  document.addEventListener("keydown", (event) => {
    stopAllAudio()
    const bool = JSON.parse(window.localStorage.getItem("usedCandyBucket"));
    if (event.code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return;
      }

      SpeechRecognition.startListening();
      console.log("🧤 list");
    }

    const pagina1 =
      window.location.href === "http://localhost:3000/parlor" ||
      window.location.href === "https://spooky-scapes.netlify.app/parlor";

    if (event.code === "Enter" && pagina1) {

      event.preventDefault();
      if (event.repeat) {
        return;
      }

      if (!bool) {
        descriptions.scene1desc1.play();
      } else {
        descriptions.scene1desc2.play();
      }
    }
  });

  document.addEventListener("keyup", (event) => {
    const bool = JSON.parse(window.localStorage.getItem("usedCandyBucket"));
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
      console.log("🧤 not");
    }
    const pagina1 =
      window.location.href === "http://localhost:3000/parlor" ||
      window.location.href === "https://spooky-scapes.netlify.app/parlor";

    if (event.code === "Enter" && pagina1) {
      event.preventDefault();
      if (!bool) {
        descriptions.scene1desc1.stop();
      } else {
        descriptions.scene1desc2.stop();
      }
    }
  });

  const descriptions = {
    scene1desc1: new Howl({
      src: [s1sounds[0].sceneOneDescription],
      html5: true,
    }),
    scene1desc2: new Howl({
      src: [s1sounds[8].sceneOneDescription2],
      html5: true,
    }),
    table: new Howl({ src: [s1sounds[1].sideTable], html5: true }),
    riddle: new Howl({ src: [s1sounds[2].riddle], html5: true }),
    bookCaseWithDairy: new Howl({
      src: [s1sounds[3].bookcaseWithDiary],
      html5: true,
    }),
    emptyBookcase: new Howl({ src: [s1sounds[4].emptyBookcase], html5: true }),
    fullBookcase: new Howl({ src: [s1sounds[5].fullBookcase], html5: true }),
    cassettePlayerEmpty: new Howl({
      src: [s1sounds[6].cassettePlayerEmpty],
      html5: true,
    }),
    skull: new Howl({ src: [s1sounds[7].skull], html5: true }),
    diaryNoKey: new Howl({ src: [s1sounds[9].diaryNoKey], html5: true }),
    diaryMessage: new Howl({ src: [s1sounds[10].diaryMessage], html5: true }),
    paintingDesc1: new Howl({ src: [s1sounds[11].paintingDesc1], html5: true }),
    paintingDesc2: new Howl({ src: [s1sounds[12].paintingDesc2], html5: true }),
    caw: new Howl({ src: [s1sounds[13].caw], html5: true }),
    confused: new Howl({src:[s1sounds[14].confused], html5: true})
  };

  const audioControl = (specifiedSound) => {
    playingAudio = specifiedSound;
    !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop();
  };

  const stopAllAudio = () => {
    if (playingAudio !== "none") {
      playingAudio.stop();
    }
  };

  const invokeCasset = () => {
    const bool = JSON.parse(window.localStorage.getItem("hasCasset"));
    if (bool) {
      window.localStorage.setItem("usedCasset", true);
      window.localStorage.setItem("usedKey", true);
    }
  };

  const assetClicked = (e) => {
    setActive(false);
    const clicked = e.target.className;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";

    stopAllAudio();

    switch (clicked) {
      case "boatPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          narrationBox.innerHTML =
            "It is a lovely painting, but I don't see any orbs in it.";
          audioControl(descriptions.paintingDesc2);
          console.log("playing desc2");
          break;
        }
        narrationBox.innerHTML = "What a lovely old painting.";
        audioControl(descriptions.paintingDesc1);
        console.log("playing desc1");
        break;
      case "bookCase":
        narrationBox.innerHTML = hiddenDiary
          ? "This bookcase is empty. I wonder if it could be hiding something."
          : "There is a locked diary here now. Do you have anything that can unlock it?";
        break;
      case "lockedDiary":
        let hasKey = JSON.parse(window.localStorage.getItem("hasKey"));
        if (hasKey) {
          narrationBox.innerHTML =
            "The message written inside the diary: 'My time has run out, but perhaps it is not too late for you. Pay close attention to my message, and your escape shall be illuminated. Midnight Orb Overhead Nightly.'";
          window.localStorage.setItem("usedKey", true);
          audioControl(descriptions.diaryMessage);
          break;
        }
        narrationBox.innerHTML =
          "The diary is locked. Is there something in the room that can unlock it?";
        audioControl(descriptions.diaryNoKey);
        break;
      case "endTable":
        narrationBox.innerHTML = "Drat, nothing under here.";
        audioControl(descriptions.table);
        break;
      case "full-bookshelf":
        narrationBox.innerHTML = "There may be something useful in here.";
        audioControl(descriptions.fullBookcase);
        break;
      case "crystal-skull":
        narrationBox.innerHTML =
          "I sure am glad that’s not my skull on the table.";
        audioControl(descriptions.skull);
        break;
      case "cassettePlayer":
        narrationBox.innerHTML = JSON.parse(
          window.localStorage.getItem("hasCasset")
        )
          ? "*Cassette player plays this riddle* The person who built it sold it. The person who bought it never used it. The person who used it never saw it. What is it?"
          : "Hmm, the cassette seems to be missing.";
        break;
      case "ravenClosed":
        narrationBox.innerHTML = "Hi, I am Savion the Raven. I'm watching you.";
        audioControl(descriptions.caw);
        break;
      default:
        break;
    }
    setActive(true);
    setTimeout(function () {
      setActive(false);
    }, 30000);
    return;
  };

  return (
    <div className="sceneOne">
      <div>
        <img
          src={boatPainting}
          className="boatPainting"
          alt="Oil painting of four sailboats"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={bookCase}
          className="bookCase"
          alt="large wooden bookcase that is empty"
          onClick={(e) => {
            assetClicked(e);
            let isDiary = JSON.parse(
              window.localStorage.getItem("usedCandyBucket")
            );
            if (isDiary) {
              audioControl(descriptions.bookCaseWithDairy);
            } else {
              audioControl(descriptions.emptyBookcase);
            }
          }}
        />
      </div>
      <div>
        <img
          src={
            JSON.parse(window.localStorage.getItem("usedCandyBucket"))
              ? lockedDiary
              : ""
          }
          className="lockedDiary"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={endTable}
          className="endTable"
          alt="victorian-style wooden end table with four curved legs and a flat square top"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={bookShelf}
          className="full-bookshelf"
          alt="wooden bookshelf with several books and knick knacks inside of it"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={crystalSkull}
          className="crystal-skull"
          alt="green crystal skull"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={cassettePlayer}
          className="cassettePlayer"
          alt="small cassette player"
          onClick={(e) => {
            assetClicked(e);
            invokeCasset();
            let hasCasset = JSON.parse(
              window.localStorage.getItem("hasCasset")
            );
            if (hasCasset) {
              audioControl(descriptions.riddle);
            } else {
              audioControl(descriptions.cassettePlayerEmpty);
            }
          }}
        />
      </div>
      <div>
        <img
          src={ravenClosed}
          className="ravenClosed"
          alt="wise old raven to guide you on your journey"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <Link
        to="/entryway"
        onClick={(e) => {
          e.preventDefault();
          console.log(playingAudio);
          stopAllAudio();
          history.push("/entryway");
        }}
      >
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link
        to="/storage"
        onClick={(e) => {
          e.preventDefault();
          console.log(playingAudio);
          stopAllAudio();
          history.push("/storage");
        }}
      >
        <div>
          <img
            src={rightArrow}
            id="rightArrow"
            alt="ghost arrow pointing right"
          />
        </div>
      </Link>
      <div className="narrationBox">
        <p
          id="narrationBox"
          className={isActive ? "painting-text-active" : "painting-text"}
        ></p>
      </div>
    </div>
  );
};
export default SceneOne;
