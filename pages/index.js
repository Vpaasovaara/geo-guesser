import React, { useState } from 'react'
import axios from 'axios'
import FlagWindow from './components/FlagWindow'
import Answers from './components/Answers'
import InfoWindow from './components/InfoWindow'

const Home = () => {
  const [ countries, setCountries ] = useState([''])
  const [ fullCountries, setFullCountries ] = useState()
  const [ remainingCountries, setRemainingCountries ] = useState()
  const [ country, setCountry ] = useState()
  const [ answers, setAnswers ] = useState([])
  const [ gameOn, setGameOn ] = useState(false)
  const [ gameOver, setGameOver ] = useState(false)
  const [ score, setScore ] = useState(0)
  const [ seconds, setSeconds ] =  useState(0);

  // Timer for questions
  React.useEffect(()=>{
    if (gameOn) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
            console.log(seconds)
        }
        // If timer goes to 0 game is over
        if (seconds === 0) {
            clearInterval(myInterval)
            gameReset()
        } 
      }, 1000)
      // useEffect clean up
      return ()=> {
        clearInterval(myInterval);
      };
    }
  });

  // useEffect hook to get countries at first load
  React.useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setFullCountries(res.data)
      let mappedCountries = res.data.map(x => x.translations.fin.common)
      setCountries(mappedCountries)
    })
    console.log("GET countries")
  }, [])


  // Function is called when game ends and resets the game to it's original state
  const gameReset = () => {
    setGameOn(false)
    setGameOver(true)
    setCountry(null)
    setRemainingCountries(fullCountries)
    setAnswers([])
  }

  // 3 random answers are selected from all countries and put in a list with the right answer
  const randomizeAnswers = (listOfCountries, selectedCountry) => {
    let answerList = []
    let i = 0
    do {
      let randomCountry = listOfCountries[Math.floor(Math.random() * listOfCountries.length)]
      if (answerList.includes(randomCountry)) {
        continue
      } else if (selectedCountry === randomCountry) {
        continue
      } else if (selectedCountry === 'Huippuvuoret' && randomCountry === 'Norja' || selectedCountry === 'Norja' && randomCountry === 'Huippuvuoret') {
        continue
      } else if (selectedCountry === 'Yhdysvallat' && randomCountry === 'Yhdysvaltojen asumattomat saaret' || selectedCountry === 'Yhdysvaltojen asumattomat saaret' && randomCountry === 'Yhdysvallat') {
        continue
      } else {
        answerList.push(randomCountry)
        i++
      }
    } while (i < 3)
    answerList.splice(Math.floor(Math.random() * 4), 0, selectedCountry)
    setAnswers(answerList)
  }

  const startGame = () => {
    setSeconds(20)
    setScore(0)
    setGameOn(true)
    setGameOver(false)
    setRemainingCountries(fullCountries)
    let index = Math.floor(Math.random() * countries.length)
    let fullCountry = fullCountries[index]
    setCountry(fullCountry)
    randomizeAnswers([...countries], fullCountry.translations.fin.common)
  }

  const selectAnswer = (selectedAnswer) => {
    console.log(selectedAnswer, country.translations.fin.common)
    if (selectedAnswer === country.translations.fin.common) {
      setSeconds(20)
      let index = remainingCountries.map(x => x.translations.fin.common).indexOf(country.translations.fin.common)
      if (index >= 0) {
        let copy = [...remainingCountries]
        copy.splice(index, 1)
        setRemainingCountries(copy)
        let fullCountry = remainingCountries[Math.floor(Math.random() * remainingCountries.length)]
        setCountry(fullCountry)
        let countriesCopy = remainingCountries.map(x => x.translations.fin.common)
        randomizeAnswers(countriesCopy, fullCountry.translations.fin.common)
        setScore(score + 1)
      }
    } else {
      gameReset()
    }
  }

  return (
    <div className="centerall">
      <div className='contentMain'>
        <div className='upperMain'>
          <FlagWindow country={country} gameOver={gameOver} score={score} gameOn={gameOn} setGameOver={setGameOver}/>
          {fullCountries && <InfoWindow startGame={startGame} score={score} gameOn={gameOn} seconds={seconds}/>}
        </div>
          {answers && <Answers answers={answers} selectAnswer={selectAnswer}/>}
      </div>
    </div>
  )
}

export default Home