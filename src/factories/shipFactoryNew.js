import _ from "lodash";

const shipFactory = (boundary) => {
  const shipDamagePosition = [];

  _.times(boundary.length, (i) => {
    shipDamagePosition.push(false);
  });

  const isSunk = () => {
    return shipDamagePosition.reduce(
      (cumulative, current) => cumulative && current,
      true
    );
  };

  const hit = (x, y) => {
    const shipCoordinateObj = { x, y };
    let axis = "x";
    const isInsideShipBoundary = () => {
      if (boundary.orientation === "horizontal") axis = "x";
      if (boundary.orientation === "vertical") axis = "y";
      return shipCoordinateObj[axis] < boundary.length;
    };
    const isAttacked = () => {
      const shipPosition = shipCoordinateObj[axis];
      return shipDamagePosition[shipPosition];
    };

    if (isInsideShipBoundary && !isAttacked) {
      isSunk();
      return true;
    }
    return false;
  };

  return { shipDamagePosition, hit, boundary };
};

module.exports = { shipFactory };
