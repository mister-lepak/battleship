const playerFactory = () => {
  const makeRandomTurn = (inputX, inputY, sizeX = 10, sizeY = 10) => {
    const x = inputX || Math.floor(Math.random() * sizeX);
    const y = inputY || Math.floor(Math.random() * sizeY);
    return { x, y };
  };

  return { makeRandomTurn };
};

export default playerFactory;
