import { shipFactory } from "../shipFactoryNew";

it("tests if the ship has sunk", () => {
  const ship = shipFactory({ orientation: "horizontal", length: 4 });
  ship.shipDamagedPosition = [true, true, true, true];
  expect(ship.isSunk()).toBe(true);
});
