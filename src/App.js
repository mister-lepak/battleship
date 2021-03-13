import "./App.css";
import { shipFactory } from "./factories/shipFactory";
import gameBoardFactory from "./factories/gameBoardFactory";
import { Link } from "react-router-dom";
import { Header, Grid } from "semantic-ui-react";

function App() {
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

  return (
    <>
      <Header as="h1" textAlign="center">
        Battleship Game
      </Header>
      <Header as="h2" textAlign="center">
        <Link to="/">Start Game</Link>
      </Header>
      <Grid>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={8}>
          <Grid columns={10}>{gameBoardFactory(ships).initialize()}</Grid>
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid columns={1} width={1}></Grid>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default App;
