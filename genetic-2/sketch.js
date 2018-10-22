let game;

let population

const sw = 900;
const sh = 900;


function setup() {
  createCanvas(sw,sh);


  population = new Population();

  const button = createButton('Next Generation');
  button.mousePressed(getNextGen);
}

function draw() {
  background(0);

  population.draw();
}

function mouseClicked(event) {
  population.clicked(event);
}

function getNextGen() {
  population.nextGen();
}