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
})

