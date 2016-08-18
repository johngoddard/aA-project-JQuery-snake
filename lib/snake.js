

class Snake {
  constructor() {
    this.DIR_DELTAS = {'N': [-1, 0], 'S': [1, 0], 'W': [0, -1], 'E': [0, 1]};
    this.OPPOSITE_DIRS = {'N': 'S', 'S':'N', 'E': 'W', 'W': 'E'};
    this.dir = 'N';
    this.gridCords = [[8, 10], [9, 10], [10, 10]];
    this.justAte = false;
    this.latestEnd = null;
  }

  move(apple) {
    this.justAte =false;
    let newPos = this.addMove(this.gridCords[0]);
    this.gridCords.unshift(newPos);

    if (this.includesPosition(apple)) {
      this.justAte = true;
    } else {
      this.latestEnd = this.gridCords.slice(-1).pop();
      this.gridCords.pop();
    }
  }

  addMove(pos) {
    let newPos = [];
    newPos[0] = pos[0] + this.DIR_DELTAS[this.dir][0];
    newPos[1] = pos[1] + this.DIR_DELTAS[this.dir][1];
    return newPos;
  }

  turn(dir) {
    if(dir !== this.OPPOSITE_DIRS[this.dir]){
      this.dir = dir;
    }
  }

  includesPosition(pos){
    let includes = false;
    this.gridCords.forEach(cord => {
      if(cord[0] === pos[0] && cord[1] === pos[1]){
        includes = true;
      }
    });

    return includes;
  }

  ranIntoSelf(){
    const head = this.gridCords[0];

    let collision = false;
    this.gridCords.slice(1).forEach(cord => {
      if(cord[0] === head[0] && cord[1] === head[1]){
        collision = true;
      }
    });

    return collision;
  }
}


module.exports = Snake;
