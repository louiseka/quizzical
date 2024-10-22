export default function Home(props) {

    return (
        <main>
            <div className="quiz-home">
                <h1> Quizzical </h1>
                <p> Five general knowledge questions, perfect for a quick brain workout or a friendly competition with yourself! </p>
                <button onClick={props.renderStartQuiz} className="action-btn"> Start Quiz</button>
            </div>
        </main>
    )
}