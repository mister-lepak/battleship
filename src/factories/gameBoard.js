import { playerFactory } from "./playerFactory";
import { Grid } from "semantic-ui-react";
import "../App.css";
import { forwardRef } from "react";

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
    return shipsInfo.reduce((cum, curr) => curr.ship.isSunk() && cum, true);
  };

  const renderGrids = (assignedPlayer, player, humanElRefs) => {
    let gridClass = "eachGrid";
    return gameBoardGrid.map((row, y) => {
      return row.map((column, x) => {
        //   humanElRefs.current[y].push(0);
        return (
          <Grid.Column textAlign="center">
            <div
              ref={(ref) => {
                if (
                  assignedPlayer === "Human" &&
                  humanElRefs.current[9].length < 10
                )
                  humanElRefs.current[y].push(ref);
              }}
              className={gridClass}
              onClick={(e) => {
                const attack = receiveAttack(x, y);

                if (player.isAITurn === false && assignedPlayer === "AI") {
                  console.log(player);
                  if (attack === false || attack === "missed attack") {
                    e.target.classList.remove("eachGrid");
                    e.target.classList.add("missedShotGrid");
                  } else {
                    e.target.classList.remove("shipGrid");
                    e.target.classList.add("damagedGrid");
                  }

                  setTimeout(() => {
                    player.isAITurn = true;
                    player.setIsAITurn(true);
                    console.log(player);
                    const randomMove = player.makeRandomTurn(
                      gameBoardSizeX,
                      gameBoardSizeY
                    );
                    console.log(randomMove);
                    console.log(humanElRefs);
                    humanElRefs.current[randomMove.y][
                      randomMove.x
                    ].current.click();
                    player.isAITurn = false;
                  }, 1000);
                }

                if (areAllShipsSunk()) {
                  console.log("all ships sunk!");
                }
              }}
            ></div>
          </Grid.Column>
        );
      });
    });
  };

  return {
    gameBoardGrid,
    receiveAttack,
    areAllShipsSunk,
    renderGrids,
  };
};

export default gameBoard;
