// let me get text and all
let totalInfectedNumber = 0;
let quarantinedNumberPop = 0;

const totalPopulationContainer = document.getElementById("totalPopulation");
const initialCase = document.getElementById("initialCase");
const totalInfected = document.getElementById("totalInfected");
const quarantinedVal = document.getElementById("theyareQuarantinedNumbers");

let borders = [];
let agents = [];
let maxIteration = 0;
let currentBorder, firstPosX, firstPosY, secondPosX, secondPosY;
const totalPopulation = 20;
const initialTotalInfected = 1;
totalPopulationContainer.innerHTML = totalPopulation;
initialCase.innerHTML = initialTotalInfected;

function setup() {
  createCanvas(window.innerWidth / 2, window.innerHeight * 0.9);

  agents.push(new Human(100, height / 2, true));

  while (agents.length < totalPopulation - initialTotalInfected) {
    let overlapping = false;
    const newHuman = new Human(random(width * 0.2, width), random(0, height));
    for (let j = 0; j < agents.length; j++) {
      const otherHuman = agents[j];
      if (otherHuman.detectCollision(newHuman)) {
        overlapping = true;
        break;
      } else {
        overlapping = false;
      }
    }

    if (!overlapping) {
      agents.push(newHuman);
    }

    maxIteration++;
    if (maxIteration > 10000) {
      break;
    }
  }
}

function draw() {
  background(0);

  if (currentBorder) {
    currentBorder.show();
  }

  for (let i = 0; i < agents.length; i++) {
    agents[i].show();
    agents[i].update();
    if (agents[i].infected) {
      totalInfectedNumber++;
    }
    if (agents[i].inQuarantine) {
      quarantinedNumberPop++;
    }
  }
  totalInfected.innerHTML = totalInfectedNumber;
  totalInfectedNumber = 0;

  quarantinedVal.innerHTML = quarantinedNumberPop;
  quarantinedNumberPop = 0;

  for (let i = 0; i < borders.length; i++) {
    if (borders[i].color == "red") {
      borders.splice(i, 1);
      continue;
    }
    borders[i].show();

    for (let j = 0; j < agents.length; j++) {
      if (borders[i].checkCollision(agents[j])) {
        agents[j].reverseDirection();
      }
    }
  }

  // we need to handle the collision between two balls!
  for (let i = 0; i < agents.length; i++) {
    for (let j = i + 1; j < agents.length; j++) {
      if (agents[i].detectCollision(agents[j])) {
        if (agents[i].infected || agents[j].infected) {
          agents[i].infected = true;
          agents[j].infected = true;
        }
        // console.log(-1 * agents[i].vel.x, -1 * agents[i].vel.y);
        agents[i].reverseDirection();
        agents[j].reverseDirection();
        // agents[j].reverseDirection();
      }
    }
  }
}

function mousePressed() {
  firstPosX = mouseX;
  firstPosY = mouseY;
}

function mouseReleased() {
  if (currentBorder) {
    borders.push(currentBorder);

    for (let j = 0; j < agents.length; j++) {
      {
        currentBorder.checkQuarantine(agents[j]);
      }
    }
  }
  currentBorder = null;
}

function mouseDragged() {
  secondPosX = mouseX;
  secondPosY = mouseY;

  // this is where I check whether the current border collides with remaining border or not
  currentBorder = new Border(firstPosX, firstPosY, secondPosX, secondPosY);

  for (let i = 0; i < borders.length; i++) {
    borders[i].checkIntersection(currentBorder);
  }
}
