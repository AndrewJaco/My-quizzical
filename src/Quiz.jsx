import './App.css'
import { useState } from 'react'

export default function Quiz(props) {
  // console.log(props.quizData)
  const [score, setScore] = useState(0)
  
  function checkAnswers() {
      props.endGame()
      
      //map over each question to see which was answered correctly
      //adds one to score for each matching answer(at time of check button click)
      props.quizData.map(question => {
          question.answerList.map(answer => {
              if(answer===question.correctAnswer && answer === question.chosenAnswer){
                  setScore(prevScore => prevScore+=1)
              }
          })
      }) 
  }
  
  function restartGame() {
      event.preventDefault()
      setScore(0)
      props.setQuizData([])
      props.setCheckQuiz(prevData => !prevData)
      props.setRestart(prevData => !prevData)
  }
  
  //map over quiz data to create the html for each question and answer list
  const allQuestionsHtml = props.quizData.map((question, index) => {
      const answerListHtml = []
      
      //set classnames for answers(sets background color, etc.)
      //I can probably do this in a shorter way
      for(let i = 0; i < question.answerList.length; i++) {
          let classNames = ""
          if(!props.checkQuiz){
              if(question.answerList[i] === question.chosenAnswer) {
                  classNames = "selected-answer"
              } else if (question.answerList[i] !== question.chosenAnswer){
                  classNames = "blank-answer"
              }
          } else {
              // display correct answer in green
              if(question.chosenAnswer === question.correctAnswer && question.answerList[i]===question.correctAnswer || question.correctAnswer === question.answerList[i]){
                  classNames = "correct-answer"
              } else if (question.chosenAnswer === question.answerList[i]) {
                  //display red wrong answers
                  classNames = "wrong-answer" 
              } else {
                  //change all others to a lighter border
                  classNames = "unselected-answer"
                 }
          }
             
             //create the answerlist html
             answerListHtml.push(
                  <div 
                    className={`answer-div ${classNames}`}
                    key={i} >
                      <input 
                          className="hide-dot" 
                          type="radio" 
                          id={question.answerList[i]} 
                          value={question.answerList[i]}
                          name={question.q}
                          onClick={props.handleClick}
                          disabled={props.checkQuiz}
                      />
                      <label htmlFor={question.answerList[i]} 
                          className="answer-button"
                          >
                          {question.answerList[i]}
                          </label>
                  </div>
              )
      }
      
      
   return(
      <div key={index}>
          <div className="question-text">{question.q}</div>
          <div className="answer-list">
             {answerListHtml} 
          </div>
          <hr/>            
      </div> 
   )
  })

  return (
      <form className="flex">
          {allQuestionsHtml}
          {props.checkQuiz && <p className='scorecard'>{score===1 ? 'You got 1 question right.' : `You got ${score} questions right.`}</p>} 
          <button className="submit-quiz large-button" 
                  onClick={!props.checkQuiz ? checkAnswers : restartGame}>
                  {!props.checkQuiz ? "Check Answers" : "Play Again"}</button>
      </form>
  )
}
