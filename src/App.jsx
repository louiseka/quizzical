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

  const quizElements = quiz.map(qa => {
    return (
      <Quiz
        question={qa.question}
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

// question: "",
// correctAnswer: "",
// incorrectAnswers: []
// }