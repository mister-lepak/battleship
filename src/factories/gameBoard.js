import "../App.css";

const gameBoard = (config = {}) => {
  const parseConfig = (cfg) => {
    let { shipsInfo, gameBoardSizeX, gameBoardSizeY } = config;
    return {
      shipsInfo: shipsInfo || [],
      gameBoardSizeX: gameBoardSizeX || 10,
      gameBoardSizeY: gameBoardSizeY || 10,
    };
  };

  const { shipsInfo, gameBoardSizeX, gameBoardSizeY } = parseConfig(config);

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
      for (let i = 0; i < shipInfo.ship.boundary.shipLength; i++) {
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
    return shipsInfo.reduce((cum, curr) => curr.ship.isSunk() && cum, true);
  };

  return {
    gameBoardGrid,
    receiveAttack,
    areAllShipsSunk,
  };
};

export default gameBoard;
