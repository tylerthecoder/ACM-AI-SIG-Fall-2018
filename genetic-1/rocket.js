class Rocket {
  constructor(dna,game) {
    this.pos = createVector(width/2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = dna || new DNA();
    this.reachedTarget = false;
    this.hitBad = false;
    this.thrustNum = 0;
    this.game = game
  }

  applyForce(force) {
    this.acc.add(force)
  }

  update(game) {

    if (!this.reachedTarget && !this.hitBad) {
      this.applyForce(this.dna.genes[game.count]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.thrustNum++;
    }

    if (dist(this.pos.x, this.pos.y, game.target.x, game.target.y) < 10) {
      this.reachedTarget = true;
    }

    const hitBox = game.bricks.intersect(this.pos.x,this.pos.y,10,50);
    if (hitBox) {
      this.hitBad = true;
    }
  }

  draw() {
    push();
    noStroke();
    fill(255, 100);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0,0,50,10,100);
    pop();
  }

  get fitness () {
    let fit;
    if (this.reachedTarget) {
      // try to make them use as little thrust as possible
      fit = 2 * (lifeSpan / this.thrustNum);
      fit *= 5;
    } else {
      // if you didn't make it to the target, the more thrust you use the better
      const d = dist(this.pos.x, this.pos.y, target.x, target.y);
      fit =  1 / ( d ** 2);
      if (this.hitBad) fit *= .2;
    }
    return fit;
  }

}