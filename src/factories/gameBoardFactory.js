// import shipFactory from "./shipFactory";
import _ from "lodash";
import { Grid, Segment } from "semantic-ui-react";

const gameBoardFactory = (shipTiles, boardTiles = []) => {
  const initialize = () => {
    const tilesWithShips = [];
    _.forOwn(shipTiles, function (coordinatesSets, key) {
      _.forEach(coordinatesSets, function (coordinates) {
        const sequenceCalc = coordinates[1] * 10 + coordinates[0];
        tilesWithShips.push(sequenceCalc);
      });
    });
    return _.times(100, (i) => {
      let hasShipValue = false;
      let gridClass = "eachGrid";
      if (tilesWithShips.includes(i)) {
        hasShipValue = true;
        gridClass = "shipGrid";
      }
      boardTiles.push({ hasShip: hasShipValue, isShot: false });
      return (
        <Grid.Column
          textAlign="center"
          key={i}
          className={gridClass}
        ></Grid.Column>
      );
    });

    // return true;
  };

  const placeShipOnBoard = (startPos) => {
    const shipsA = [
      {
        length: 3,
        orientation: "horizontal",
        startPos: [3, 2],
        damagedPos: [false, false, true],
        sunk: false,
      },
      {
        length: 5,
        orientation: "vertical",
        startPos: [1, 1],
        damagedPos: [false, false, false, false, false],
        sunk: false,
      },
    ];
    // shipsA.map((ship) => shipFactory(ship));
    const sequenceCalc = startPos[0] * 10 + startPos[1];
    boardTiles[sequenceCalc].hasShip = true;
  };

  const receiveAttack = (coordinates) => {
    const sequenceCalc = coordinates[0] * 10 + coordinates[1];
    if (boardTiles[sequenceCalc].isShot) return false;
    if (boardTiles[sequenceCalc].hasShip) {
      // shipFactory.hit([coordinates]);
      boardTiles[sequenceCalc].isShot = true;
    }
    return true;
  };

  const isAlreadyAttacked = (coordinates) => {
    const sequenceCalc = coordinates[0] * 10 + coordinates[1];
    if (!boardTiles[sequenceCalc].isShot) return false;
    return true;
  };

  const areAllShipsSunk = () => {
    const tilesWithShips = boardTiles.filter(
      (eachTile) => eachTile.hasShip === true
    );

    if (tilesWithShips === undefined || tilesWithShips.length === 0)
      return false;
    const areAllShipsShot = tilesWithShips.reduce(
      (cumulative, current) => cumulative.isShot * current.isShot,
      []
    );
    if (!areAllShipsShot) return false;
    return tilesWithShips;
  };

  return {
    initialize,
    placeShipOnBoard,
    // shipFactory,
    receiveAttack,
    isAlreadyAttacked,
    areAllShipsSunk,
  };
};

export default gameBoardFactory;
