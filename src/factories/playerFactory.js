const playerFactory = () => {
  let isAITurn = false;
  const setIsAITurn = (value) => {
    isAITurn = value;
    console.log(isAITurn);
    return isAITurn;
  };
  const makeRandomTurn = (sizeX = 10, sizeY = 10) => {
    if (isAITurn) {
      const x = Math.floor(Math.random() * sizeX);
      const y = Math.floor(Math.random() * sizeY);
      return { x, y };
    }
  };

  return { isAITurn, makeRandomTurn, setIsAITurn };
};

export default playerFactory;
