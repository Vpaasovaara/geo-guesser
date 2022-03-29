import React, { useState } from 'react'
import axios from 'axios'
import FlagWindow from './components/FlagWindow'
import Answers from './components/Answers'
import InfoWindow from './components/InfoWindow'

const Home = () => {
  const [ theme, setTheme ] = useState('light')
  const [ countries, setCountries ] = useState([''])
  const [ fullCountries, setFullCountries ] = useState()
  const [ remainingCountries, setRemainingCountries ] = useState()
  const [ country, setCountry ] = useState()
  const [ answers, setAnswers ] = useState([])
  const [ gameOn, setGameOn ] = useState(false)
  const [ gameOver, setGameOver ] = useState(false)
  const [ score, setScore ] = useState(0)
  const [ seconds, setSeconds ] =  useState(0);

  React.useEffect(()=>{
    if (gameOn) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
            console.log(seconds)
        }
        if (seconds === 0) {
            clearInterval(myInterval)
            gameReset()
        } 
      }, 1000)
      return ()=> {
        clearInterval(myInterval);
      };
    }
  });



  React.useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setFullCountries(res.data)
      let mappedCountries = res.data.map(x => x.translations.fin.common)
      setCountries(mappedCountries)
    })
    console.log("GET countries")
  }, [])

  React.useEffect(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light')
    }


  }, [])

  const gameReset = () => {
    setGameOn(false)
    setGameOver(true)
    setCountry(null)
    setRemainingCountries(fullCountries)
    setAnswers([])
  }

  const randomizeAnswers = (listOfCountries, selectedCountry) => {
    let answerList = []
    let i = 0
    do {
      let randomCountry = listOfCountries[Math.floor(Math.random() * listOfCountries.length)]
      //console.log(randomCountry, selectedCountry)
      if (answerList.includes(randomCountry)) {
        continue
      } else if (selectedCountry === randomCountry) {
        continue
      } else {
        answerList.push(randomCountry)
        i++
      }
    } while (i < 3)
    answerList.splice(Math.floor(Math.random() * 4), 0, selectedCountry)
    setAnswers(answerList)
  }

  const changeTheme = () => {
    if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light')
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light')
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark')
        }
    }
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