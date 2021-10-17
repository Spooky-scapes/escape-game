import React, { useState } from "react";
import boatPainting from "../assets/SceneOne/boat-painting.png";
import bookCase from "../assets/SceneOne/empty-bookcase.jpeg";
import lockedDiary from "../assets/SceneOne/locked-diary.png";
import endTable from "../assets/SceneOne/victorian-cabinet.png";
import bookShelf from "../assets/SceneOne/bookshelf-full.png";
import crystalSkull from "../assets/SceneOne/crystal-skull.png";
import cassettePlayer from "../assets/SceneOne/cassette-player.png";
import ravenClosed from "../assets/SceneOne/ravenClosedFIT.png";
import leftArrow from "../assets/ghostArrowLeft.png";
import rightArrow from "../assets/ghostArrowRight.png";
import "../assets/SceneOne/sceneone.scss";
import "../main.scss";
import "../App.scss";
import { Link } from "react-router-dom"
import {Howl, Howler} from 'howler';
import { getStorage, ref } from "firebase/storage";


window.localStorage.setItem("hasCasset", false);
window.localStorage.setItem("usedCasset", false);
window.localStorage.setItem("hasCandyBucket", false);
window.localStorage.setItem("usedCandyBucket", false);
window.localStorage.setItem("hasKey", false);
window.localStorage.setItem("usedKey", false);

const SceneOne = () => {
  const [isActive, setActive] = useState(false);
  const [hiddenDiary, setHidden] = useState(true);
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

  const storage = getStorage();
  // const caw = ref(storage, "caw.mp3");
  const cawPath = "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/caw.mp3?alt=media&token=cd4cc366-1a6b-47f6-912b-5b5eb21096f2/allow-cors";
  

  const assetClicked = (e) => {
    setActive(false);
    const clicked = e.target.id;
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
    setTimeout(function() {setActive(false)}, 3000)
    return
  }

  function playSound(sound) {
    var a = new Howl({
      src: [sound],
      html5: true});
    a.play();
  }

  return (
    <div className="sceneOne">
      <div>
        <img
          src={boatPainting}
          id="boatPainting"
          alt="Oil painting of four sailboats"
          onClick={(e) => {assetClicked(e); playSound(cawPath)}}
        />
      </div>
      <div>
        <img
          src={bookCase}
          id="bookCase"
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
          id="lockedDiary"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={endTable}
          id="endTable"
          alt="victorian-style wooden end table with four curved legs and a flat square top"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={bookShelf}
          id="full-bookshelf"
          alt="wooden bookshelf with several books and knick knacks inside of it"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={crystalSkull}
          id="crystal-skull"
          alt="green crystal skull"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <div>
        <img
          src={cassettePlayer}
          id="cassettePlayer"
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
          id="ravenClosed"
          alt="wise old raven to guide you on your journey"
          onClick={(e) => assetClicked(e)}
        />
      </div>
      <Link to="/scene4">
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/scene2">
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
