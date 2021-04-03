import playerFactory from "../playerFactory";

it("tests if setIsAI works successfully", () => {
  const playerTest = playerFactory();
  expect(playerTest.setIsAITurn(true)).toBe(true);
  // playerTest.isAITurn = true;
  expect(playerTest.isAITurn).toBe(true);
});

it("tests if the makeRandomTurn works successfully", () => {
  const playerTest = playerFactory();
  expect(playerTest.setIsAITurn(true)).toBe(true);
  // playerTest.isAITurn = true;
  expect(playerTest.makeRandomTurn()).toEqual(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    })
  );
});
