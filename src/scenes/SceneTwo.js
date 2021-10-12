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
        <img src={closedCoffin} alt='an open coffin' className='coffin' onClick={() => console.log('🧤 coffin')
        } on/>
      </div>
      <div id='chair-div'>
        <img src={oldChair} alt='a very old chair' className='oldChair' onClick={() => console.log('🧤 chair')
        }/>
      </div>
      <div id='stool-div'>
        <img src={stool} alt='a very old chair' className='stoolCabinet' onClick={() => console.log('🧤 stool')
        }/>
      </div>
      <div id='hole-div'>
        <img src={hole} alt='an odd hole in the wall' className='holeInWall' onClick={() => console.log('🧤 hole')
        }/>
      </div>
      <div id='right-candle-div'>
        <img src={wallCandle} alt='a lit candle' className='rightCandle' onClick={() => console.log('🧤 right-candle')
        }/>
      </div>
      <div id='left-candle-div'>
        <img src={wallCandle} alt='a lit candle' className='leftCandle' onClick={() => console.log('🧤 left-candle')
        } />
      </div>
      <div id='painting-div'>
        <img src={cowPainting} alt='an interesting painting' className='cowPainting' onClick={() => console.log('🧤 painting')
        } />
      </div>

    </div>
  )
}

export default SceneTwo;
