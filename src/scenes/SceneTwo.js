import '../main.scss'
import '../sceneScss/sceneTwo.scss'
import closedCoffin from '../assets/sceneTwoAssets/closed-coffin.png';
import openCoffin from '../assets/sceneTwoAssets/openCoffin.gif';
import stool from '../assets/sceneTwoAssets/stool-cabinet.png';
import hole from '../assets/sceneTwoAssets/holeinwall.png';
import wallCandle from '../assets/sceneTwoAssets/wall-candle.png';
import oldChair from '../assets/sceneTwoAssets/old-chair.png';
import savion from '../assets/ravenClosed.png';
import cowPainting from '../assets/sceneTwoAssets/cow-painting.png';
import backgroundImage from "../assets/Background.jpg";


const SceneTwo = () => {
  return (
    <div id='sceneTwo'>
      <img className='backgroundImage' src={backgroundImage} alt='background' />


        <img src={closedCoffin} alt='an open coffin' className='coffin' onClick={() => console.log('🧤 coffin')
        } />


        <img src={oldChair} alt='a very old chair' className='oldChair' onClick={() => console.log('🧤 chair')
        }/>


        <img src={stool} alt='a very old chair' className='stoolCabinet' onClick={() => console.log('🧤 stool')
        }/>


        <img src={hole} alt='an odd hole in the wall' className='holeInWall' onClick={() => console.log('🧤 hole')
        }/>


        <img src={wallCandle} alt='a lit candle' className='rightCandle' onClick={() => console.log('🧤 right-candle')
        }/>


        <img src={wallCandle} alt='a lit candle' className='leftCandle' onClick={() => console.log('🧤 left-candle')
        } />


        <img src={cowPainting} alt='an interesting painting' className='cowPainting' onClick={() => console.log('🧤 painting')
        } />


    </div>
  )
}

export default SceneTwo;
