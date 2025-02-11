import Home from "./components/Home"
import Quiz from "./components/Quiz"
import React from "react"
import he from "he"

export default function App() {

  const [quiz, setQuiz] = React.useState([])
  const [startQuiz, setStartQuiz] = React.useState(false)
  const [allQuestionsAnswered, setAllQuestionsAnswered] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [showResults, setShowResults] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  //Shuffling correct answer into incorrect answers array

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  //Fetching API, its data and creating loading text
  React.useEffect(() => {
    if (!startQuiz) {
      return
    }
    setIsLoading(true)
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {
        if (data.response_code === 0) {
          const decodedResults = data.results.map(result => {
            const question = he.decode(result.question)
            const correctAnswer = he.decode(result.correct_answer)
            const incorrectAnswers = result.incorrect_answers.map(incorrectAnswer => {
              return he.decode(incorrectAnswer)
            })
            const choices = shuffle([...incorrectAnswers, correctAnswer])
            return {
              ...result,
              question,
              correctAnswer,
              incorrectAnswers,
              choices,
              selectedAnswer: undefined
            }
          })
          setQuiz(decodedResults)
        }
        setIsLoading(false)
      })
  }, [startQuiz])

  //Start Quiz render  
  function renderStartQuiz() {
    setStartQuiz(true)
  }

  //Recording user choices  
  function handleSelectedAnswer(choice, id) {
    if (showResults) {
      return
    }
    setQuiz(prevQuizData =>
      prevQuizData.map((quizData, index) => {
        if (index !== id) {
          return quizData
        }
        return {
          ...quizData,
          selectedAnswer: choice
        }
      })
    )
  }

  //Checking all questions are answered
  React.useEffect(() => {
    const allAnswered = quiz.every((question) => question.selectedAnswer !== undefined)
    setAllQuestionsAnswered(allAnswered)
  }, [quiz])

  //Calculating score  
  function getTotalScore() {
    let newScore = 0
    quiz.forEach((question) => {
      if (question.correctAnswer === question.selectedAnswer) {
        newScore++
      }
    })
    setScore(newScore)
  }

  //onClick for Check Answers btn  
  function checkAnswers() {
    getTotalScore()
    setShowResults(true)
  }

  //onClick for Play Again btn  
  function newGame() {
    setQuiz([])
    setScore(0)
    setShowResults(false)
    setStartQuiz(false)
  }

  //Components and its logic for rendering

  const quizElements = quiz.map((qa, index) => {
    return (
      <Quiz
        key={index}
        id={index}
        question={qa.question}
        choices={qa.choices}
        correctAnswer={qa.correctAnswer}
        selectedAnswer={qa.selectedAnswer}
        handleSelectedAnswer={handleSelectedAnswer}
        showResults={showResults}
      />
    )
  })

  const showCheckAnswersBtn = allQuestionsAnswered && quiz.length > 0

  let btnText = ""
  if (showCheckAnswersBtn) {
    btnText = "Check answers"
  } if (showResults === true) {
    btnText = "Play again"
  }

  const homeElements =
    <Home
      renderStartQuiz={renderStartQuiz}
    />

  return (
    <div className={startQuiz ? "quiz-page" : "quiz-home"}>
      <div className="top-bg-blob"></div>
      {startQuiz && <h1> Quzzical</h1>}
      {startQuiz ? quizElements : homeElements}
      {showResults && <p className="quiz-results">Your scored {score} /5 correct answers </p>}
      {showCheckAnswersBtn && <button className="action-btn" onClick={showResults ? newGame : checkAnswers}>{btnText}</button>}
      {isLoading && <p className="loading-text"> Please wait whilst the quiz loads...</p>}
      <div className="bottom-bg-blob"></div>
    </div>
  )
}
