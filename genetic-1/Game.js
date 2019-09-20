const lifeSpan = 400;
const popSize = 500;
let target;


class Game {
  constructor() {
    this.population = new Population();
    this.bricks = new Bricks();
    this.target = createVector(width / 2, 50);
    target = createVector(width / 2, 50);
    this.count = 0;
  }
  run() {
    background(0);
    this.count++;
    if (this.count == lifeSpan) {
      this.population.evaluate();
      this.population.selection();
      this.count = 0;
    }
    this.population.update(this);
    this.population.draw(this);
    this.bricks.draw();
    ellipse(this.target.x, this.target.y, 16, 16)
  }

  mousePressed(event) {
    this.mouseStartX = event.clientX;
    this.mouseStartY = event.clientY;
  }

  mouseReleased(event) {
    const mx = event.clientX;
    const my = event.clientY;
    const posX = Math.min(mx, this.mouseStartX);
    const posY = Math.min(my, this.mouseStartY);
    const width =	Math.abs(mx - this.mouseStartX);
    const height = Math.abs(my - this.mouseStartY);
    this.bricks.add(posX, posY, width, height)
  }
}