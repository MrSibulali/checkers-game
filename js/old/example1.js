var clickHolder = [];
var clickHolder2 = [];
var piece = [];
var piece2 = [];
var neighbour = [];
var neighbour2 = [];

var myTurn = [0];
class example1 extends Phaser.Scene {
  constructor() {
    super({key: 'example1'});
  }







  preload(){

   //background asset
    this.load.image('background', './images-dir/assets/bgpic3.jpg');

    //squares
    this.load.image('squares', './images-dir/assets/square-1.png');

    //player assets
    this.load.image('playerPiece1', './images-dir/assets/oponent.png');

    //oponent assets
    this.load.image('oponentPiece1', './images-dir/assets/player.png');

  }











  create() {
    //set the background of the checkers board
    var back  = this.add.image(440, 290, 'background');

    rectangles = [];
    direction = [];


    //Set up the grid
    for ( var x = 0; x < 8; x++) {
        for(var y = 0; y < 8; y++){
          if (y % 2 == 0 && x % 2 !== 0) {
            var rect = this.add.sprite(230+y * 60, 80 + x * 60, 'squares').setInteractive();
            rectangles.push(rect);
          }
          else if (y % 2 !== 0 && x % 2 == 0){
            var rect = this.add.sprite(230+y * 60, 80 + x * 60, 'squares').setInteractive();
            rectangles.push(rect);
          }
        }
      }


      //Add piece/color info
      for(var i = 0; i < rectangles.length; i++) {
        //first 12 one fillcolor
        if(i < 12) {
          rectangles[i].playerInfo = 2;

        }

        //next 8 are empty
        else if( i >= 12 && i < 20) {
          rectangles[i].playerInfo = 0;
        }
        //last 12 with different color
        else {
          rectangles[i].playerInfo = 1;
        }

      }
      //adding pieces to the chess board
      for (var p = 0; p < rectangles.length; p++) {
          var pieces = this.add.sprite(rectangles[p].x, rectangles[p].y, 'oponentPiece1');
          piece.push(pieces);
          piece.visible = false;
          var pieces2 = this.add.sprite(rectangles[p].x , rectangles[p].y, 'playerPiece1');
          pieces2.visible = false;
          piece2.push(pieces2);
      }




      for (var i = 0; i < rectangles.length; i++) {
        //click on the piece to indicate which piece to move
        rectangles[i].on('pointerdown', function(){
          if(this.playerInfo === 1) { //checking if the piece that is about to move belongs to player one
            if(clickHolder.length < 2) { // if there was no piece cliked before 
              clickHolder.push(this.x, this.y); //we wanna grab its parameters to be used later when comparing
            }
            else if (clickHolder.length == 2) { // if there was a piece cliked before 
              clickHolder[0] = this.x; //we wanna update the parameters
              clickHolder[1] = this.y;
            }
          }

          else if(this.playerInfo == 2) { //we do the same when it's player two's turn
            if(clickHolder2.length < 2) { //if there was no piece cliked before
              clickHolder2.push(this.x, this.y); // //we wanna grab its parameters to be used later when comparing
            }
            else if (clickHolder2.length == 2) { // if there was a piece cliked before
              clickHolder2[0] = this.x; //we wanna update the parameters
              clickHolder2[1] = this.y;
            }
          }


          //this is what happens when the player clicks to where they want to move the selected piece
          else if(this.playerInfo === 0) {
            //checks if it's players one's turn
              if(clickHolder.length !== 0) {
                //checks if moved to the next square on the left or right
                if (this.x  == clickHolder[0] + 60 &&  this.y  == clickHolder[1] - 60 || this.x  == clickHolder[0] - 60 &&  this.y  == clickHolder[1] - 60) {
                  for (var i = 0; i < rectangles.length; i++) {
                    if(rectangles[i].x == clickHolder[0] && rectangles[i].y == clickHolder[1] ) {
                      rectangles[i].playerInfo = 0;
                      clickHolder.length = 0;


                    }else if (rectangles[i].x == this.x && rectangles[i].y == this.y) {
                      rectangles[i].playerInfo = 1;
                    }
                  }
                  
                }

                //checks if moved to the second square right
                else if (this.x  == clickHolder[0] + 120 &&  this.y  == clickHolder[1] - 120 ) {
                  for (var i = 0; i < rectangles.length; i++) {
                    if (rectangles[i].x == clickHolder[0] + 60 && rectangles[i].y == clickHolder[1] - 60) {
                      neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                      //console.log(neighbour);
                      if(neighbour[2] == 2) {
                        for(var j = 0; j < rectangles.length; j++) {
                           if (rectangles[j].x == clickHolder[0] + 120 && rectangles[j].y == clickHolder[1] - 120) {
                            rectangles[j].playerInfo = 1;


                          }

                          else if(rectangles[j].x == clickHolder[0] && rectangles[j].y == clickHolder[1] ) {
                            rectangles[j].playerInfo = 0;
                            clickHolder.length = 0;

                          }

                          else if (rectangles[j].x == neighbour[0] && rectangles[j].y == neighbour[1]) {
                            rectangles[j].playerInfo = 0;
                            neighbour.length = 0;
                          }

                        }
                      }
                    }


                  }

                }
                else if (this.x  == clickHolder[0] - 120 &&  this.y  == clickHolder[1] - 120 ) {
                  for (var i = 0; i < rectangles.length; i++) {
                    if (rectangles[i].x == clickHolder[0] - 60 && rectangles[i].y == clickHolder[1] - 60) {
                      neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                      //console.log(neighbour);
                      if(neighbour[2] == 2) {
                        for(var j = 0; j < rectangles.length; j++) {
                          if (rectangles[j].x == clickHolder[0] - 120 && rectangles[j].y == clickHolder[1] - 120) {
                            rectangles[j].playerInfo = 1;


                          }
                          else if(rectangles[j].x == clickHolder[0] && rectangles[j].y == clickHolder[1] ) {
                            rectangles[j].playerInfo = 0;
                            clickHolder.length = 0;

                          }

                          else if (rectangles[j].x == neighbour[0] && rectangles[j].y == neighbour[1]) {
                            rectangles[j].playerInfo = 0;
                            neighbour.length = 0;
                          }

                        }

                      }
                    }
                  }
                  
                }


              }
                if(clickHolder2.length !== 0 ) {
                  if (this.x  == clickHolder2[0] + 60 &&  this.y  == clickHolder2[1] + 60 || this.x  == clickHolder2[0] - 60 &&  this.y  == clickHolder2[1] + 60) {
                    for (var i = 0; i < rectangles.length; i++) {
                      if(rectangles[i].x == clickHolder2[0] && rectangles[i].y == clickHolder2[1] ) {
                        rectangles[i].playerInfo = 0;
                        clickHolder2.length = 0;

                      } else if (rectangles[i].x == this.x && rectangles[i].y == this.y ) {
                        rectangles[i].playerInfo = 2;
                      }
                    }
                    myTurn[0] = 0;
                  }


                else if (this.x  == clickHolder2[0] + 120 &&  this.y  == clickHolder2[1] + 120 ) {
                  //console.log(this.x);
                  for (var i = 0; i < rectangles.length; i++) {
                    if (rectangles[i].x == clickHolder2[0] + 60 && rectangles[i].y == clickHolder2[1] + 60) {
                      neighbour2.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                      //console.log(neighbour);
                      if(neighbour2[2] == 1) {
                        for(var j = 0; j < rectangles.length; j++) {

                          if(rectangles[j].x == clickHolder2[0] && rectangles[j].y == clickHolder2[1] ) {
                            rectangles[j].playerInfo = 0;

                          }
                          else if (rectangles[j].x == clickHolder2[0] + 120 && rectangles[j].y == clickHolder2[1] + 120) {
                            rectangles[j].playerInfo = 2;
                            clickHolder2.length = 0;

                          }

                          else if (rectangles[j].x == neighbour2[0] && rectangles[j].y == neighbour2[1]) {
                            rectangles[j].playerInfo = 0;
                            neighbour2.length = 0;
                          }
                        }
                      }
                    }
                  }
                 
                }
                else if (this.x  == clickHolder2[0] - 120 &&  this.y  == clickHolder2[1] + 120 ) {
                  for (var i = 0; i < rectangles.length; i++) {
                    if (rectangles[i].x == clickHolder2[0] - 60 && rectangles[i].y == clickHolder2[1] + 60) {
                      neighbour2.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                      //console.log(neighbour);
                      if(neighbour2[2] == 1) {
                        for(var j = 0; j < rectangles.length; j++) {
                          if(rectangles[j].x == clickHolder2[0] && rectangles[j].y == clickHolder2[1] ) {
                            rectangles[j].playerInfo = 0;


                          }else if (rectangles[j].x == clickHolder2[0] - 120 && rectangles[j].y == clickHolder2[1] + 120) {
                            rectangles[j].playerInfo = 2;
                            clickHolder2.length = 0;
                          }

                          else if (rectangles[j].x == neighbour2[0] && rectangles[j].y == neighbour2[1]) {
                            rectangles[j].playerInfo = 0;
                            neighbour2.length = 0;
                          }

                        }
                      }
                    }
                  }
                  
                }
            }
          }
        });
      }
  }

   update () {

//what happens when a user clicks an empty space

     //This loop updates the game
     for(var j = 0; j < rectangles.length; j++) {
       for(var i = 0; i < piece.length; i++) {
         if(rectangles[j].playerInfo == 0 && rectangles[j].x == piece[i].x && rectangles[j].y == piece[i].y) {
           piece[i].visible = false;
           piece2[i].visible = false;
         }

         else if (rectangles[j].playerInfo == 1 && rectangles[j].x == piece[i].x && rectangles[j].y == piece[i].y) {
           piece[i].visible = true;
           piece2[i].visible = false;
         }
         else if (rectangles[j].playerInfo == 2 && rectangles[j].x == piece2[i].x && rectangles[j].y == piece2[i].y) {
           piece2[i].visible = true;
           piece[i].visible = false;
         }

       }
     }

   } //end update


}
