import { MotherShip } from "./classes";

describe("These are my class tests", () => {
  let ship;
  beforeEach(() => {
    ship = new MotherShip();
  });

  test("Check initialisation of ship", () => {
    expect(ship.aliens.length).toEqual(14);
    console.log(ship.aliens);
    // expect(ship.getAliveAliens.length).toEqual(14);
  });
});
