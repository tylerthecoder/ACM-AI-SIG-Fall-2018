class Board {
  constructor(board) {
    this.turn = (board && board.turn) || "X";
    this.grid = [];
    for (let r = 0; r < 3; r ++) {
      this.grid[r] = [];
      for (let c = 0; c < 3; c++) {
        if (board) {
          this.grid[r][c] = board.grid[r][c];
        } else {
          this.grid[r][c] = 0;
        }
        this.grid[r][c] = 0;
      }
    }
  }

  changeTurn() {
    this.turn = this.turn == "X" ? "O":"X";
    if (this.turn == "O") {
      // check all possible placements
      const moves = [];
      for (let r = 0; r < 3; r ++) {
        for (let c = 0; c < 3; c++) {
          if (this.grid[r][c] !== 0) {
            moves.push([r,c]);
          }
        }
      }

      let bestMove = moves[0];
      let bestScore = 0;
      for (const move in moves) {
        const score = this.evalMove(move);
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }

      console.log(bestMove);

    }
  }


  get score() {

  }

  evalMove(board, [r, c]) {
    // AI goes
    if (board.isWinner(r, c)) {
      if (board.winner === "X") {
        return 10;
      } else if (board.winner == "O") {
        return -10;
      }
    }

    const scores = [];
    const moves = [];


    for (const move of board.getAllMoves()) {
      // const newBoard =
    }
    const newBoard = new Board(this);
    newBoard[r][c] = newBoard.turn;
    if (newBoard.isWinner(r,c)) {
      if (newBoard.winner === "O") {
        return {
          max: Infinity,
          move: [r,c]
        }
      }
    }
    newBoard.changeTurn();

    // check players moves
    let max = 0;
    let move = [];
    const moves = newBoard.getAllMoves();
    for (const move of moves) {
      const [r, c] = move;
      newBoard.grid[r][c] = "X";
      if (newBoard.isWinner(r,c) && newBoard.winner === "X") {
          max = 10;
          move = [r,c]
      }
    }

    return {
      max,
      move,
    }

  }

  getAllMoves () {
    const moves = [];
    for (let r = 0; r < 3; r ++) {
      for (let c = 0; c < 3; c++) {
        if (this.grid[r][c] !== 0) {
          moves.push([r,c]);
        }
      }
    }
    return moves;
  }

  selectSquare(cx, cy) {
    const c = Math.floor(cx / (sw/3));
    const r = Math.floor(cy / (sh/3));
    if (this.grid[r][c] == 0) {
      this.grid[r][c] = this.turn;
      this.changeTurn();
      if (this.isWinner(r,c)) {
        console.log("Winner");
        console.log(this.winner);
      }
    }
  }

  isWinner(r, c) {
    const player = this.grid[r][c];
    console.log({player})
    // cols
    let allSame = true;
    for (let i = 0; i < 3; i++) {
      if (this.grid[r][i] !== player) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      this.winner = player;
      return true;
    }

    // rows
    allSame = true;
    for (let i = 0; i < 3; i++) {
      if (this.grid[i][c] !== player) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      this.winner = player;
      return true;
    }



    if (r == c) {
      allSame = true;
      for (let i = 0; i < 3; i++ ){
        if (this.grid[i][i] !== player) {
          allSame = false;
          break;
        }
      }
    }else if (r+c == 2) {
      allSame = true;
      for (let i = 0; i < 3; i++ ){
        if (this.grid[2-i][i] !== player) {
          allSame = false;
          break;
        }
      }
    }

    if (allSame) {
      this.winner = player;
      console.log("di")
      return true;
    }

    return false;
  }

  draw() {
    strokeWeight(2);
    stroke(255,0,0);
    for (let n = 1; n < 3; n++) {
      line(0, (sh/3) * n, sw, (sh/3) * n);
      line((sw/3) * n, 0, (sw/3) * n, sh);
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.grid[r][c] == "X") {
          this.drawX(c*(sw/3), r*(sh/3), sw/3, sh/3);
        } else if (this.grid[r][c] == "O") {
          this.drawO(c*(sw/3), r*(sh/3), sw/3, sh/3);
        }
      }
    }
  }

  drawX(x,y,w,h) {
    strokeWeight(5);
    stroke(0,255,0);
    line(x, y, x + w, y + h);
    line(x + w, y, x, y + h);
  }

  drawO(x,y,w,h) {
    strokeWeight(5);
    stroke(0,0,255);
    noFill();
    ellipse(x + w/2, y + h/2, w/2, h/2);
  }


}