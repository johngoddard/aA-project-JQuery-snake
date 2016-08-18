/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(1);

	$( () => {
	  const view = new SnakeView($('.game'));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

	class SnakeView {
	  constructor($el) {
	    this.KEY_MAP = {
	      "38": 'N',
	      "37": 'W',
	      "39": 'E',
	      "40": 'S'
	    };

	    this.DIM = 20;

	    this.$el = $el;
	    this.board = null;

	    this.setupBoardView();

	    $el.on('keydown', (event) => {
	      this.handleKeyPress(event);
	    });

	    this.startGame();
	    this.highScore = 0;
	  }

	  startGame(){
	    this.board = new Board(this.DIM);
	    this.$el.focus();
	    $('p').remove();
	    $('.button').remove();
	    $('.button-bottom').remove();


	    this.refreshInt = window.setInterval(() => {
	      if(this.board.gameOver()){
	        this.endGame();
	      } else{
	        this.step();
	      }
	    }, 150);
	  }


	  handleKeyPress(event) {

	    if (Object.keys(this.KEY_MAP).indexOf(event.which.toString()) !== -1) {
	      this.board.snake.turn(this.KEY_MAP[event.which.toString()]);
	    }
	  }

	  endGame(){
	    $('.game').append('<p>Game over!</p>');
	    $('.game').append("<div class='button-bottom'>New Game!</div>");
	    $('.game').append("<div class='button'>New Game!</div>");
	    this.updateEndSnake();
	    this.snakeFall();

	    $('.button').click(() => {this.startGame();});
	    if (this.highScore < this.board.score) {
	      this.highScore = this.board.score
	      $('.highscore').text(`High Score: ${this.highScore}`);
	    }
	    window.clearInterval(this.refreshInt);
	  }

	  step() {
	    this.render();
	    this.board.snake.move(this.board.apple);
	    if (this.board.snake.justAte) { this.board.placeApple();  }
	  }

	  render(){
	    const view = this;
	    $('li').each(function(){
	      const $square = $(this);
	      const pos = $square.data('pos');
	      $square.removeClass("snake-segment apple");

	      if(view.board.snake.includesPosition(pos)){
	        $square.addClass("snake-segment");
	      } else if (view.board.apple[0] === pos[0] && view.board.apple[1] === pos[1]) {
	        $square.addClass("apple");
	      }

	      $('.score').text(`Score: ${view.board.score}`);
	    });
	  }

	  setupBoardView() {
	    const $ul = $('<ul></ul>');
	    $('.game').append("<h2 class='highscore'>High Score: 0</h2>")
	    for(let i = 0; i < this.DIM; i++){
	      for (let j = 0; j < this.DIM; j++) {
	        const $li = $('<li></li>').data('pos', [i, j]);
	        $ul.append($li);
	      }
	    }

	    $('.game').append($ul);

	    let $scoreBoard = $("<h2 class='score'>Score: 0</h2>");
	    $('.game').append($scoreBoard);
	  }

	  snakeFall() {
	    let snakeCords =  this.board.snake.gridCords;
	    let view = this;

	    if(snakeCords.length === 0){
	      return;
	    } else{
	      let last = snakeCords[snakeCords.length - 1];
	      let dropInt = window.setInterval(() => {
	        if(last[0] < this.DIM){
	          // debugger
	          last[0] += 1;
	          view.render();
	        } else{
	          snakeCords.pop();
	          window.clearInterval(dropInt);
	          view.snakeFall();
	        }
	      }, 75);
	    }
	  }

	  updateEndSnake(){
	    this.board.snake.gridCords.shift();
	    this.board.snake.gridCords.push(this.board.snake.latestEnd);
	  }

	}

	module.exports = SnakeView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	

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


/***/ }
/******/ ]);