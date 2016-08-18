const Snake = require('./snake.js');

class Board {
  constructor(dim) {
    this.snake = new Snake();
    this.grid = this.makeGrid(dim);
    this.dim = dim;
    this.apple = null;
    this.score = -1;
    this.placeApple();
  }

  makeGrid(dim) {
    const grid = [];
    for (let i = 0; i < dim; i++) {
      let row = [];
      for (var j = 0; j < dim; j++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  placeApple() {
    let apple = null;
    while (!apple || this.snake.includesPosition(apple)) {
      let row = Math.floor(Math.random() * this.dim);
      let col = Math.floor(Math.random() * this.dim);
      apple = [row, col];
    }
    this.apple = apple;
    this.score++;
  }

  gameOver(){
    const head = this.snake.gridCords[0];

    if(head[0] < 0 || head[0] >= this.dim || head[1] < 0 || head[1] >= this.dim ){
      return true;
    } else if (this.snake.ranIntoSelf()) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Board;
