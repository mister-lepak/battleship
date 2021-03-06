import shipFactory from "./shipFactory";

const gameBoardFactory = () => {
  let boardTiles = [];
  const initialize = () => {
    for (let i = 0; i < 100; i++) {
      boardTiles.push({ hasShip: false, isShot: false });
    }
    return true;
  };

  const receiveAttack = (coordinates) => {
    const sequenceCalc = coordinates[0] * 10 + coordinates[1];
    if (boardTiles[sequenceCalc].isShot) return false;
    if (boardTiles[sequenceCalc].hasShip) {
      shipFactory.hit([coordinates]);
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
    shipFactory,
    receiveAttack,
    isAlreadyAttacked,
    areAllShipsSunk,
  };
};

module.exports = gameBoardFactory;
