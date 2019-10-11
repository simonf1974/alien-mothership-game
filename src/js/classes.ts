export abstract class Alien {
  currentHitPoints: number = 0;
  hitPointReducAmt: number = 0;
  startingHitpoints: number = 0;
  isQueen: boolean = false;
  id: string = "";
  static initialObjectNum: number = 0;

  hit(): number {
    this.currentHitPoints = Math.max(this.currentHitPoints - this.hitPointReducAmt, 0);
    return this.currentHitPoints;
  }

  get isAlive(): boolean {
    return this.currentHitPoints > 0;
  }

  get currentHitPointPct(): number {
    if (this.currentHitPoints === 0) return 0.1;
    else return this.currentHitPoints / this.startingHitpoints;
  }

  static createNewObjects(): Alien[] {
    const objects: Alien[] = [];
    for (let i: number = 0; i < this.initialObjectNum; i++) {
      objects.push(this.createNewObject(i));
    }
    return objects;
  }

  static createNewObject(num: number): Alien {
    return;
  }
}

export class Queen extends Alien {
  startingHitpoints: number = 80;
  hitPointReducAmt: number = 7;
  isQueen: boolean = true;
  static initialObjectNum: number = 1;

  constructor(num: number) {
    super();
    this.id = "queen";
    this.currentHitPoints = this.startingHitpoints;
  }

  static createNewObject(num: number): Queen {
    return new Queen(num);
  }
}

export class Worker extends Alien {
  startingHitpoints: number = 68;
  hitPointReducAmt: number = 10;
  static initialObjectNum: number = 5;

  constructor(num: number) {
    super();
    this.id = "worker" + num;
    this.currentHitPoints = this.startingHitpoints;
  }

  static createNewObject(num: number): Worker {
    return new Worker(num);
  }
}

export class Drone extends Alien {
  startingHitpoints: number = 60;
  hitPointReducAmt: number = 12;
  static initialObjectNum: number = 8;

  constructor(num: number) {
    super();
    this.id = "drone" + num;
    this.currentHitPoints = this.startingHitpoints;
  }

  static createNewObject(num: number): Drone {
    return new Drone(num);
  }
}

export class MotherShip {
  public aliens: Alien[];
  public isGameOver: boolean;

  constructor() {
    this.aliens = []
      .concat(Queen.createNewObjects())
      .concat(Worker.createNewObjects())
      .concat(Drone.createNewObjects());
    this.isGameOver = false;
  }

  fire(): Alien {
    if (this.isGameOver) throw Error("Game is over. You should not be calling this method");

    const alienToTarget: Alien = this.aliveAliens[
      Math.floor(Math.random() * this.aliveAliens.length)
    ];
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

  get aliveAliens(): Alien[] {
    return this.aliens.filter(alien => {
      return alien.isAlive;
    });
  }
}
