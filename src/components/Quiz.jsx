export default function Quiz(props) {

    const answerOptions = props.choices.map((choice, index) => {
        const answerClass = props.selectedAnswer === choice ? "selected-answer-btn" : "answer-btn"
        return <button className={answerClass} key={index} onClick={() => props.handleSelectedAnswer(choice, props.id)}> {choice} </button>
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