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
    const { container, getByText } = render(<Snowman maxWrong={MAX_WRONG} words={["test"]} />);

    fireEvent.click(container.querySelector('button[value="a"]'));
    fireEvent.click(container.querySelector('button[value="b"]'));
    fireEvent.click(container.querySelector('button[value="c"]'));
    fireEvent.click(container.querySelector('button[value="d"]'));
    fireEvent.click(container.querySelector('button[value="f"]'));

    // Expect failure behavior
    // "YOU LOSE"
    // All buttons are not rendered

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
