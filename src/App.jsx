import LandingPage from "./LandingPage"
import Quiz from "./Quiz"
import './App.css'
import { useState, useEffect } from 'react'
import {decode} from 'html-entities'

function App() {
 
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [checkQuiz, setCheckQuiz] = useState(false)
  const [restart, setRestart] = useState(false)

  let rawData = []
  
  function startQuiz(){
      setStart(true) 
  }
  
   function handleClick(event) {
      const {name, value} = event.target
      setQuizData(prevData => prevData.map(question=> {
         return name === question.q ? {...question, 
              chosenAnswer: value} : question 
      }))
  }

   
  function randomizeAnswers(arr){
      const randomNum = Math.floor(Math.random()*4)
      const answerList = []
      //first decode the answers
      arr.incorrect_answers.forEach(answer =>answerList.push(decode(answer)))      
      answerList.splice(randomNum, 0, arr.correct_answer)
      return answerList
  }
  
  function endGame() {
      event.preventDefault()
      setCheckQuiz(prevData => !prevData)
  }
 
  useEffect(()=>{
      fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
          .then(res=> res.json())
          .then(data=> {rawData = data.results
            const newQs = []
            for(let i = 0; i < rawData.length; i++){
                newQs.push({
                    q: decode(rawData[i].question),
                    correctAnswer: decode(rawData[i].correct_answer),
                    answerList:  randomizeAnswers(rawData[i]),
                    chosenAnswer: ""
                })
              }   
            setQuizData(newQs)
            }
          )
  }
  ,[restart])
  
   return(
       <main>
          {!start ? 
            <LandingPage
              startQuiz={startQuiz}
              /> : 
              <Quiz  
                quizData={quizData}
                setQuizData={setQuizData}
                handleClick={handleClick}
                checkQuiz={checkQuiz}
                setCheckQuiz={setCheckQuiz}
                endGame={endGame}
                setRestart={setRestart}
                loading={rawData}
                />         
          }
      </main> 
   )
}


export default App
