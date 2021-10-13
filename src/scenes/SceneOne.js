import React from "react";
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
import '../main.scss';
import "../App.scss";
import { Link } from "react-router-dom"

function SceneOne(){
    return (
        <div className="sceneOne">
            {/* <img className='backgroundImage' src={backgroundImage} alt='background' /> */}
            <div ><img src= {boatPainting} id="boatPainting" alt="Oil painting of four sailboats" /></div>
            <div><img src={bookCase} id = "bookCase" alt = "large wooden bookcase that is empty" /></div>
            <div><img src={lockedDiary} id = "lockedDiary" alt = "blue diary with gold designs on the cover and a lock keeping it shut" /></div>
            <div><img src={endTable} id="endTable" alt = "victorian-style wooden end table with four curved legs and a flat square top" /></div>
            <div><img src={bookShelf} id="full-bookshelf" alt = "wooden bookshelf with several books and knick knacks inside of it" /></div>
            <div><img src={crystalSkull} id="crystal-skull" alt = "green crystal skull" /></div>
            <div><img src={cassettePlayer} id="cassettePlayer" alt = "small cassette player" /></div>
            <div><img src={ravenClosed} id="ravenClosed" alt = "wise old raven to guide you on your journey" /></div>
            <Link to="/scene4"><div><img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" /></div></Link>
            <Link to="/scene2"><div><img src={rightArrow} id="rightArrow" alt="ghost arrow pointing right" /></div></Link>
        </div>
    )
}

export default SceneOne