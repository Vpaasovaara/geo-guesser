import React from "react"
import axios from "axios"
import Image from "next/image"

const FlagWindow = ({ country, gameOver, setGameOver, score, gameOn }) => {
    const [ playerScores, setPlayerScores ] = React.useState()
    const [ name, setName ] = React.useState('')

    React.useEffect(() => {
        axios.get('/api/scores').then((res) => {
            setPlayerScores(res.data)
        })
    }, [])

    const submitScore = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/api/send', { name: name, score: score })
            setGameOver(false)
            setName('')
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <div className='flagWindow'>
            {gameOn && 
                <div className='text-white flex items-center justify-center align-middle'>
                  <Image className='Image' width="500" height="300" src={country.flags.svg} alt="Lippu"/>
                </div>
            }
            {gameOver &&
                <div className="text-white flex flex-col">
                    <h1 className="text-2xl flagText">Peli ohi</h1>
                    <h1 className="text-lg my-2">Pisteesi: {score}</h1>
                    <form className="InfoItemMargin" onSubmit={submitScore}>
                      <label className="block">Julkaise pisteesi</label>
                      <input className="block my-2 p-1 text-indigo-900" type="text" value={name} onChange={({target}) => setName(target.value)} required></input>
                      <button className="p-2 mt-4 bg-black rounded" type="submit">Julkaise</button>
                      <button onClick={() => setGameOver(false)} className="p-2 mt-4 bg-black rounded ml-4" type="button">Pistelista</button>
                    </form>
                </div>
            }
            {!gameOn && !gameOver &&
                <div className="text-white flex flex-col">
                    <h1 className="text-2xl">Top 10</h1>
                    {playerScores &&
                    <ol className="pisteLista"> 
                    {playerScores.map((score, i) => {
                        return (
                            <li key={i} className={
                                i === 0 ? 'text-yellow-500'
                                : i === 1 ? 'text-gray-400'
                                : i === 2 ? 'text-yellow-700'
                                :'text-white'
                            }>{`${score.name} ${score.score}`}</li>
                        )
                    })}
                    </ol>
                    }
                </div>
            }
        </div>
    )
}

export default FlagWindow