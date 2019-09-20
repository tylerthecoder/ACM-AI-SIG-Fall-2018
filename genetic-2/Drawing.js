class Drawing {
  constructor() {
    this.w = sw/5;
    this.h = sh/5;
    this.dna = [];
    const amount = Math.floor(random(3,21));
    for (let i = 0; i < amount; i++) {
      this.dna.push(this.makeRandomComponent());
    }
  }

  draw(ox, oy) {
    for (const comp of this.dna) {
      stroke(comp.cr, comp.cg, comp.cb);
      if (comp.type === "Line") {
        line(comp.x1+ox, comp.y1+oy, comp.x2+ox, comp.y2+oy);
      } else if (comp.type === "Circle") {
        ellipse(comp.x+ox, comp.y+oy, comp.r, comp.r);
      } else if (comp.type === "Rect") {
        rect(comp.x+ox, comp.y+oy, comp.w, comp.h);
      }
    }
  }

  mate(other, mutationRate) {
    const child = new Drawing();
    child.dna = this.crossover(other);
    child.mutate(mutationRate);
    return child;
  }

  crossover(other) {
    // pick random elements for both parents

    console.log("crossover");

    const amountToTake1 = Math.floor((Math.random() * .5 + .5) * this.dna.length);
    const shuffled1 = this.dna.sort(() => .5 - Math.random());

    const amountToTake2 = Math.floor((Math.random() * .5 + .5) * other.dna.length);
    const shuffled2 = other.dna.sort(() => .5 - Math.random());

    return [].concat(shuffled1.slice(0, amountToTake1))
             .concat(shuffled2.slice(0, amountToTake2));
  }

  mutate(rate) {
    let numOfNewEles = 0;
    this.dna.map(comp => {
      if (Math.random() < .05 * rate) {
        // mutate em
        const type = Math.floor(random(4));
        if (type === 0) { // change position
          if (comp.type === "Line") {
            comp.x1 = constrain(comp.x1 + random(-5,5), 0, this.w);
            comp.x2 = constrain(comp.x2 + random(-5,5), 0, this.w);
            comp.y1 = constrain(comp.y1 + random(-5,5), 0, this.h);
            comp.y2 = constrain(comp.y2 + random(-5,5), 0, this.h);
          } else if (comp.type === "Rect") {
            comp.x = constrain(comp.x + random(-5,5), 0, this.w-5);
            comp.y = constrain(comp.y + random(-5,5), 0, this.h-5);
            comp.w = constrain(comp.w + random(-5, 5), 0,  this.w - comp.x);
            comp.h = constrain(comp.h + random(-5, 5), 0,  this.h - comp.y);
          }
          return comp;
        } else if (type === 1) {
          return this.makeRandomComponent();
        } else if (type === 2) { // delete
          return false;
        } else if (type === 3) {
          numOfNewEles++;
        }
      }
    }).filter(x => x !== false)

    while (numOfNewEles > 0) {
      this.dna.push(this.makeRandomComponent());
      numOfNewEles--;
    }
  }

  makeRandomLine() {
    const x1 = Math.floor(random(this.w));
    const y1 = Math.floor(random(this.h));
    const x2 = Math.floor(random(this.w));
    const y2 = Math.floor(random(this.h));
    const cr = Math.floor(random(256));
    const cg = Math.floor(random(256));
    const cb = Math.floor(random(256));
    return {
      type: "Line",
      x1, y1, x2, y2, cr, cg, cb
    }
  }

  makeRandomCircle() {
    const x = Math.floor(random(this.w));
    const y = Math.floor(random(this.h));
    const minDistToEdge = Math.min(x, y, this.w - x, this.h - y);
    const r = Math.floor(random(0, minDistToEdge));
    const cr = Math.floor(random(256));
    const cg = Math.floor(random(256));
    const cb = Math.floor(random(256));
    return {
      type: "Circle",
      x, y, r, cr, cg, cb
    }
  }

  makeRandomRect() {
    const x1 = Math.floor(random(this.w));
    const y1 = Math.floor(random(this.h));
    const x2 = Math.floor(random(this.w));
    const y2 = Math.floor(random(this.h));
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1);
    const h = Math.abs(y2 - y1);
    const cr = Math.floor(random(256));
    const cg = Math.floor(random(256));
    const cb = Math.floor(random(256));
    return {
      type: "Rect",
      x, y, w, h, cr, cg, cb
    }
  }

  makeRandomComponent() {
    const type = Math.floor(random(3));
    if (type === 0) {
      return this.makeRandomLine();
    } else if (type === 1) {
      return this.makeRandomRect();
    } else if (type === 2) {
      return this.makeRandomCircle();
    }
  }
}
