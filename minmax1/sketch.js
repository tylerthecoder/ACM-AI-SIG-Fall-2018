const sw = 900;
const sh = 900;

let board;

function setup() {
  createCanvas(sw,sh);
  board = new Board();
}

function draw() {
  background(0);
  board.draw();

}

function mousePressed(event) {
  if (event.touches) return;
  board.selectSquare(event.clientX, event.clientY);
}