import { test, describe, vi, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";


import App from "../App";

describe("App", () => {
    test.todo("The shuffle function shuffles answers")

    test.todo("The start quiz button fetches the quiz")

    test.todo("Check answers button appears when all answers are selected")

    test.todo("Check answer button displays a score out of 5")

    test("newGame is called upon clicking 'Play Again' btn", async () => {

        //Arrange
        const user = userEvent.setup()
        const newGame = vi.fn()
        render(<App />)
        const playAgainBtn = screen.getByRole('button')

        //Act 
        await user.click(playAgainBtn)

        //Assert
        expect(newGame).toHaveBeenCalled()
    })
})

