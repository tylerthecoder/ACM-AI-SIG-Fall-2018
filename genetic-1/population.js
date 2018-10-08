class Population {
  constructor () {
    this.rockets = [];
    for (let i = 0; i < popSize; i++) {
      this.rockets.push(new Rocket());
    }

    this.lifePara = createP();

    this.matingPool = [];
  }

  update(game) {
    for (const rocket of this.rockets) {
      rocket.update(game);
    }
  }

  draw(game) {
    for (const rocket of this.rockets) {
      rocket.draw();
    }
    this.lifePara.html(game.count)
  }

  evaluate () {

    this.matingPool = [];

    let maxFit = 0;
    for (const rocket of this.rockets) {
      if (rocket.fitness > maxFit) {
        maxFit = rocket.fitness;
      }
    }

    for (const rocket of this.rockets) {
      const n = Math.floor((rocket.fitness / maxFit) * 100)
      for (let i = 0; i < n; i++) {
        this.matingPool.push(rocket);
      }
    }
  }

  selection () {
    const newRockets = [];
    for (let i = 0; i < popSize; i++) {
      const parentA = random(this.matingPool).dna;
      const parentB = random(this.matingPool).dna;
      const child = parentA.crossOver(parentB);
      child.mutate();
      newRockets[i] = new Rocket(child);
    }

    this.rockets = newRockets;

  }

}