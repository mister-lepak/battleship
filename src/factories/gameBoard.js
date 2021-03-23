import { shipFactory } from "./shipFactoryNew";

const gameBoard = (gameBoardSizeX = 10, gameBoardSizeY = 10) => {
  let shipsInfo = [];

  const setStaticShipsInfo = () => {
    shipsInfo = [
      {
        ship: shipFactory({ orientation: "horizontal", length: 3 }),
        origin: { x: 4, y: 5 },
      },
      {
        ship: shipFactory({ orientation: "vertical", length: 5 }),
        origin: { x: 3, y: 2 },
      },
    ];
  };

  setStaticShipsInfo();

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
    if (gameBoardGrid[y][x].shipInfo === null) {
      gameBoardGrid[y][x].isDamaged = true;
      return "missed attack";
    }

    const shipCoordinateX = x - gameBoardGrid[y][x].shipInfo.origin.x;
    const shipCoordinateY = y - gameBoardGrid[y][x].shipInfo.origin.y;
    gameBoardGrid[y][x].isDamaged = true;
    return gameBoardGrid[y][x].shipInfo.ship.hit(
      shipCoordinateX,
      shipCoordinateY
    );
  };

  const areAllShipsSunk = () => {
    const filteredGameBoard = gameBoardGrid
      .map((row) => {
        return row.filter((grid) => {
          return grid.shipInfo !== null;
        });
      })
      .filter((row) => row[0]);

    return filteredGameBoard.reduce(
      (cumulative, current) =>
        cumulative && current.every((grid) => grid.shipInfo.ship.isSunk()),
      true
    );
  };

  return {
    gameBoardGrid,
    shipFactory,
    setStaticShipsInfo,
    receiveAttack,
    areAllShipsSunk,
  };
};

module.exports = { gameBoard };
