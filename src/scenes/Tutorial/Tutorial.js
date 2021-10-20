import React from "react";
import {Howl, Howler} from 'howler';
import { Link } from "react-router-dom";
import "./tutorial.scss";
import SpeechRecognition, {
    useSpeechRecognition,
  } from "react-speech-recognition";

const Tutorial = () => {
    const tutorialSound = "https://firebasestorage.googleapis.com/v0/b/spooky-scapes.appspot.com/o/Spooky%20Sounds%2FSpookyTutorial.m4a?alt=media&token=26542141-47e3-460b-a2c5-57726893829b/allow-cors";
    const tutorial = new Howl({
        src: [tutorialSound],
        html5: true
    })

    let playingAudio
    const audioControl = (specifiedSound) => {
        playingAudio = specifiedSound
        !specifiedSound.playing() ? specifiedSound.play() : specifiedSound.stop() 
    }
    const stopAllAudio = () => {
        playingAudio.stop()
    }


    const commands = [
        {
            command: ["play"],
            callback: () => clickButton()
        }
    ];

    useSpeechRecognition({commands});

    function clickButton(){
        document.getElementById("playGame").click()
    }

    document.addEventListener("keydown", (event) => {
        if(event.code === "Space") {
            event.preventDefault();
            if(event.repeat){
                return;
            }
            SpeechRecognition.startListening()
        }
    })

    document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      SpeechRecognition.stopListening();
    }})

    return (
        <div>
        <button type="button" id="playTutorial" onClick={ () => {audioControl(tutorial)}}>Play Tutorial</button>
        <button type="button" id="pauseTutorial" onClick={ () => {stopAllAudio()}}>Stop Tutorial</button>
        <p> To hear a description of the room, press the enter or return key. </p>
        <p> To inspect an item, hold down the spacebar key and say ‘click on’ then the item name. </p>
        <p> To navigate around the rooms, hold down the spacebar and say  ‘go to next room’ or go to previous room. </p>
        <p> You can also say “go to left” or “go to right. </p>
        <p> If you need to return to this tutorial, hold down the spacebar and say “go to tutorial". </p> 
        <p> If you are ready to play, hold down the spacebar and say “play”. </p>
        <Link to = "/" ><button type="button" id="goHome" > Home </button></Link>
        <Link to = "/parlor"> <button type="button" id="playGame" > Start Playing </button></Link>
        </div>
    )
}

export default Tutorial;
