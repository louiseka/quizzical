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

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

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
            const answerChoices = shuffle([...incorrectAnswers, correctAnswer])
            return {
              ...result,
              question: question,
              correct_answer: correctAnswer,
              incorrect_answers: incorrectAnswers,
              choices: answerChoices,
              selected_answer: undefined
            }
          })
          setQuiz(decodedResults)
          console.log(data.results)
        }
        setIsLoading(false)
      })
  }, [startQuiz])

  function renderStartQuiz() {
    setStartQuiz(true)
  }



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
          selected_answer: choice
        }
      })
    )
  }

  React.useEffect(() => {
    const allAnswered = quiz.every((question) => question.selected_answer !== undefined)
    setAllQuestionsAnswered(allAnswered)
  }, [quiz])

  function getTotalScore() {
    let newScore = 0
    quiz.forEach((question) => {
      if (question.correct_answer === question.selected_answer) {
        newScore++
      }
      setScore(newScore)
    })
  }

  function checkAnswers() {
    getTotalScore()
    setShowResults(true)
  }

  function newGame() {
    setQuiz([])
    setScore(0)
    setShowResults(false)
    setStartQuiz(false)
  }

  const quizElements = quiz.map((qa, index) => {
    return (
      <Quiz
        key={index}
        id={index}
        question={qa.question}
        choices={qa.choices}
        correctAnswer={qa.correct_answer}
        selectedAnswer={qa.selected_answer}
        handleSelectedAnswer={handleSelectedAnswer}
        showResults={showResults}
      />
    )
  })

  const checkAnswersBtn = allQuestionsAnswered && quiz.length > 0

  let btnText = ""
  if (checkAnswersBtn) {
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
      {checkAnswersBtn && <button className="action-btn" onClick={showResults ? newGame : checkAnswers}>{btnText}</button>}
      {isLoading && <p className="loading-text"> Please wait whilst the quiz loads...</p>}
      <div className="bottom-bg-blob"></div>
    </div>
  )
}
