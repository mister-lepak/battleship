import { render, screen } from "@testing-library/react";
import App from "../../App";
import { shipFactory } from "../shipFactory";

test("renders learn react link", () => {
  render(<App />);
});

it("hit() successfully", () => {
  const input = [5, 2];

  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [false, false, false],
    false
  );
  expect(shipTest.hit(input)).toBe(true);
});

it("hit() on already damaged part", () => {
  const input = [5, 2];

  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [false, false, true],
    false
  );
  expect(shipTest.hit(input)).toBe(false);
});

it("misses the hit()", () => {
  const input = [5, 3];

  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [false, false, false],
    false
  );
  expect(shipTest.hit(input)).toBe(false);
});

it("assess if the ship has sunk when not all position damaged", () => {
  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [false, true, false],
    false
  );
  expect(shipTest.isSunk()).toBe(false);
});

it("assess if the ship has sunk when all position damaged", () => {
  const shipTest = shipFactory(
    3,
    "horizontal",
    [3, 2],
    [true, true, true],
    false
  );
  expect(shipTest.isSunk()).toBe(true);
});
