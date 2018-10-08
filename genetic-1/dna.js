class DNA {
  constructor () {
    this.genes = [];
    for (let i = 0; i < lifeSpan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.1);
    }
  }

  crossOver(partner) {
    const newDna = new DNA();
    const midPoint = Math.floor(random(this.genes.length))
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midPoint) {
        newDna.genes[i] = this.genes[i];
      } else {
        newDna.genes[i] = partner.genes[i];
      }
    }
    return newDna;
  }

  mutate () {
    for (const i in this.genes) {
      if (Math.random() < 0.01) {
        this.genes[i] = p5.Vector.random2D().setMag(0.1);
      }
    }
  }


}