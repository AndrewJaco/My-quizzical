import './App.css'

export default function LandingPage(props) {
  return(
      <div className="flex landing-page-container">
          <h1 className="landing-title">Quizzical</h1>
          <p className="landing-description"> 
          Test your general knowledge in five questions! </p>
          <button 
            className="large-button" 
            onClick={props.startQuiz}
            >Start Quiz </button>
      </div>
  )
}
