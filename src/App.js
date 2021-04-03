import "./App.css";
import shipFactory from "./factories/shipFactory";
import gameBoard from "./factories/gameBoard";
import playerFactory from "./factories/playerFactory";
import { Link } from "react-router-dom";
import { Header, Grid } from "semantic-ui-react";
import { useEffect, useState, useRef } from "react";

function App() {
  const activePlayer = playerFactory();
  const decideTurn = () => {};

  const createNewTestShipsInfoData = () => {
    return [
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

  const [humanGameBoard, setHumanGameBoard] = useState(
    gameBoard({
      shipsInfo: createNewTestShipsInfoData(),
    })
  );
  const [AIGameBoard, setAIGameBoard] = useState(
    gameBoard({
      shipsInfo: createNewTestShipsInfoData(),
    })
  );

  const humanElRefs = useRef([[], [], [], [], [], [], [], [], [], []]);

  useEffect(() => {}, []);

  return (
    <>
      <Header as="h1" textAlign="center">
        Battleship Game
      </Header>
      <Header as="h2" textAlign="center">
        <Link to="/">Start Game</Link>
      </Header>
      <Grid onClick={() => {}}>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={6}>
          <Header as="h2" textAlign="center">
            User Board
          </Header>
          <Grid columns={10}>
            {humanGameBoard.renderGrids("Human", activePlayer, humanElRefs)}
          </Grid>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={6}>
          <Header as="h2" textAlign="center">
            AI Board
          </Header>
          <Grid columns={10}>
            {AIGameBoard.renderGrids("AI", activePlayer, humanElRefs)}
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default App;
