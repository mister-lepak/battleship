import { gameBoard } from "../gameBoard";

it("tests if the gameboard can receive attack successfully", () => {
  const gameBoardTest = gameBoard();
  expect(gameBoardTest.receiveAttack(4, 5)).toBe(true);
});

it("tests if the gameboard can missed the attack", () => {
  const gameBoardTest = gameBoard();
  expect(gameBoardTest.receiveAttack(9, 5)).toBe("missed attack");
});

it("tests if the gameboard can avoid attacking an already damaged tile", () => {
  const gameBoardTest = gameBoard();
  gameBoardTest.receiveAttack(2, 2);
  expect(gameBoardTest.receiveAttack(2, 2)).toBe(false);
});

it("tests if the gameboard can assess all ships sunk correctly", () => {
  const gameBoardTest = gameBoard();
  gameBoardTest.receiveAttack(4, 5);
  gameBoardTest.receiveAttack(5, 5);
  gameBoardTest.receiveAttack(6, 5);

  gameBoardTest.receiveAttack(3, 2);
  gameBoardTest.receiveAttack(3, 3);
  gameBoardTest.receiveAttack(3, 4);
  gameBoardTest.receiveAttack(3, 5);
  gameBoardTest.receiveAttack(3, 6);
  expect(gameBoardTest.areAllShipsSunk()).toBe(true);
});

it("tests if the gameboard can assess not all ships are sunk yet", () => {
  const gameBoardTest = gameBoard();
  gameBoardTest.receiveAttack(4, 5);
  gameBoardTest.receiveAttack(5, 5);
  gameBoardTest.receiveAttack(6, 5);

  gameBoardTest.receiveAttack(3, 2);
  gameBoardTest.receiveAttack(3, 5);
  gameBoardTest.receiveAttack(3, 6);
  expect(gameBoardTest.areAllShipsSunk()).toBe(false);
});
