const playerFactory = () => {
  const makeRandomTurn = (sizeX = 10, sizeY = 10) => {
    const x = Math.floor(Math.random() * sizeX);
    const y = Math.floor(Math.random() * sizeY);
    return { x, y };
  };

  return { makeRandomTurn };
};

export default playerFactory;
