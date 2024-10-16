import Home from "./components/Home"
import Quiz from "./components/Quiz"
import React from "react"

export default function App() {

  const [quiz, setQuiz] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {
        if (data.response_code === 0) {
          setQuiz(data.results)
          console.log(data.results)
        }
      })
  }, [])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const quizElements = quiz.map((qa, index) => {
    return (
      <Quiz
        key={index}
        question={qa.question}
        choices={shuffle([...qa.incorrect_answers, qa.correct_answer])}
        correctAnswer={qa.correct_answer}
      />
    )
  })

  return (
    <div className="quiz-page">
      <div className="top-bg-blob"></div>
      {quizElements}
      <div className="bottom-bg-blob"></div>
    </div>
  )
}
