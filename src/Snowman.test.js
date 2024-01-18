import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import Snowman from "./Snowman";

const MAX_WRONG = 5

// maybe render out a Snowman instance in a beforeEach and test off that?

// SMOKE TEST
describe("basic rendering smoke test", function () {
  test("successful render", function () {
    render(<Snowman />)
  })
})


// TEST ONLY SIX WRONG GUESSES
// -- make sure some elements where not in the DOM -> make sure keyboard is disabled after meeting lose state (MAXWRONG GUESSES)

describe("Max failed guesses behavior", function () {
  // test winning condition
  // make a snap shot

  // test the losing condition
  // make a snapshot

  test("test hitting losing condition", function () {
    // fireEvents of wrong guess until hitting MAX_WRONG
    const {container, debug } = render(<Snowman maxWrong={ MAX_WRONG } words={["test"]} />)

    fireEvent.click(container.querySelector('button[value="a"]'))
    fireEvent.click(container.querySelector('button[value="b"]'))
    fireEvent.click(container.querySelector('button[value="c"]'))
    fireEvent.click(container.querySelector('button[value="d"]'))
    fireEvent.click(container.querySelector('button[value="f"]'))
    // Expect failure behavior
    // "YOU LOSE"
    // All buttons are disabled

    //TODO: figure out how to test these conditions properly
    expect(container.querySelector("#Snowman-lose-msg")).toBeInTheDocument();
    expect(container.querySelector("#Snowman-num-wrong")).toBeInTheDocument();
    expect(container.querySelector("#Snowman-num-wrong").innerText)
      .toEqual('Number wrong: 5');
    expect(container.querySelector('button[value="q"]')).not.toBeInTheDocument();
  })

  // SNAPSHOT -- holds the image of no buttons

})

// TEST each function in snowman