class Human {
  constructor(x = width / 2, y = height / 2, infected = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D();
    this.infected = infected;
    this.size = 20;
    this.inQuarantine = false;
  }

  show = () => {
    push();
    if (this.infected) {
      fill(255, 0, 0);
    } else {
      fill(0, 0, 255);
    }
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.size, this.size);
    pop();
  };

  update = () => {
    if (!this.inQuarantine) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.checkBorder();
      this.acc.mult(0);
    }
  };

  detectCollision = (target) => {
    if (
      dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y) <= target.size
    ) {
      return true;
    }
  };

  checkBorder = () => {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.reverseDirection(true, false);
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.reverseDirection(false, true);
    }
  };

  reverseDirection = (x = true, y = true) => {
    if (x) {
      this.vel = createVector(-1 * this.vel.x, this.vel.y);
    }
    if (y) {
      this.vel = createVector(this.vel.x, -1 * this.vel.y);
    }
  };
}
