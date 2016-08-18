// const Board = require('./board.js');
//
// class SnakeView {
//   constructor($el) {
//     this.KEY_MAP = {
//       "38": 'N',
//       "37": 'W',
//       "39": 'E',
//       "40": 'S'
//     };
//
//     this.DIM = 20;
//
//     this.$el = $el;
//     this.board = null;
//
//     this.setupBoardView();
//
//     $el.on('keydown', (event) => {
//       this.handleKeyPress(event);
//     });
//
//     this.startGame();
//     this.highScore = 0;
//   }
//
//   startGame(){
//     this.board = new Board(this.DIM);
//     this.$el.focus();
//     $('p').remove();
//     $('.button').remove();
//     $('.button-bottom').remove();
//
//
//     this.refreshInt = window.setInterval(() => {
//       if(this.board.gameOver()){
//         this.endGame();
//       } else{
//         this.step();
//       }
//     }, 150);
//   }
//
//
//   handleKeyPress(event) {
//
//     if (Object.keys(this.KEY_MAP).indexOf(event.which.toString()) !== -1) {
//       this.board.snake.turn(this.KEY_MAP[event.which.toString()]);
//     }
//   }
//
//   endGame(){
//     $('.game').append('<p>Game over!</p>');
//     this.updateEndSnake();
//     this.snakeFall();
//
//     $('.button').click(() => {this.startGame();});
//     if (this.highScore < this.board.score) {
//       this.highScore = this.board.score;
//       $('.highscore').text(`High Score: ${this.highScore}`);
//     }
//     window.clearInterval(this.refreshInt);
//   }
//
//   step() {
//     this.render();
//     this.board.snake.move(this.board.apple);
//     if (this.board.snake.justAte) { this.board.placeApple();  }
//   }
//
//   render(){
//     const view = this;
//     $('li').each(function(){
//       const $square = $(this);
//       const pos = $square.data('pos');
//       $square.removeClass("snake-segment apple");
//
//       if(view.board.snake.includesPosition(pos)){
//         $square.addClass("snake-segment");
//       } else if (view.board.apple[0] === pos[0] && view.board.apple[1] === pos[1]) {
//         $square.addClass("apple");
//       }
//
//       $('.score').text(`Score: ${view.board.score}`);
//     });
//   }
//
//   setupBoardView() {
//     const $ul = $('<ul></ul>');
//     $('.game').append("<h2 class='highscore'>High Score: 0</h2>")
//     for(let i = 0; i < this.DIM; i++){
//       for (let j = 0; j < this.DIM; j++) {
//         const $li = $('<li></li>').data('pos', [i, j]);
//         $ul.append($li);
//       }
//     }
//
//     $('.game').append($ul);
//
//     let $scoreBoard = $("<h2 class='score'>Score: 0</h2>");
//     $('.game').append($scoreBoard);
//   }
//
//   snakeFall() {
//     let snakeCords =  this.board.snake.gridCords;
//     let view = this;
//
//     if(snakeCords.length === 0){
//       console.log('here');
//       $('.game').append("<div class='button-bottom'>New Game!</div>");
//       $('.game').append("<div class='button'>New Game!</div>");
//       return;
//     } else{
//       let last = snakeCords[snakeCords.length - 1];
//       let dropInt = window.setInterval(() => {
//         if(last[0] < this.DIM){
//           last[0] += 1;
//           view.render();
//         } else{
//           snakeCords.pop();
//           window.clearInterval(dropInt);
//           view.snakeFall();
//         }
//       }, 50);
//     }
//   }
//
//   updateEndSnake(){
//     this.board.snake.gridCords.shift();
//     this.board.snake.gridCords.push(this.board.snake.latestEnd);
//   }
//
// }
//
// module.exports = SnakeView;
