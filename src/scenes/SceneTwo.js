import '../App.scss'
import '../main.scss'
import '../assets/SceneTwo/sceneTwo.scss'
import React, {useState} from 'react'
// import ReactDom from 'react-dom'
import closedCoffin from '../assets/SceneTwo/closed-coffin.png';
import openCoffin from '../assets/SceneTwo/open-coffin.png';
import stool from '../assets/SceneTwo/stool-cabinet.png';
import hole from '../assets/SceneTwo/holeinwall.png';
import wallCandle from '../assets/SceneTwo/wall-candle.png';
import oldChair from '../assets/SceneTwo/old-chair.png';
import savion from '../assets/ravenClosedFIT.png';
import cowPainting from '../assets/SceneTwo/cow-painting.png';
import backgroundImage from "../assets/Background.jpg";


const SceneTwo = () => {
  const [isActive, setActive] = useState(false)
  console.log('🧤 isActive', isActive);

  const assetClicked = () => {
    setActive(true)
    setTimeout(function() {setActive(false)}, 3000)
    return
  }


  return (
    <div className='sceneTwo'>
        <div><img src={closedCoffin} alt='an open coffin' className='coffin' onClick={assetClicked}/></div>
        <div></div>

        <div><img src={oldChair} alt='a very old chair' className='oldChair' onClick={() => console.log('🧤 chair')
        }/></div>
        <div><img src={stool} alt='an old nasty cabinet' className='stoolCabinet' onClick={() => console.log('🧤 stool')
        }/></div>
        <div><img src={hole} alt='an odd hole in the wall' className='holeInWall' onClick={() => console.log('🧤 hole')
        }/></div>
        <div><img src={wallCandle} alt='a lit candle' className='rightCandle' onClick={() => console.log('🧤 right-candle')
        }/></div>
        <div><img src={wallCandle} alt='a lit candle' className='leftCandle' onClick={() => console.log('🧤 left-candle')
        } /></div>
        <div><img src={cowPainting} alt='an interesting painting' className='cowPainting' onClick={() => console.log('🧤 painting')
        }/></div>
        <div><img src={savion} className='raven-quiet' alt='a squawking talking raven'/></div>
        <div className='narrationBox'><p className={isActive? 'coffin-text-active':'coffin-text'}>A closed casket...spooky theres gonna be a whole lotta text in here cause i need to see it wrap not rap but wrap i would prefer to only hear professionals rap tyvm shut up and carry on my friend. welp thats not enough text so here we go with more to show i hope it tickles your fancy my friend.</p></div>
    </div>
  )
}

export default SceneTwo;
