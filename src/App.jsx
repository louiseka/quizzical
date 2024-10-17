import Home from "./components/Home"
import Quiz from "./components/Quiz"
import React from "react"
import he from "he"

export default function App() {

  const [quiz, setQuiz] = React.useState([])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  React.useEffect(() => {
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
      })
  }, [])

  //Event listener
  function handleSelectedAnswer(choice, id) {
    console.log(choice)
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
