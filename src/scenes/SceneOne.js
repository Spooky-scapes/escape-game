import React, { createContext } from "react";
import boatPainting from "../assets/SceneOne/boat-painting.png";
import bookCase from "../assets/SceneOne/empty-bookcase.jpeg";
import lockedDiary from "../assets/SceneOne/locked-diary.png";
import endTable from "../assets/SceneOne/victorian-cabinet.png";
import bookShelf from "../assets/SceneOne/bookshelf-full.png";
import crystalSkull from "../assets/SceneOne/crystal-skull.png";
import cassettePlayer from "../assets/SceneOne/cassette-player.png";
import ravenClosed from "../assets/SceneOne/ravenClosedFIT.png";
import backgroundImage from "../assets/Background.jpg";
import "../assets/SceneOne/sceneone.scss";
import '../main.scss';
import "../App.scss";

function SceneOne(){
    return (
        <div id="sceneOne" className="scenes">
            <img className='backgroundImage' src={backgroundImage} alt='background' />
            <img src= {boatPainting} id="boatPainting" alt="Oil painting of four sailboats" />
            <img src={bookCase} id = "bookCase" alt = "large wooden bookcase that is empty" />
            <img src={lockedDiary} id = "lockedDiary" alt = "blue diary with gold designs on the cover and a lock keeping it shut" />
            <img src={endTable} id="endTable" alt = "victorian-style wooden end table with four curved legs and a flat square top" />
            <img src={bookShelf} id="full-bookshelf" alt = "wooden bookshelf with several books and knick knacks inside of it" />
            <img src={crystalSkull} id="crystal-skull" alt = "green crystal skull" />
            <img src={cassettePlayer} id="cassettePlayer" alt = "small cassette player" />
            <img src={ravenClosed} id="ravenClosed" alt = "wise old raven to guide you on your journey" />
        </div>
    )
}

export default SceneOne