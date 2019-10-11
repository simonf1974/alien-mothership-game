import { MotherShip } from "./classes";

describe("These are my class tests", () => {
  let ship: MotherShip;
  beforeEach(() => {
    ship = new MotherShip();
  });

  const fire = (numOfFires: number, indexOfAlien: number, ship: MotherShip): void => {
    global.Math.random = () => indexOfAlien / ship.aliveAliens.length;
    for (let i = 0; i < numOfFires; i++) {
      ship.fire();
    }
  };

  test("Check firing on Queen and killing her", () => {
    expect(ship.aliens.length).toEqual(14);
    expect(ship.aliveAliens.length).toEqual(14);

    global.Math.random = () => 0.0714285714285714;
    fire(1, 0, ship);
    expect(ship.aliveAliens.length).toEqual(14);
    expect(ship.aliens[0].currentHitPoints).toEqual(73);
    fire(1, 0, ship);
    expect(ship.aliveAliens.length).toEqual(14);
    expect(ship.aliens[0].currentHitPoints).toEqual(66);
    fire(8, 0, ship);
    expect(ship.aliveAliens.length).toEqual(14);
    expect(ship.aliens[0].currentHitPoints).toEqual(10);
    fire(1, 0, ship);
    expect(ship.aliveAliens.length).toEqual(14);
    expect(ship.aliens[0].currentHitPoints).toEqual(3);
    expect(ship.aliens[0].isAlive).toEqual(true);
    expect(ship.isGameOver).toEqual(false);
    fire(1, 0, ship);
    expect(ship.aliveAliens.length).toEqual(13);
    expect(ship.aliens[0].currentHitPoints).toEqual(0);
    expect(ship.aliens[0].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(true);
  });

  test("Check firing on all aliens except queen", () => {
    // worker0
    expect(ship.aliveAliens.length).toEqual(14);
    expect(ship.aliens[1].currentHitPoints).toEqual(68);
    fire(6, 1, ship);
    expect(ship.aliveAliens.length).toEqual(14);
    expect(ship.aliens[1].currentHitPoints).toEqual(8);
    expect(ship.aliens[1].isAlive).toEqual(true);
    expect(ship.isGameOver).toEqual(false);
    fire(1, 1, ship);
    expect(ship.aliveAliens.length).toEqual(13);
    expect(ship.aliens[1].currentHitPoints).toEqual(0);
    expect(ship.aliens[1].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);

    // worker1
    fire(7, 1, ship);
    expect(ship.aliveAliens.length).toEqual(12);
    expect(ship.aliens[2].currentHitPoints).toEqual(0);
    expect(ship.aliens[2].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);

    // worker2
    fire(7, 1, ship);
    expect(ship.aliveAliens.length).toEqual(11);
    expect(ship.aliens[3].currentHitPoints).toEqual(0);
    expect(ship.aliens[3].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);

    // worker3
    fire(7, 1, ship);
    expect(ship.aliveAliens.length).toEqual(10);
    expect(ship.aliens[4].currentHitPoints).toEqual(0);
    expect(ship.aliens[4].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);

    // worker4
    fire(7, 1, ship);
    expect(ship.aliveAliens.length).toEqual(9);
    expect(ship.aliens[5].currentHitPoints).toEqual(0);
    expect(ship.aliens[5].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);

    //drone0
    expect(ship.aliens[6].currentHitPoints).toEqual(60);
    fire(4, 1, ship);
    expect(ship.aliveAliens.length).toEqual(9);
    expect(ship.aliens[6].currentHitPoints).toEqual(12);
    expect(ship.aliens[6].isAlive).toEqual(true);
    expect(ship.isGameOver).toEqual(false);
    fire(1, 1, ship);
    expect(ship.aliveAliens.length).toEqual(8);
    expect(ship.aliens[6].currentHitPoints).toEqual(0);
    expect(ship.aliens[6].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);

    fire(5, 1, ship);
    fire(5, 1, ship);
    fire(5, 1, ship);
    fire(5, 1, ship);
    fire(5, 1, ship);

    fire(5, 1, ship);
    expect(ship.aliveAliens.length).toEqual(2);
    expect(ship.aliens[12].currentHitPoints).toEqual(0);
    expect(ship.aliens[12].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);

    fire(5, 1, ship);
    expect(ship.aliveAliens.length).toEqual(1);
    expect(ship.aliens[13].currentHitPoints).toEqual(0);
    expect(ship.aliens[13].isAlive).toEqual(false);
    expect(ship.isGameOver).toEqual(false);
  });
});
