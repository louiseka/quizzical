import { test, describe, vi, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App", () => {
  test.todo("The shuffle function shuffles answers");

  test.todo("The start quiz button fetches the quiz");

  test.todo("Check answers button appears when all answers are selected");

  test.todo("Check answer button displays a score out of 5");

  test("clicking 'Play Again' shows the start screen again", async () => {
    const user = userEvent.setup();
    render(<App />);

    const playAgainBtn = await screen.findByRole("button", {
      name: /play again/i,
    });

    await user.click(playAgainBtn);

    expect(screen.getByText(/start quiz/i)).toBeInTheDocument();
  });
});
