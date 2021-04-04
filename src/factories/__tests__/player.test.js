import playerFactory from "../playerFactory";

it("tests if the makeRandomTurn works successfully", () => {
  const playerTest = playerFactory();

  expect(playerTest.makeRandomTurn()).toEqual(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    })
  );
});
