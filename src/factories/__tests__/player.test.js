import { player } from "../playerFactory";

it("AI choose random value", () => {
  expect(player("AI").randomAttack()).not.toBeNull();
});

it("make player's turns active", () => {
  expect(player("user").makeTurnsActive()).toBe(true);
});

it("checks if locks gameBoard returns true", () => {
  expect(player("AI").lockGameboard()).toBe(true);
});
