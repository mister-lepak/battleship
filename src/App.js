import "./App.css";
import { shipFactory } from "./factories/shipFactory";
import { gameBoardFactory } from "./factories/gameBoardFactory";
import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";

function App() {
  return (
    <>
      <Header as="h1" textAlign="center">
        Battleship Game
      </Header>
      <Header as="h2" textAlign="center">
        <Link to="/">Start Game</Link>
      </Header>
    </>
  );
}

export default App;
