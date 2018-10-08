class Bricks {
  constructor() {
    this.bricks = [];
  }

  add (x, y, w, h) {
    this.bricks.push({
      x,
      y,
      w,
      h
    });
  }

  draw () {
    for (const brick of this.bricks) {
      fill(200);
      rect(brick.x, brick.y, brick.w, brick.h);
    }
  }

  intersect(x, y, w, h) {
    let ans = false
    for (const brick of this.bricks) {
      if (brick.x + brick.w > x       &&
          brick.x           < x + w   &&
          brick.y + brick.h > y       &&
          brick.y           < y + h) {
            ans = true;
      }
    }
    return ans;
  }
}