export default function Quiz(props) {

    const answerOptions = props.choices.map((choice, index) => {
        function answerClass() {
            if (props.showResults && choice === props.correctAnswer) {
                return "correct-answer"
            }
            if (props.showResults && props.selectedAnswer === choice) {
                return "incorrect-answer"
            }
            if (props.selectedAnswer === choice) {
                return "selected-answer-btn"
            }
            else {
                return "answer-btn"
            }

        }
        return <button className={answerClass()} key={index} onClick={() => props.handleSelectedAnswer(choice, props.id)}> {choice} </button>

    })

    return (

        <div className="qa-section">
            <div className="question-section">
                <h2>{props.question}</h2>
            </div>
            <div className="answer-section">
                {answerOptions}
            </div>
        </div>

    )
}