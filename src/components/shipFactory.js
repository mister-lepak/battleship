const shipFactory = (length, orientation, startPos, damagedPos, sunk) => {
  const hit = (posX, posY) => {
    if (!sunk) {
    }

    return true;
  };
  return { length, hit };
};

module.exports = { shipFactory };
