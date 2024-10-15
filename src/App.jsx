import Home from "./components/Home"
import Quiz from "./components/Quiz"

export default function App() {
  return (
    <div className="quiz-page">
      <div className="top-bg-blob"></div>
      <Quiz />
      <Quiz />
      <Quiz />
      <Quiz />
      <Quiz />
      <div className="bottom-bg-blob"></div>
    </div>
  )
}