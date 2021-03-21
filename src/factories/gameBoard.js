import { forEach } from "lodash";
import { shipFactory } from "./shipFactoryNew";

const gameBoard = (gameBoardSizeX = 10, gameBoardSizeY = 10) => {
  const shipsInfo = [
    {
      ship: shipFactory({ orientation: "horizontal", length: 3 }),
      origin: { x: 4, y: 5 },
    },
    {
      ship: shipFactory({ orientation: "vertical", length: 5 }),
      origin: { x: 3, y: 2 },
    },
  ];

  const createGameBoardGrid = () => {
    const boardGrid = [];
    for (let y = 0; y < gameBoardSizeY; y++) {
      const eachRow = [];
      for (let x = 0; x < gameBoardSizeX; x++) {
        eachRow.push({ shipInfo: null, isDamaged: false });
      }
      boardGrid.push(eachRow);
    }

    shipsInfo.forEach((shipInfo) => {
      const dx = shipInfo.ship.boundary.orientation === "horizontal";
      const dy = shipInfo.ship.boundary.orientation === "vertical";
      for (let i = 0; i < shipInfo.ship.boundary.length; i++) {
        const x = shipInfo.origin.x + dx * i;
        const y = shipInfo.origin.y + dy * i;

        boardGrid[y][x].shipInfo = shipInfo;
      }
    });
    return boardGrid;
  };

  const gameBoardGrid = createGameBoardGrid();

  const receiveAttack = (x, y) => {
    if (gameBoardGrid[y][x].isDamaged === true) return false;
    if (gameBoardGrid[y][x].shipInfo === undefined) {
      console.log("missed attack");
      return true;
    }
    console.log("hit ship");
    gameBoardGrid[y][x].isDamaged = true;
    shipFactory.hit();
    return true;
  };

  const areAllShipsSunk = () => {
    return shipsInfo.reduce(
      (cumulative, current) => cumulative && current.ship.isSunk(),
      true
    );
  };

  return { gameBoardGrid, receiveAttack, areAllShipsSunk };
};

module.exports = { gameBoard };
