import { shipFactory } from "../shipFactoryNew";

it("tests if the ship has sunk", () => {
  let ship = shipFactory({ orientation: "horizontal", length: 4 });
  ship.setShipInitialStatus(true);
  expect(ship.isSunk()).toBe(true);
});

it("tests if the ship has hit successfully in origin", () => {
  let ship = shipFactory({ orientation: "horizontal", length: 4 });
  expect(ship.hit(0, 0)).toBe(true);
});

it("tests if the ship has hit successfully within boundary", () => {
  let ship = shipFactory({ orientation: "horizontal", length: 4 });
  expect(ship.hit(3, 0)).toBe(true);
});

it("tests if the ship hit unsuccessfully (beyond Y-axis boundary)", () => {
  let ship = shipFactory({ orientation: "horizontal", length: 4 });
  expect(ship.hit(0, 2)).toBe(false);
});

it("tests if the ship hit unsuccessfully (beyond X-axis boundary)", () => {
  let ship = shipFactory({ orientation: "horizontal", length: 4 });
  expect(ship.hit(50, 0)).toBe(false);
});

it("tests if the ship hit unsuccessfully (in -ve X-axis boundary)", () => {
  let ship = shipFactory({ orientation: "horizontal", length: 4 });
  expect(ship.hit(-7, 0)).toBe(false);
});
