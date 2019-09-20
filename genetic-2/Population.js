const popSize = 25;

class Population {
  constructor() {
    this.drawings = [];
    for (let i = 0; i < popSize; i++) {
      this.drawings.push(new Drawing());
    }

    this.selections = new Set();
  }

  clicked (event) {
    const clickedX = Math.floor(event.clientX / (sw/Math.sqrt(popSize)));
    const clickedy = Math.floor(event.clientY / (sh/Math.sqrt(popSize)));
    if (clickedX > 4 || clickedy > 4) return false;
    const tag = `${clickedX}:${clickedy}`;
    if (this.selections.has(tag)) {
      this.selections.delete(tag)
    } else if (this.selections.size < 5){
      this.selections.add(tag);
    }
  }

  draw() {
    noFill()
    strokeWeight(4);
    for (let i = 0; i < Math.sqrt(popSize); i++) {
      stroke(255)
      const size = sw / Math.sqrt(popSize);
      line(i*size, 0, i*size, sh);
      line(0,i*size,sw,i*size);
    }
    strokeWeight(3);
    this.drawings.forEach((drawing, index) => {
      const ox = (index % 5) * (sw/5);
      const oy = ((index - index % 5)/5) * (sh/5);
      const tag = `${ox/(sw/5)}:${oy/(sh/5)}`;
      if(this.selections.has(tag)) {
        fill(255,255,0);
        noStroke();
        rect(ox,oy,sw/5,sh/5);
        noFill();
      }
      drawing.draw(ox, oy);
    })
  }

  nextGen() {
    if (this.selections.size <= 0) return
    const matingpool = [];
    const nextGen = [];
    for (const tag of this.selections.keys()) {
      const cords = tag.split(":");
      const index = cords[1]*5 + +cords[0];

      // add this to the mating pool twice
      for (let i = 0; i < 4; i++) {
        matingpool.push(this.drawings[index]);
      }

      // add your favorites to the generation
      nextGen.push(this.drawings[index]);
    }

    // add five people to mating pool from last generation
    for (let i = 0; i < 3; i++) {
      const rndEle = random(this.drawings);
      matingpool.push(rndEle);
    }

    const oldLength = this.selections.size;
    this.selections.clear();

    for (let i = 0, j = 1; i < 15; i++, j+=.1) {
      const parent1 = random(matingpool);
      const parent2 = random(matingpool);
      const child = parent1.mate(parent2, j);
      nextGen.push(child);
    }

    for (let i = 0; i < 5 + (5-oldLength); i++) {
      nextGen.push(new Drawing());
    }

    this.drawings = nextGen;
  }

}