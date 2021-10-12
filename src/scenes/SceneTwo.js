import '../main.scss'
import '../sceneScss/sceneTwo.scss'
import closedCoffin from '../assets/sceneTwoAssets/closed-coffin.png';
import openCoffin from '../assets/sceneTwoAssets/openCoffin.gif';
import stool from '../assets/sceneTwoAssets/stool-cabinet.png';
import hole from '../assets/sceneTwoAssets/holeinwall.png';
import wallCandle from '../assets/sceneTwoAssets/wall-candle.png';
import oldChair from '../assets/sceneTwoAssets/old-chair.png';
import savion from '../assets/ravenClosed.png';
import cowPainting from '../assets/sceneTwoAssets/cow-painting.png'

const SceneTwo = () => {
  return (
    <div id='sceneTwo'>

      <div id='coffin-div'>
        <img src={closedCoffin} alt='an open coffin' className='coffin'/>
      </div>
      <div id='chair-div'>
        <img src={oldChair} alt='a very old chair' className='oldChair'/>
      </div>
      <div id='stool-div'>
        <img src={stool} alt='a very old chair' className='stoolCabinet'/>
      </div>
      <div id='hole-div'>
        <img src={hole} alt='an odd hole in the wall' className='holeInWall'/>
      </div>
      <div id='right-candle-div'>
        <img src={wallCandle} alt='a lit candle' className='rightCandle' />
      </div>
      <div id='left-candle-div'>
        <img src={wallCandle} alt='a lit candle' className='leftCandle' />
      </div>

    </div>
  )
}

export default SceneTwo;
