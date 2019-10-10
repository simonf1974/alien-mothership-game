import { MotherShip, Drone, Worker } from "./classes.js";

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

let ship;

const generateAliens = () => {
  let html = `<li id="queen"><span></span><span></span><img src="./images/jenna.jpg" alt=""></li>`;
  for (let i = 0; i < Worker.initialObjectNum; i++)
    html += `<li id="worker${i}"><span></span><span></span><img src="./images/shea.jpg" alt=""></li>`;
  for (let i = 0; i < Drone.initialObjectNum; i++)
    html += `<li id="drone${i}"><span></span><span></span><img src="./images/ollie.jpg" alt=""></li>`;
  document.getElementsByClassName("grid")[0].innerHTML = html;
};

const start = isFirstInit => {
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
