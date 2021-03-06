it("AI does not pick at the same coordinate twice", () => {
  expect(player([3, 2])).toBe(false);
});
