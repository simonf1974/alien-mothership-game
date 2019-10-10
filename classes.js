export class Alien {
  currentHitPoints = 0;
  hitPointReducAmt = 0;
  startingHitpoints = 0;
  isQueen = false;
  id = "";
  static initialObjectNum = 0;

  hit() {
    this.currentHitPoints = Math.max(this.currentHitPoints - this.hitPointReducAmt, 0);
    return this.currentHitPoints;
  }

  get isAlive() {
    return this.currentHitPoints > 0;
  }

  static createNewObjects() {
    const objects = [];
    for (let i = 0; i < this.initialObjectNum; i++) {
      objects.push(this.createNewObject(i));
    }
    return objects;
  }

  get currentHitPointPct() {
    if (this.currentHitPoints === 0) return 0.1;
    else return this.currentHitPoints / this.startingHitpoints;
  }
}

export class Queen extends Alien {
  startingHitpoints = 80;
  hitPointReducAmt = 7;
  isQueen = true;
  static initialObjectNum = 1;

  constructor(num) {
    super();
    this.id = "queen";
    this.currentHitPoints = this.startingHitpoints;
  }

  static createNewObject(num) {
    return new Queen(num);
  }
}

export class Worker extends Alien {
  startingHitpoints = 68;
  hitPointReducAmt = 10;
  static initialObjectNum = 5;

  constructor(num) {
    super();
    this.id = "worker" + num;
    this.currentHitPoints = this.startingHitpoints;
  }

  static createNewObject(num) {
    return new Worker(num);
  }
}

export class Drone extends Alien {
  startingHitpoints = 60;
  hitPointReducAmt = 12;
  static initialObjectNum = 8;

  constructor(num) {
    super();
    this.id = "drone" + num;
    this.currentHitPoints = this.startingHitpoints;
  }

  static createNewObject(num) {
    return new Drone(num);
  }
}

export class MotherShip {
  constructor() {
    this.aliens = []
      .concat(Queen.createNewObjects())
      .concat(Worker.createNewObjects())
      .concat(Drone.createNewObjects());
    this.isGameOver = false;
  }

  fire() {
    if (this.isGameOver) throw Error("Game is over. You should not be calling this method");

    const alienToTarget = this.aliveAliens[Math.floor(Math.random() * this.aliveAliens.length)];
    alienToTarget.hit();

    if (alienToTarget.isAlive) {
      this.isGameOver = false;
    } else if (alienToTarget.isQueen) {
      this.isGameOver = true;
    } else {
      this.isGameOver = this.aliveAliens.length === 0;
    }

    return alienToTarget;
  }

  get aliveAliens() {
    return this.aliens.filter(alien => {
      return alien.isAlive;
    });
  }
}
