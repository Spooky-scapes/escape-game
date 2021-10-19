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
import { Link } from "react-router-dom"
import {Howl, Howler} from 'howler';
import { getStorage, ref } from "firebase/storage";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


window.localStorage.setItem("hasCasset", false);
window.localStorage.setItem("usedCasset", false);
window.localStorage.setItem("hasCandyBucket", false);
window.localStorage.setItem("usedCandyBucket", false);
window.localStorage.setItem("hasKey", false);
window.localStorage.setItem("usedKey", false);
window.localStorage.setItem("foundPainting", false);

const SceneOne = () => {
  const [isActive, setActive] = useState(false);
  const [hiddenDiary, setHidden] = useState(true);

  const commands = [
    {
      command: ['Click on *'],
      callback: (item) => clickImage(item)
    },
    {
      command: ['Go to *'],
      callback: (page) => goTo(page)
    }
  ]
  useSpeechRecognition({ commands });

  const clickableItems = ['empty bookcase','bookcase', 'empty bookshelf', 'bookshelf', 'boat painting', 'painting', 'end table', 'table','skull', 'crystal skull', 'full book case', 'full book shelf','cassette player','raven']

  const pagePossibilities = ['right', 'left', 'next room', 'previous room', 'room two', 'room four', 'write']

  const matchItemToClass = {
    'empty bookcase': 'bookCase',
    'bookcase': 'bookCase',
    'empty bookshelf': 'bookCase',
    'bookshelf' : 'bookCase',
    'boat painting': 'boatPainting',
    'painting': 'boatPainting',
    'end table' : 'endTable',
    'table': 'endTable',
    'skull': 'crystal-skull',
    'crystal skull': 'crystal-skull',
    'full book case': 'full-bookshelf',
    'full book shelf': 'full-bookshelf',
    'cassette player': 'cassettePlayer',
    'raven' : 'ravenClosed'
  }


  const mapPageToLink = {
    right: 'rightArrow',
    left: 'leftArrow',
    write: 'rightArrow',
    'next room': 'rightArrow',
    'previous room': 'leftArrow',
    'room four': 'leftArrow',
    'room two': 'rightArrow'
  }


  function clickImage(item) {
    item = item.toLowerCase()
    console.log('🧤 item', item);
    if(clickableItems.includes(item)){
      item = matchItemToClass[item]
      document.getElementsByClassName(item)[0].click()
    } else {
      console.log('🧤 item', item);
      alert(`it thinks you said ${item}, consider adding ${item} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`)
  }
  }

  function goTo(page) {
    console.log('🧤 what the api heard....', page);

    if(pagePossibilities.includes(page)){
      page = mapPageToLink[page]
      document.getElementById(page).click()
    } else {
      alert(`it thinks you said ${page}, consider adding ${page} to your item list, and mapping that to the correct word/phrase. Remove this when finished testing`)
    }
  }


  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if(event.repeat){return}
      SpeechRecognition.startListening();
      console.log('🧤 list');

    }
  });


  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
      console.log('🧤 not');
    }
  });

  const invokeCasset = () => {
    const bool = JSON.parse(window.localStorage.getItem("hasCasset"));
    if (bool) {
      window.localStorage.setItem("usedCasset", true);
    }
  };
  const useKey = () => {
    const bool = JSON.parse(window.localStorage.getItem("hasCasset"));
    if (bool) {
      window.localStorage.setItem("usedKey", true);
    }
  };


  const assetClicked = (e) => {
    setActive(false);
    const clicked = e.target.className;
    const narrationBox = document.getElementById("narrationBox");
    narrationBox.innerHTML = "";

    switch (clicked) {
      case "boatPainting":
        let usedKey = JSON.parse(window.localStorage.getItem("usedKey"));
        if (usedKey) {
          narrationBox.innerHTML =
            "It is a lovely painting, but I don't see any orbs in it.";
          break;
        }
        narrationBox.innerHTML = "What a lovely old painting.";
        break;
      case "bookCase":
        narrationBox.innerHTML = hiddenDiary
          ? "This bookcase is empty. I wonder if it could be hiding something."
          : "There is a locked diary here now. Do you have anything that can unlock it?";
        break;
      case "lockedDiary":
        let hasKey = JSON.parse(window.localStorage.getItem("hasKey"));
        if (hasKey) {
          narrationBox.innerHTML = "It seems like the key fits the lock!";
          window.localStorage.setItem("usedKey", true);
          break;
        }
        narrationBox.innerHTML =
          "The diary is locked. Is there something in the room that can unlock it?";
        break;
      case "endTable":
        narrationBox.innerHTML = "Drat, nothing under here.";
        break;
      case "full-bookshelf":
        narrationBox.innerHTML = "There may be something useful in here.";
        break;
      case "crystal-skull":
        narrationBox.innerHTML =
          "I sure am glad that’s not my skull on the table.";
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
        break;
      default:
        break;
    }
    setActive(true)
    setTimeout(function() {setActive(false)}, 15000)
    return
  }


  const descriptions = {
    scene1desc1: new Howl({src: [s1sounds[0].sceneOneDescription], html5: true}),
    scene1desc2: new Howl({src: [s1sounds[8].sceneOneDescription2], html5: true}),
    table: new Howl({src: [s1sounds[1].sideTable], html5: true}),
    riddle: new Howl({src: [s1sounds[2].riddle], html5: true}),
    bookCaseWithDairy: new Howl({src: [s1sounds[3].bookcaseWithDiary], html5: true})
  }

  return (
    <div className="sceneOne">
      <div>
        <img
          src={boatPainting}
          className="boatPainting"
          alt="Oil painting of four sailboats"
          onClick={(e) => {assetClicked(e); descriptions.scene1desc1.play()}}
        />
      </div>
      <div>
        <img
          src={bookCase}
          className="bookCase"
          alt="large wooden bookcase that is empty"
          onClick={(e) => assetClicked(e)}
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
      <Link to="/entryway">
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/storage">
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
