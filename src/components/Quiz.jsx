export default function Quiz(props) {
    return (

        <div className="qa-section">
            <div className="question-section">
                <h2>{props.question}</h2>
            </div>
            <div className="answer-section">
                <button className="answer-btn">Option 1 Option 1</button>
                <button className="answer-btn"> Option 3 </button>
                <button className="answer-btn">Option 2 Cat </button>
                <button className="answer-btn"> Option 4</button>
            </div>
        </div>

    )
}