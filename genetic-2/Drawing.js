class Drawing {
  constructor() {
    this.dna = new Dna(sw/5 , sh/5);
    // console.log(this.dna);
  }

  draw(ox, oy) {
    for (const comp of this.dna.comps) {
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
    child.dna = this.dna.crossover(other.dna);
    // child.dna.mutate(mutationRate);
    return child;
  }
}