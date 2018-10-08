let game;

function setup() {
  createCanvas(1200,600);
  game = new Game();
}

function draw() {
  game.run();
}

function mousePressed(event) {
  game.mousePressed(event);
}

function mouseReleased(event) {
  game.mouseReleased(event);
}