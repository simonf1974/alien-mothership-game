import { MotherShip, Drone, Worker, Alien } from "./classes";

const updateAlien = (id: string, hitPoints: number, opacity: number, isAlive: boolean): void => {
  const targetAlienElement: HTMLElement = document.getElementById(id);
  const message: string = isAlive ? `Energy: ${hitPoints}` : " on sabbatical";
  targetAlienElement.getElementsByTagName("span")[1].innerText = message;
  targetAlienElement.getElementsByTagName("img")[0].style.opacity = opacity.toString();
  targetAlienElement.style.color = isAlive ? "white" : "red";
};

const updateGameStatus = (isGameOver: boolean): void => {
  const button: HTMLButtonElement = document.getElementById("fire-button") as HTMLButtonElement;
  button.disabled = isGameOver;
  document.getElementById("game-over").innerText = isGameOver ? "Game is over" : "Game on!";
  document.getElementById("game-over").style.color = isGameOver ? "red" : "white";
};

const fire = () => {
  const targetAlien: Alien = ship.fire();
  updateAlien(
    targetAlien.id,
    targetAlien.currentHitPoints,
    targetAlien.currentHitPointPct,
    targetAlien.isAlive
  );
  if (ship.isGameOver) updateGameStatus(true);
};

let ship: MotherShip;

const generateAliens = (): void => {
  let html: string = `<li id="queen"><span></span><span></span><img src="./images/jenna.jpg" alt=""></li>`;
  for (let i = 0; i < Worker.initialObjectNum; i++)
    html += `<li id="worker${i}"><span></span><span></span><img src="./images/shea.jpg" alt=""></li>`;
  for (let i = 0; i < Drone.initialObjectNum; i++)
    html += `<li id="drone${i}"><span></span><span></span><img src="./images/ollie.jpg" alt=""></li>`;
  document.getElementsByClassName("grid")[0].innerHTML = html;
};

const start = (isFirstInit: boolean): void => {
  ship = new MotherShip();
  if (isFirstInit) {
    document.getElementById("fire-button").addEventListener("click", fire);
    document.getElementById("restart-button").addEventListener("click", () => {
      start(false);
    });
    generateAliens();
  }
  ship.aliens.forEach(alien => updateAlien(alien.id, alien.currentHitPoints, 1, true));
  updateGameStatus(false);
};

start(true);
