const shipFactory = (length, orientation, startPos, damagedPos, sunk) => {
  const hit = (inputPos) => {
    if (sunk) return false;

    const relativeHitPos = [
      inputPos[0] - startPos[0],
      inputPos[1] - startPos[1],
    ];
    const orientationAxis = orientation === "horizontal" ? 0 : 1;
    const staticAxis = 1 - orientationAxis;
    if (relativeHitPos[staticAxis] !== 0) return false;

    const orientationPos = relativeHitPos[orientationAxis];
    if (orientationPos < 0 || orientationPos >= length) return false;

    const isAlreadyDamaged = damagedPos[orientationPos];
    damagedPos[orientationPos] = true;

    return !isAlreadyDamaged;
  };

  const isSunk = () => {};
  return { length, hit };
};

module.exports = { shipFactory };
