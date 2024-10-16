export default function Quiz(props) {

    const answerOptions = props.choices.map((choice, index) => {
        return <button className="answer-btn" key={index}> {choice} </button>
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