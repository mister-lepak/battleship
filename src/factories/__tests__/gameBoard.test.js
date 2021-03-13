import gameBoardFactory from "../gameBoardFactory";

beforeEach(() => {});

it("gameboard activates successfully", () => {
  const ships = {
    1: [[2, 2]],
    2: [
      [7, 8],
      [8, 8],
    ],
    3: [
      [4, 5],
      [4, 6],
      [4, 7],
    ],
  };
  const gameBoardTest = gameBoardFactory(ships);
  expect(gameBoardTest.initialize()).toBe(true);
});

// it("assign a ship on the board", () => {
//   const gameBoardTest = gameBoardFactory();
//   gameBoardTest.initialize();

//   gameBoardTest
//     .shipFactory(3, "horizontal", [3, 2], [false, false, false], false)
//     .placeShipOnBoard();
//   expect(gameBoardTest.boardTiles[32].hasShip).toBe(true);
// });

it("activate receiveAttack and it hits a ship", () => {
  const player1Test = [[3, 2]];
  const player2Test = [[3, 3]];
  const gameBoardTest = gameBoardFactory(player1Test, player2Test);
  const inputPosTest = [4, 2];
  gameBoardTest.initialize();
  expect(gameBoardTest.receiveAttack(inputPosTest)).toBe(true);
});

it("activate receiveAttack() and it misses!", () => {
  const player1Test = [[3, 2]];
  const player2Test = [[3, 3]];
  const gameBoardTest = gameBoardFactory(player1Test, player2Test);
  const inputPosTest = [4, 5];
  gameBoardTest.initialize();
  expect(gameBoardTest.receiveAttack(inputPosTest)).toBe(true);
});

it("check empty tile if it has been attacked", () => {
  const player1Test = [[3, 2]];
  const player2Test = [[3, 3]];
  const gameBoardTest = gameBoardFactory(player1Test, player2Test);
  gameBoardTest.initialize();
  expect(gameBoardTest.isAlreadyAttacked([1, 1])).toBe(false);
});

it("check if all ships have been sunk, expected to be false", () => {
  const player1Test = [[3, 2]];
  const player2Test = [[3, 3]];
  const gameBoardTest = gameBoardFactory(player1Test, player2Test);
  gameBoardTest.initialize();
  expect(gameBoardTest.areAllShipsSunk()).toBe(false);
});
