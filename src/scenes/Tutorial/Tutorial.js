import React from "react";
import {Howl, Howler} from 'howler';

const Tutorial = () => {
    const tutorialSound = "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Spooky%20Sounds%2FSpookyTutorial.m4a?alt=media&token=26542141-47e3-460b-a2c5-57726893829b/allow-cors";
   
    const tutorial = new Howl({
        src: [tutorialSound],
        html5: true
    })


    return (
        <div>
        <button type="button" id="playTutorial" onClick={ () => {if (!tutorial.playing()){tutorial.play()}}}>Play Tutorial</button>
        <button type="button" id="pauseTutorial" onClick={ () => {tutorial.pause()}}>Pause Tutorial</button>
        </div>
    )
}

export default Tutorial;