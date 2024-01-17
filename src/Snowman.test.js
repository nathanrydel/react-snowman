import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import Snowman from "./Snowman";

const MAX_WRONG = 5;


// SMOKE TEST
describe("basic rendering smoke test", function () {
  test("successful render", function () {
    render(<Snowman />);
  });
});


// TEST ONLY SIX WRONG GUESSES
// -- make sure some elements where not in the DOM -> make sure keyboard is disabled after meeting lose state (MAXWRONG GUESSES)

describe("Max failed guesses behavior", function () {
  // TODO: test winning condition
  // make a snap shot

  test("test hitting losing condition", function () {
    // fireEvents of wrong guess until hitting MAX_WRONG
    // TODO: Not benefitting to use GLOBAL CONST instead of hard coding
    const { container, getByText } = render(<Snowman maxWrong={MAX_WRONG} words={["test"]} />);

    fireEvent.click(container.querySelector('button[value="a"]'));
    fireEvent.click(container.querySelector('button[value="b"]'));
    fireEvent.click(container.querySelector('button[value="c"]'));
    fireEvent.click(container.querySelector('button[value="d"]'));

    // THIS PROVES THAT THE FOLLOWING DOES NOT HAPPEN BEFORE REACHING THE FAIL
    expect(getByText("Number wrong: 5")).not.toBeInTheDocument();
    expect(getByText("You lose: test")).not.toBeInTheDocument();
    expect(container.querySelector('button[value="q"]')).toBeInTheDocument();

    fireEvent.click(container.querySelector('button[value="f"]'));

    // Expect failure behavior
    // "YOU LOSE"
    // All buttons are not rendered

    // NOW CONFIDENT THAT FIFTH BUTTON PUSH CAUSED THE FOLLOWING TO HAPPEN
    // MAKE SURE THAT THESE HAPPEN AS A RESULT OF YOUR CODE
    expect(getByText("Number wrong: 5")).toBeInTheDocument();
    expect(getByText("You lose: test")).toBeInTheDocument();
    expect(container.querySelector('button[value="q"]')).not.toBeInTheDocument();
  });

  // SNAPSHOT -- holds the image of loss condition
  test("matches losing snapshot", function () {
    const { container } = render(<Snowman maxWrong={MAX_WRONG} words={["test"]} />);

    fireEvent.click(container.querySelector('button[value="a"]'));
    fireEvent.click(container.querySelector('button[value="b"]'));
    fireEvent.click(container.querySelector('button[value="c"]'));
    fireEvent.click(container.querySelector('button[value="d"]'));
    fireEvent.click(container.querySelector('button[value="f"]'));

    expect(container).toMatchSnapshot();
  });
});

// OTHER THINGS TO TEST
// - WINNING CONDITION,
// - IMGS CHANGE WITH WRONG GUESSES,
// - UNDERSCORES DISAPPEAR ON CORRECT GUESSES

// TODO:
// SUBTLE TESTING
// USE DIFFERENT MAXWRONG VALUES TO ENSURE THAT IT IS NOT HARDCODED
// HAVE A TEST FOR 3 WRONG GUESSES AND A TEST WITH 1 WRONG GUESS