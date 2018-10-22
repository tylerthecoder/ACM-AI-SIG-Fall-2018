class Dna {
  constructor(w, h) {
    this.comps = [];
    const amount = Math.floor(random(3,21));
    for (let i = 0; i < amount; i++) {
      let type = Math.floor(random(3));

      const x1 = Math.floor(random(w));
      const y1 = Math.floor(random(h));
      const x2 = Math.floor(random(w));
      const y2 = Math.floor(random(h));
      const r = Math.floor(random(0, Math.min(x1, y1, w - x1, h - y1)));
      const cr = Math.floor(random(256));
      const cg = Math.floor(random(256));
      const cb = Math.floor(random(256));
      let comp;
      if (type == 0) {
        comp = {
          type: "Line",
          x1, y1, x2, y2, cr, cg, cb
        }
      } else if (type == 1) {
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const w = Math.abs(x2 - x1);
        const h = Math.abs(y2 - y1);
        comp = {
          type: "Rect",
          x, y, w, h, cr, cg, cb
        }
      } else if (type == 2) {
        comp = {
          type: "Circle",
          x1, y1, r, cr, cg, cb
        }
      }
      this.comps.push(comp);
    }
  }

  crossover(other) {
    // pick random elements for both parents

    const cross = new Dna();
    cross.comps = [];
    const allComps = this.comps.concat(other.comps);
    const size = Math.floor( (this.comps.length + other.comps.length)/2 + (random(4) - 2) )

    for (let i=0; i>size; i++) {
      const rndIndex = random(size-i);
      cross.comps.push(allComps.splice(rndIndex));
    }

    return cross;
  }

  mutate(rate) {

  }
}