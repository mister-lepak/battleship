import "./App.css";
import shipFactory from "./factories/shipFactory";
import gameBoard from "./factories/gameBoard";
import playerFactory from "./factories/playerFactory";
import { Link } from "react-router-dom";
import { Header, Grid, Button, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { GameBoardGrids } from "./Components/GameBoardGrid";
import Announcement from "./Components/Announcement";
import { random } from "lodash";

function App() {
  const playerMove = playerFactory();
  const [activePlayer, setActivePlayer] = useState("Human");
  const [gameStage, setGameStage] = useState(0);

  const [userShipInfo, setUserShipInfo] = useState([]);
  const [shipPlacingCount, setShipPlacingCount] = useState(0);
  const [shipOrientationList, setShipOrientationList] = useState([
    "horizontal",
    "vertical",
  ]);
  const [shipOrientation, setShipOrientation] = useState(0);
  const [winner, setWinner] = useState("");
  const [winnerModal, setWinnerModal] = useState(false);
  const [successfulHit, setSuccessfulHit] = useState({
    value: false,
    x: null,
    y: null,
  });
  const [contSuccessfulHit, setContSuccessfulHit] = useState({
    value: false,
    x: null,
    y: null,
  });
  const [calcVariationX, setCalcVariationX] = useState([1, -1, 0, 0]);
  const [calcVariationY, setCalcVariationY] = useState([0, 0, -1, 1]);

  const createShipsInfoData = (input) => {
    const inputInfo = input || [
      { x: 7, y: 2, orientation: "vertical", shipLength: 2 },
      { x: 4, y: 5, orientation: "horizontal", shipLength: 3 },
      { x: 5, y: 9, orientation: "horizontal", shipLength: 4 },
      { x: 1, y: 2, orientation: "vertical", shipLength: 5 },
    ];

    if (inputInfo.length === 0) {
      return [];
    }

    let shipsInfo = [];
    for (let i = 0; i < inputInfo.length; i++) {
      shipsInfo = [
        ...shipsInfo,
        {
          ship: shipFactory({
            orientation: inputInfo[i].orientation,
            shipLength: inputInfo[i].shipLength,
          }),
          origin: { x: inputInfo[i].x, y: inputInfo[i].y },
        },
      ];
    }
    return shipsInfo;
  };

  const [humanGameBoard, setHumanGameBoard] = useState(
    gameBoard({
      shipsInfo: createShipsInfoData(userShipInfo),
    })
  );

  const [AIGameBoard, setAIGameBoard] = useState(
    gameBoard({
      shipsInfo: createShipsInfoData(),
    })
  );

  const initializeStates = () => {
    setActivePlayer("Human");
    setGameStage(0);
    setUserShipInfo([]);
    setShipPlacingCount(0);
    setShipOrientation(0);
    setWinner("");
    setWinnerModal(false);
    setHumanGameBoard(
      gameBoard({
        shipsInfo: createShipsInfoData(userShipInfo),
      })
    );
    setAIGameBoard(
      gameBoard({
        shipsInfo: createShipsInfoData(),
      })
    );
  };

  useEffect(() => {
    setHumanGameBoard(
      gameBoard({
        shipsInfo: createShipsInfoData(userShipInfo),
      })
    );
  }, [userShipInfo]);

  const orderMove = (x, y) => {
    if (
      !AIGameBoard.gameBoardGrid[y][x].isDamaged &&
      activePlayer === "Human" &&
      !AIGameBoard.areAllShipsSunk() &&
      !humanGameBoard.areAllShipsSunk()
    ) {
      AIGameBoard.receiveAttack(x, y);
      setActivePlayer("AI");
      setTimeout(() => {
        let randomCoordinates = {};
        let contSuccessfulHitValidity = 1;
        let successfulHitValidity = 3;
        do {
          if (contSuccessfulHit.value && contSuccessfulHitValidity >= 0) {
            contSuccessfulHit.x - successfulHit.x === 0
              ? (randomCoordinates.x = contSuccessfulHit.x)
              : (randomCoordinates.x =
                  contSuccessfulHit.x +
                  calcVariationX[contSuccessfulHitValidity]);
            contSuccessfulHit.y - successfulHit.y === 0
              ? (randomCoordinates.y = contSuccessfulHit.y)
              : (randomCoordinates.y =
                  contSuccessfulHit.y +
                  calcVariationX[contSuccessfulHitValidity]);

            contSuccessfulHitValidity = contSuccessfulHitValidity - 1;
          } else if (successfulHit.value && successfulHitValidity >= 0) {
            randomCoordinates.x =
              successfulHit.x + calcVariationX[successfulHitValidity];
            randomCoordinates.y =
              successfulHit.y + calcVariationY[successfulHitValidity];
            successfulHitValidity = successfulHitValidity - 1;
          } else randomCoordinates = playerMove.makeRandomTurn();

          if (contSuccessfulHitValidity < 0) {
            setContSuccessfulHit({
              value: false,
              x: null,
              y: null,
            });
          }

          if (successfulHitValidity < 0) {
            randomCoordinates = playerMove.makeRandomTurn();
            setSuccessfulHit({
              value: false,
              x: null,
              y: null,
            });
          }
        } while (
          !humanGameBoard.receiveAttack(
            randomCoordinates.x,
            randomCoordinates.y
          )
        );
        if (
          humanGameBoard.gameBoardGrid[randomCoordinates.y][randomCoordinates.x]
            .shipInfo
        ) {
          if (contSuccessfulHit.value) {
            setSuccessfulHit({
              value: true,
              x: contSuccessfulHit.x,
              y: contSuccessfulHit.y,
            });
            setContSuccessfulHit({
              ...contSuccessfulHit,
              value: true,
              x: randomCoordinates.x,
              y: randomCoordinates.y,
            });
          }

          successfulHit.value
            ? setContSuccessfulHit({
                ...contSuccessfulHit,
                value: true,
                x: randomCoordinates.x,
                y: randomCoordinates.y,
              })
            : setSuccessfulHit({
                ...successfulHit,
                value: true,
                x: randomCoordinates.x,
                y: randomCoordinates.y,
              });
        }
        console.log(successfulHit);
        console.log(contSuccessfulHit);
        setActivePlayer("Human");
      }, 1000);
    }

    if (humanGameBoard.areAllShipsSunk()) {
      setWinner("AI");
      setWinnerModal(true);
    }
    if (AIGameBoard.areAllShipsSunk()) {
      setWinner("Human");
      setWinnerModal(true);
    }
  };

  const checkClashesUponPlacement = (x, y) => {
    const statusCheck = userShipInfo.map((eachShip) => {
      let clashStatus = [];
      for (let i = 0; i < shipPlacingCount + 2; i++) {
        const dx = shipOrientation === 0;
        const dy = shipOrientation === 1;
        const iterX = x + dx * i;
        const iterY = y + dy * i;
        const relativeX = iterX - eachShip.x;
        const relativeY = iterY - eachShip.y;
        const shipCoordinateObj = { relativeX, relativeY };
        let axis = "relativeX";
        let antiAxis = "relativeY";

        if (eachShip.orientation === "horizontal") {
          axis = "relativeX";
          antiAxis = "relativeY";
        }
        if (eachShip.orientation === "vertical") {
          axis = "relativeY";
          antiAxis = "relativeX";
        }

        clashStatus.push(
          shipCoordinateObj[axis] >= 0 &&
            shipCoordinateObj[axis] < eachShip.shipLength &&
            shipCoordinateObj[antiAxis] === 0
        );
      }

      return clashStatus.includes(true);
    });

    if (statusCheck.length === 0) return false;

    return statusCheck.includes(true);
  };

  const placeUserShips = (x, y, gameBoardSize = 10) => {
    if (gameStage === 1) {
      const dx = shipOrientation === 0;
      const dy = shipOrientation === 1;

      if (
        x + dx * (shipPlacingCount + 2) > gameBoardSize ||
        y + dy * (shipPlacingCount + 2) > gameBoardSize
      )
        return null;

      if (checkClashesUponPlacement(x, y)) return null;

      setUserShipInfo([
        ...userShipInfo,
        {
          x,
          y,
          orientation: shipOrientationList[shipOrientation],
          shipLength: shipPlacingCount + 2,
        },
      ]);

      setShipPlacingCount((prev) => prev + 1);
    }
    if (shipPlacingCount >= 3) setGameStage(2);
  };

  return (
    <>
      <Announcement
        winner={winner}
        open={winnerModal}
        setOpen={setWinnerModal}
        initializeStates={initializeStates}
      />
      <Header icon as="h1" textAlign="center">
        <Icon name="ship" size="small" />
        Battleship Game
      </Header>
      {gameStage > 0 ? (
        <></>
      ) : (
        <Header as="h2" textAlign="center">
          <Link
            to="/"
            onClick={() => {
              setGameStage(1);
            }}
          >
            Start Game
          </Link>
        </Header>
      )}

      {gameStage > 0 ? (
        <Grid>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={6}>
            <Header as="h2" textAlign="center">
              User Board
            </Header>
            <Grid columns={10}>
              <GameBoardGrids
                gameBoard={humanGameBoard}
                accessiblePlayer="AI"
                onCellClick={placeUserShips}
              />
              ;
            </Grid>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={6}>
            {gameStage > 1 ? (
              <>
                <Header as="h2" textAlign="center">
                  AI Board
                </Header>
                <Grid columns={10}>
                  <GameBoardGrids
                    gameBoard={AIGameBoard}
                    accessiblePlayer="Human"
                    onCellClick={orderMove}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Header as="h2" textAlign="center">
                  Place your ship {shipPlacingCount + 1} out of 4 ships
                </Header>
                <Header as="h3" textAlign="center">
                  Ship Length: {shipPlacingCount + 2}
                  <br></br>
                  Ship Orientation: {shipOrientationList[shipOrientation]}
                  <br></br>
                  <Button
                    primary
                    textAlign="center"
                    onClick={() => setShipOrientation(1 - shipOrientation)}
                  >
                    Switch Ship Orientation
                  </Button>
                </Header>
              </>
            )}
          </Grid.Column>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
