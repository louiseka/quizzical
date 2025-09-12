import { test, expect, vi, describe } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Quiz from "./Quiz";

describe("Quiz component", () => {

    test("handleSelectedAnswer is called upon clicking answer", async () => {
        //Arrange
        const user = userEvent.setup()
        const handleSelectedAnswer = vi.fn()
        render(
            <Quiz
                choices={["A", "B"]}
                question="Test question"
                id={1}
                handleSelectedAnswer={handleSelectedAnswer} />)
        const answerBtn = screen.getByRole('button', { name: "A" })

        //Act
        await user.click(answerBtn)

        //Assert
        expect(handleSelectedAnswer).toHaveBeenCalledWith("A", 1)
    })

    test("Applies selected-answer-btn class when answer is selected", () => {
        render(
            <Quiz
                choices={["A", "B"]}
                question="Test question"
                id={1}
                selectedAnswer="A"
            />)

        const selectedBtn = screen.getByRole('button', { name: "A" })
        const otherBtn = screen.getByRole('button', { name: "B" })

        expect(selectedBtn).toHaveClass('selected-answer-btn')
        expect(otherBtn).toHaveClass('answer-btn')
    })

    test("Applies correct-answer and incorrect-answer classes when showResults is true", () => {
        render(
            <Quiz
                choices={["A", "B"]}
                question="Test question"
                id={1}
                selectedAnswer="B"
                correctAnswer="A"
                showResults={true}
            />)

        const correctBtn = screen.getByRole('button', { name: "A" })
        const incorrectBtn = screen.getByRole('button', { name: "B" })

        expect(correctBtn).toHaveClass('correct-answer')
        expect(incorrectBtn).toHaveClass('incorrect-answer')
    })
})

