const checkInBetween = (number, lower, higher) => {
  return number >= lower && number <= higher;
};

class Border {
  constructor(fposX, fposY, sposX, sposY) {
    this.fposX = fposX;
    this.fposY = fposY;
    this.sposX = sposX;
    this.sposY = sposY;
    this.color = "white";
    this.checkDim();
  }

  checkDim = () => {
    if (
      Math.abs(this.fposX - this.sposX) < 10 ||
      Math.abs(this.fposY - this.sposY) < 10
    ) {
      this.color = "red";
      return false;
    }
  };

  show = () => {
    push();
    noFill(255);
    this.checkBorder();
    translate(this.fposX, this.fposY);
    let width = Math.abs(this.fposX - this.sposX);
    let height = Math.abs(this.fposY - this.sposY);

    stroke(this.color);
    strokeWeight(1);
    rect(0, 0, width, height);
    pop();
  };

  checkBorder = (value = this) => {
    if (value.fposX < 0) {
      value.fposX = 0;
    }
    if (value.fposX > width) {
      value.fposX = width;
    }
    if (value.fposY < 0) {
      value.fposY = 0;
    }
    if (value.fposY > height) {
      value.fposY = height;
    }

    if (value.fposX > value.sposX) {
      let temp = value.fposX;
      value.fposX = value.sposX;
      value.sposX = temp;
    }

    if (value.fposY > value.sposY) {
      let temp = value.fposY;
      value.fposY = value.sposY;
      value.sposY = temp;
    }
  };

  checkQuarantine = (target) => {
    if (this.color == "red") {
      return;
    }
    if (this.checkCollision(target)) {
      if (
        Math.abs(this.fposX - target.pos.x) < target.size / 2 ||
        Math.abs(this.sposX - target.pos.x) < target.size / 2 ||
        Math.abs(this.fposY - target.pos.y) < target.size / 2 ||
        Math.abs(this.sposY - target.pos.y) < target.size / 2
      ) {
        const randomX = random(this.fposX + 5, this.sposX - 5);
        const randomY = random(this.fposY + 5, this.sposY - 5);
        target.pos = createVector(randomX, randomY);
      }
      target.inQuarantine = true;
    }
  };

  checkCollision = (target) => {
    let currentXPositionTarget = target.pos.x;
    let currentYPositionTarget = target.pos.y;
    if (
      currentXPositionTarget + target.size / 2 > this.fposX &&
      currentXPositionTarget - target.size / 2 < this.sposX
    ) {
      if (
        currentYPositionTarget + target.size / 2 > this.fposY &&
        currentYPositionTarget - target.size / 2 < this.sposY
      ) {
        return true;
      }
    }
  };

  checkIntersection = (target) => {
    target.checkBorder();
    let x1 = target.fposX,
      y1 = target.fposY,
      x2 = target.sposX,
      y2 = target.sposY;

    if (this.fposX > x1) {
      x1 = this.fposX;
    }
    if (this.fposY > y1) {
      y1 = this.fposY;
    }
    if (this.fposX + (this.sposX - this.fposX) < x2) {
      x2 = this.fposX + (this.sposX - this.fposX);
    }
    if (this.fposY + (this.sposY - this.fposY) < y2) {
      y2 = this.fposY + (this.sposY - this.fposY);
    }

    if (x2 <= x1 || y2 <= y1) {
      return false;
    }
    target.color = "red";

    return true;
  };
}
