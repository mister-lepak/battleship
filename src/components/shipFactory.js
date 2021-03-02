const shipFactory = (length, orientation, startPos, damagedPos, sunk) => {
  const hit = (posX, posY) => {
    if (!sunk) {
      let positionArrayX = [];
      let positionArrayY = [];
      let attackPos = [posX, posY];
      for (let i = 0; i < length; i++) {
        let positionVal = [];
        orientation === "horizontal"
          ? (positionVal = [startPos[0] + i, startPos[1]])
          : (positionVal = [startPos[0], startPos[1] + i]);
        if (!damagedPos[i]) {
          positionArrayX = positionArrayX.concat(positionVal[0]);
          positionArrayY = positionArrayY.concat(positionVal[1]);
        }
      }
      const attackPositionCheck =
        positionArrayX.includes(attackPos[0]) &&
        positionArrayY.includes(attackPos[1]);

      if (attackPositionCheck) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  return { length, hit };
};

module.exports = { shipFactory };
