import "./App.css";
import { shipFactory } from "./factories/shipFactory";
import gameBoardFactory from "./factories/gameBoardFactory";
import { Link } from "react-router-dom";
import { Header, Grid } from "semantic-ui-react";

function App() {
  return (
    <>
      <Header as="h1" textAlign="center">
        Battleship Game
      </Header>
      <Header as="h2" textAlign="center">
        <Link to="/">Start Game</Link>
      </Header>
      <Grid columns={10}>{gameBoardFactory.initialize()}</Grid>
    </>
  );
}

export default App;
