class Drawing {
  constructor() {
    this.dna = new Dna(sw/5 , sh/5);
    console.log(this.dna);
  }


  mate(other, mutationRate) {
    const child = new Drawing();
    child.dna = this.dna.crossOver(other.dna);
    child.dna.mutate(mutationRate);
  }
}