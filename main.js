class Alien {
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

class Queen extends Alien {
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

class Worker extends Alien {
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

class Drone extends Alien {
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

class MotherShip {
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

const updateAlien = (id, hitPoints, opacity, isAlive) => {
  const targetAlienElement = document.getElementById(id);
  const message = isAlive ? `Energy: ${hitPoints}` : " on sabbatical";
  targetAlienElement.getElementsByTagName("span")[1].innerText = message;
  targetAlienElement.getElementsByTagName("img")[0].style.opacity = opacity;
  targetAlienElement.style.color = isAlive ? "white" : "red";
};

const updateGameStatus = isGameOver => {
  document.getElementById("fire-button").disabled = isGameOver;
  document.getElementById("game-over").innerText = isGameOver ? "Game is over" : "Game on!";
  document.getElementById("game-over").style.color = isGameOver ? "red" : "white";
};

const generateAliens = () => {
  let html = `<li id="queen"><span></span><span></span><img src="./images/jenna.jpg" alt=""></li>`;

  for (let i = 0; i < Worker.initialObjectNum; i++)
    html += `<li id="worker${i}"><span></span><span></span><img src="./images/shea.jpg" alt=""></li>`;

  for (let i = 0; i < Drone.initialObjectNum; i++)
    html += `<li id="drone${i}"><span></span><span></span><img src="./images/ollie.jpg" alt=""></li>`;

  document.getElementsByClassName("grid")[0].innerHTML = html;
};

const fire = () => {
  const targetAlien = ship.fire();
  updateAlien(
    targetAlien.id,
    targetAlien.currentHitPoints,
    targetAlien.currentHitPointPct,
    targetAlien.isAlive
  );
  if (ship.isGameOver) updateGameStatus(true);
};

const start = () => {
  ship = new MotherShip();
  generateAliens();
  ship.aliens.forEach(alien => updateAlien(alien.id, alien.currentHitPoints, 1, true));
  updateGameStatus(false);
};

start();
