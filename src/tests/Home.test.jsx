import { test, expect, vi, describe } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Home from "../components/Home"

describe("Home Component", () => {
    test("renderStartQuiz prop is called upon clicking Start Quiz", async () => {
        //Arrange
        const user = userEvent.setup()
        const renderStartQuiz = vi.fn()
        render(<Home renderStartQuiz={renderStartQuiz} />)
        const startBtn = screen.getByRole('button')
        //Act
        await user.click(startBtn)
        //Assert
        expect(renderStartQuiz).toHaveBeenCalled()
    })

    test("renders the title", () => {
        render(<Home />)
        expect(screen.getByText("Quizzical")).toBeInTheDocument()
    })

    test("displays the button text", () => {
        render(<Home />)
        expect(screen.getByRole('button')).toHaveTextContent("Start Quiz")
    })

})


