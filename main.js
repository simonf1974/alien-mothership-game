class Alien {
  currentHitPoints = 0;
  hitPointReducAmt = 0;
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
}

class Queen extends Alien {
  currentHitPoints = 80;
  hitPointReducAmt = 7;
  isQueen = true;
  static initialObjectNum = 1;

  constructor(num) {
    super();
    this.id = "queen";
  }

  static createNewObject(num) {
    return new Queen(num);
  }
}

class Worker extends Alien {
  currentHitPoints = 68;
  hitPointReducAmt = 10;
  static initialObjectNum = 5;

  constructor(num) {
    super();
    this.id = "worker" + num;
  }

  static createNewObject(num) {
    return new Worker(num);
  }
}

class Drone extends Alien {
  currentHitPoints = 60;
  hitPointReducAmt = 12;
  static initialObjectNum = 8;

  constructor(num) {
    super();
    this.id = "drone" + num;
  }

  static createNewObject(num) {
    return new Drone(num);
  }
}

class MotherShip {
  constructor() {
    this.aliens = []
      .concat(Queen.createNewObjects())
      .concat(Worker.createNewObjects())
      .concat(Drone.createNewObjects());
    this.isGameOver = false;
  }

  fire() {
    if (this.isGameOver) throw "Game is over. You should not be calling this method";

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

const fire = () => {
  const targetAlien = ship.fire();
  const message = `is ${targetAlien.isAlive ? "alive" : "dead"} (${targetAlien.currentHitPoints})`;
  document.getElementById(targetAlien.id).getElementsByTagName("span")[0].innerText = message;
  document.getElementById("game-over").innerText = `Game is ${ship.isGameOver ? "" : " not "}over`;
  if (ship.isGameOver) document.getElementById("fire-button").disabled = true;
};

const start = () => {
  ship = new MotherShip();
  ship.aliens.forEach(alien => {
    document
      .getElementById(alien.id)
      .getElementsByTagName("span")[0].innerText = `is alive (${alien.currentHitPoints})`;
  });
  document.getElementById("fire-button").disabled = false;
  document.getElementById("game-over").innerText = "Game is not over";
};

start();
