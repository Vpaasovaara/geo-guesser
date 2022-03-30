import react from "react";


const InfoWindow = ({ startGame, score, gameOn, seconds }) => {

    return (
        <div className='questionText'>
            <div className="h-1/3 flex items-end justify-center">
                <p className="flagText">Minkä maan lippu on kyseessä?</p>
            </div>
            <div className="h-2/3 flex items-center justify-center flex-col">
                <div className='InfoItemMargin'>Pisteet: {score}/250</div>
                {!gameOn && <button className='InfoItemMargin bg-black p-2 rounded' onClick={() => startGame()}>Aloita peli</button>}
                {gameOn && <h1 className={`text-xl ${seconds <= 10 && seconds > 5 ? 'text-yellow-300'  : seconds <= 5 ? 'text-red-600' : null}`}>{seconds < 10 ?  `0${seconds}` : seconds}</h1>}
            </div>
        </div>
    )
}

export default InfoWindow