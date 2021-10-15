import '../App.scss'
import '../main.scss'
import '../assets/SceneTwo/sceneTwo.scss'
import React, {useState} from 'react'
// import ReactDom from 'react-dom'
import closedCoffin from '../assets/SceneTwo/closed-coffin.png';
// import openCoffin from '../assets/SceneTwo/open-coffin.png';
import stool from '../assets/SceneTwo/stool-cabinet.png';
import hole from '../assets/SceneTwo/holeinwall.png';
import wallCandle from '../assets/SceneTwo/wall-candle.png';
import oldChair from '../assets/SceneTwo/old-chair.png';
import savion from '../assets/ravenClosedFIT.png';
import cowPainting from '../assets/SceneTwo/cow-painting.png';
// import backgroundImage from "../assets/Background.jpg";
import { Link } from "react-router-dom";
import leftArrow from "../assets/ghostArrowLeft.png";
import rightArrow from "../assets/ghostArrowRight.png";
import { timeoutCollection } from 'time-events-manager';

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


const SceneTwo = () => {

  const [isActive, setActive] = useState(false)
  const [openCoffin, setOpen] = useState(false)

  const commands = [
    {
      command: ['Click on *'],
      callback: (item) => clickImage(item)
    },
    // {
    //   command: ['Go to *'],
    //   callback: (page) => goTo(page)
    // }
  ]
  useSpeechRecognition({ commands });

  const clickableItems = ['coffin','coughing', 'coffee', 'old chair', 'cow painting', 'hole in wall', 'left candle', 'left candy','right candle', 'right candy', 'stool cabinet', 'stool','stool cab','raven']

  const matchItemToClass = {
    coffin: 'coffin',
    coughing: 'coffin',
    coffee: 'coffin',
    'old chair': 'oldChair',
    'hole in wall': 'holeInWall',
    'left candle': 'leftCandle',
    'left candy' : 'leftCandle',
    'right candle': 'rightCandle',
    'right candy': 'rightCandle',
    'stool cabinet': 'stoolCabinet',
    'stool cab': 'stoolCabinet',
    'stool': 'stoolCabinet',
    'cow painting': 'cowPainting'
  }

  function clickImage(item) {
    item = item.toLowerCase()


    console.log('🧤 item', item);

    if(clickableItems.includes(item)){
      item = matchItemToClass[item]

    document.getElementsByClassName(item)[0].click()
    } else {
      console.log('🧤 item', item);

    }
  }

  let keyDown = false
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
      // keyDown = false
      event.preventDefault();
      SpeechRecognition.stopListening();
      console.log('🧤 not');
    }
  });


  const assetClicked = (e) => {
    timeoutCollection.removeAll()
    setActive(false)
    const clicked = e.target.className
    const narrationBox = document.getElementById('narrationBox')
    narrationBox.innerHTML = ''

    switch (clicked) {
      case 'coffin':
        narrationBox.innerHTML = openCoffin? 'A large coffin, it’s open but there isn’t anyone in it. The pungent smell emanating from it fills the room, there may be something in there':'A large coffin, the lid is heavy, you wonder what may be inside of it, but you’re too afraid to open it yourself.'
        break;
      case 'cowPainting':
        narrationBox.innerHTML = 'A painting of a cow, what a strange painting to own.'
        break;
      case 'stoolCabinet':
        narrationBox.innerHTML = 'An old worn down stool cabinet that doesn’t open.'
        break;
      case 'oldChair':
        narrationBox.innerHTML = 'An old worn down chair, it doesn’t look sturdy enough to sit on.'
        break;
      case 'holeInWall':
        narrationBox.innerHTML = 'The old purple wallpaper has a huge hole in it, there doesn’t seem to be anything behind that wallpaper but darkness'
        break;
      case 'rightCandle':
        narrationBox.innerHTML = 'A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?'
        break;
      case 'leftCandle':
        narrationBox.innerHTML = 'A wall candle, there’s another one on the opposite side of the room. The candle is lit but who lit them?'
        break;
      default:
        break;
    }

    setActive(true)
    setTimeout(function() {setActive(false)}, 3000)

  }

  return (
    <div className='sceneTwo'>
        <div><img src={closedCoffin} alt='an open coffin' className='coffin' onClick={(e) => assetClicked(e)}/></div>
        <div></div>
        <div><img src={oldChair} alt='a very old chair' className='oldChair' onClick={(e) => assetClicked(e)}/></div>
        <div><img src={stool} alt='an old nasty cabinet' className='stoolCabinet' onClick={(e) => assetClicked(e)}/></div>
        <div><img src={hole} alt='an odd hole in the wall' className='holeInWall' onClick={(e) => assetClicked(e)}/></div>
        <div><img src={wallCandle} alt='a lit candle' className='rightCandle' onClick={(e) => assetClicked(e)}/></div>
        <div><img src={wallCandle} alt='a lit candle' className='leftCandle' onClick={(e) => assetClicked(e)} /></div>
        <div><img src={cowPainting} alt='an interesting painting' className='cowPainting' onClick={(e) => assetClicked(e)}/></div>
        <div><img src={savion} className='raven-quiet' alt='a squawking talking raven'/></div>
        <div className='narrationBox'><p id='narrationBox' className={isActive? 'coffin-text-active':'coffin-text'}></p></div>
        <Link to="/scene1">
        <div>
          <img src={leftArrow} id="leftArrow" alt="ghost arrow pointing left" />
        </div>
      </Link>
      <Link to="/scene3">
        <div>
          <img
            src={rightArrow}
            id="rightArrow"
            alt="ghost arrow pointing right"
          />
        </div>
      </Link>
    </div>
  )
}

export default SceneTwo;
