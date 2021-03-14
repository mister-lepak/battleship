import "./App.css";
import { shipFactory } from "./factories/shipFactory";
import gameBoardFactory from "./factories/gameBoardFactory";
import { Link } from "react-router-dom";
import { Header, Grid } from "semantic-ui-react";

function App() {
  const userShips = {
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

  const aiShips = {
    1: [[5, 7]],
    2: [
      [6, 3],
      [7, 3],
    ],
    3: [
      [1, 7],
      [1, 8],
      [1, 9],
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
        <Grid.Column width={6}>
          <Header as="h2" textAlign="center">
            User Board
          </Header>
          <Grid columns={10}>{gameBoardFactory(userShips).initialize()}</Grid>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={6}>
          <Header as="h2" textAlign="center">
            AI Board
          </Header>
          <Grid columns={10}>{gameBoardFactory(aiShips).initialize("AI")}</Grid>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default App;
