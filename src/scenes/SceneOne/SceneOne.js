// ******** Import all assets ********
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
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// ******** Define the global variable "playingAudio" to identify which audio description is currently playing ********
let playingAudio = "none";

// ******** Define the functional component for Scene 1 ********
const SceneOne = () => {
  // ******** isActive runs the text box display ********
  const [isActive, setActive] = useState(false);
  const history = useHistory();

  // ******** This tracks the timer and stops all audio from playing when time runs out. ********
  const timerTracker = setInterval(function(){
    if (document.getElementById('timer')){
      let element = document.getElementById('timer').innerHTML
      if (String(element) === "00:01"){
        stopAllAudio();
        stopAllAudio();
        clearInterval(timerTracker);
      }
    } else clearInterval(timerTracker);
  }, 1000);

  // ******** Defines the types of voice commands that can be given ********
  const commands = [
    {
      command: ["Click on *"], // *** For clicking individual items in the room ***
      callback: (item) => clickImage(item),
    },
    {
      command: ["Go to *"], // *** For navigation ***
      callback: (page) => goTo(page),
    },
    { command: ["Read the room"], callback: () => readRoom() },
    { command: ["Check bag"], callback: () => checkBag() },
  ];

  // ******** Connects the commands above to Speech Recognition ********
  useSpeechRecognition({ commands });

  // ******** Defines all possible variations of what the Speech To Text may hear. ********
  // For example, "coffin" may sound like "coffee", so both should be accounted for.
  // ******** This matches specifically to "Click on *" commands. ********
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

  // ******** This matches specifically to "Go to *" commands. ********
  const pagePossibilities = [
    "right",
    "left",
    "next room",
    "previous room",
    "room two",
    "room four",
    "write",
  ];

  // ******** Match possible audio commands defined above to existing classes rendered on the page. Specific to "click on" commands. ********
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
    cassette: "cassettePlayer",
    raven: "ravenClosed",
  };

  // ******** Match possible audio commands defined above to existing classes rendered on the page. Specific to "go to" commands. ********
  const mapPageToLink = {
    right: "rightArrow",
    left: "leftArrow",
    write: "rightArrow",
    "next room": "rightArrow",
    "previous room": "leftArrow",
    "room four": "leftArrow",
    "room two": "rightArrow",
  };
  //THIS PART TAKES CARE OF READING INVENTORY!!!!
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
  // THIS FUNCTION TAKES THE SPEECH TO TEXT AND CLICKS ON THE CORRELATED ITEM
  function clickImage(item) {
    stopAllAudio();

  // ******** Audio Command Click On Function - Takes STT and clicks on correlated item. ********
  function clickImage(item) {
    stopAllAudio() // Uses hoisting. This function stops any audio that may already be playing. Defined lower down.
    item = item.toLowerCase();
    if (clickableItems.includes(item)) {
      item = matchItemToClass[item]; // This removes the spaces and matches what STT heard to the correct class
      document.getElementsByClassName(item)[0].click();
    } else { // Error handling
      descriptions.confused.play()
      document.getElementById("narrationBox").className = 'painting-text-active'
      document.getElementById("narrationBox").innerHTML = 'I am truly perplexed by your request, speak clearly child and try again.'
      setTimeout(()=> document.getElementById("narrationBox").className = 'painting-text', 6500)
    }
  }

  // ******** Audio Command Functionality for Go To Commands
  function goTo(page) {
    stopAllAudio() // Stops audio so one scene's descriptions don't carry over to another scene.

    if (pagePossibilities.includes(page)) {
      page = mapPageToLink[page];
      document.getElementById(page).click();
    } else if (String(page) === "tutorial"){
        document.getElementsByClassName("visInventory")[0].className =
          "hiddenInventory";
        document.getElementsByClassName("visItemBox")[0].className =
          "hiddenItemBox";
      history.push("/tutorial")
    }else { // Error handling
      descriptions.confused.play()
      document.getElementById("narrationBox").className = 'painting-text-active'
      document.getElementById("narrationBox").innerHTML = 'I am truly perplexed by your request, speak clearly child and try again.'
      setTimeout(()=> document.getElementById("narrationBox").className = 'painting-text', 6500)
    }
  }

  // ******** Spacebar Event Handling ********
  // This allows a user to hold down the space bar and give voice commands.
  document.addEventListener("keydown", (event) => {
    stopAllAudio()
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

  // ******** Creates audio description Howl objects ********
  // Due to the length of each audio file's reference link, we chose to import a json file and reference that.
  const descriptions = {
    scene1desc1: new Howl({ 
      src: [s1sounds[0].sceneOneDescription],  // Provides the source for the audio
      html5: true,  // Necessary for audio playback
      preload: false, // Do not load until called, saves memory
      onend: function(){this.unload()}}), // Unloads the audio object after it plays to save memory

    scene1desc2: new Howl({ src: [s1sounds[8].sceneOneDescription2], html5: true, preload: false, onend: function(){this.unload()}}),
    table: new Howl({ src: [s1sounds[1].sideTable], html5: true, preload: false, onend: function(){this.unload()}}),
    riddle: new Howl({ src: [s1sounds[2].riddle], html5: true, preload: false, onend: function(){this.unload()}}),
    bookCaseWithDairy: new Howl({ src: [s1sounds[3].bookcaseWithDiary], html5: true, preload: false, onend: function(){this.unload()}}),
    emptyBookcase: new Howl({ src: [s1sounds[4].emptyBookcase], html5: true, preload: false, onend: function(){this.unload()}}),
    fullBookcase: new Howl({ src: [s1sounds[5].fullBookcase], html5: true, preload: false, onend: function(){this.unload()}}),
    cassettePlayerEmpty: new Howl({ src: [s1sounds[6].cassettePlayerEmpty], html5: true, preload: false, onend: function(){this.unload()}}),
    skull: new Howl({ src: [s1sounds[7].skull], html5: true, preload: false, onend: function(){this.unload()}}),
    diaryNoKey: new Howl({ src: [s1sounds[9].diaryNoKey], html5: true, preload: false, onend: function(){this.unload()}}),
    diaryMessage: new Howl({ src: [s1sounds[10].diaryMessage], html5: true, preload: false, onend: function(){this.unload()}}),
    paintingDesc1: new Howl({ src: [s1sounds[11].paintingDesc1], html5: true, preload: false, onend: function(){this.unload()}}),
    paintingDesc2: new Howl({ src: [s1sounds[12].paintingDesc2], html5: true, preload: false, onend: function(){this.unload()}}),
    caw: new Howl({ src: [s1sounds[13].caw], html5: true, preload: false, onend: function(){this.unload()}}),
    confused: new Howl({src:[s1sounds[14].confused], html5: true, preload: false, onend: function(){this.unload()}})
  };

  // ******** "Read The Room" Voice Command Functionality ********
  const readRoom = () => {
    const bool = JSON.parse(window.localStorage.getItem("usedCandyBucket")) // If the user has given candy from the candy bucket to the witch...
    if(!bool){
     audioControl(descriptions.scene1desc1) // ... play the audio where the diary has not been revealed.
    } else {
      audioControl(descriptions.scene1desc2) // ... play the audio where the diary has been revealed.
    }
  };

  // ******** AUDIO PLAYBACK FUNCTION ********
  // Takes in specified sound, sets that sound as the playingAudio, and plays the sound.
  const audioControl = (specifiedSound) => {
    playingAudio = specifiedSound;
    !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop(); // This stops the audio from playing over itself
  };

  // ******** STOP ALL AUDIO FUNCTION ********
  // This stops and unloads the audio that is currently playing.
  const stopAllAudio = () => {
    if (playingAudio !== "none") {
      playingAudio.stop();
      playingAudio.unload();
    }
  };

  // ******** ********
  const invokeCasset = () => {
    const bool = JSON.parse(window.localStorage.getItem("hasCasset"));
    if (bool) {
      window.localStorage.setItem("usedCasset", true);
      // window.localStorage.setItem("usedKey", true);
    }
  };


  // ******** FUNCTION FOR EVERY TIME AN ASSET WAS CLICKED ********
  const assetClicked = (e) => {
    setActive(false); // Clears text box
    const clicked = e.target.className;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";

    stopAllAudio(); // Clears any currently playing audio
    
    // ******** FULL SWITCH CASE ********
    switch (clicked) {
      case "boatPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          narrationBox.innerHTML =
            "It is a lovely painting, but I don't see any orbs in it.";
          audioControl(descriptions.paintingDesc2);
          break;
        }
        narrationBox.innerHTML = "What a lovely old painting.";
        audioControl(descriptions.paintingDesc1);
        break;
      case "bookCase":
        let usedBucket = JSON.parse(
          window.localStorage.getItem("usedCandyBucket")
        );
        if (usedBucket) {
          narrationBox.innerHTML =
            "There is a locked diary here now. Do you have anything that can unlock it?";
          audioControl(descriptions.bookCaseWithDairy);
          break;
        }
        narrationBox.innerHTML =
          "This bookcase is empty. I wonder if it could be hiding something.";
        audioControl(descriptions.emptyBookcase);
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
          ? "*Cassette player plays this riddle* What has no lungs, but still can bark. He codes all day. It is his hallmark."
          : "Hmm, the cassette seems to be missing.";
        break;
      case "ravenClosed":
        narrationBox.innerHTML = "Hi, I am Savion the Raven. I'm watching you.";
        audioControl(descriptions.caw);
        break;
      default:
        break;
    }
    setActive(true); // Puts text from proper case into text box
    setTimeout(function () {
      setActive(false); // Removes text from text box after interval ends
    }, 30000); // Text stays for 30 seconds
    return;
  };


  // ******** THE RENDERED PORTION! ********
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
