import React, { createContext } from "react";
import boatPainting from "../assets/SceneOne/boat-painting.png";
import bookCase from "../assets/SceneOne/empty-bookcase.jpeg";
import lockedDiary from "../assets/SceneOne/locked-diary.png";

function SceneOne(){


    return (
        <div id="sceneOne" className="scenes">
            <h1>I am scene 1</h1>
            <img src= {boatPainting} alt="Oil painting of four sailboats" />
            <img src={bookCase} alt = "large wooden bookcase that is empty" />
            <img src={lockedDiary} alt = "blue diary with gold designs on the cover and a lock keeping it shut" />
        </div>
    )
}

export default SceneOne