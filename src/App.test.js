import { render, screen } from "@testing-library/react";
import App from "./App";
import { shipFactory } from "./components/shipFactory";

test("renders learn react link", () => {
  render(<App />);
});

it("hit() successfully", () => {
  const inputX = 5;
  const inputY = 2;

  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [false, false, false],
    false
  );
  expect(shipTest.hit(inputX, inputY)).toBe(true);
});

it("hit() on already damaged part", () => {
  const inputX = 5;
  const inputY = 2;

  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [false, false, true],
    false
  );
  expect(shipTest.hit(inputX, inputY)).toBe(false);
});

it("misses the hit()", () => {
  const inputX = 5;
  const inputY = 3;

  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [false, false, false],
    false
  );
  expect(shipTest.hit(inputX, inputY)).toBe(false);
});
