var clickHolder = [];
var clickHolder2 = [];
var piece = [];
var piece2 = [];
var opponentKing = [];
var playerKing = [];
var neighbour = [];
var neighbour2 = [];


var playerCheck = [];
var opponentCheck = [];


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

    //player king assets
    this.load.image('oponentKing', './images-dir/assets/oponentKing.png');

    //oponent assets
    this.load.image('oponentPiece1', './images-dir/assets/player.png');

    //player king assets
    this.load.image('playerKing', './images-dir/assets/playerKing.png');

  }


  create() {
    //set the background of the checkers board
    var back  = this.add.image(250, 250, 'background');

    rectangles = [];
    direction = [];
//

    //Set up the grid
    for ( var x = 0; x < 8; x++) {
        for(var y = 0; y < 8; y++){
          if (y % 2 == 0 && x % 2 !== 0) {
            var rect = this.add.sprite(40 + y * 60, 40 + x * 60, 'squares').setInteractive();
            rectangles.push(rect);
          }
          else if (y % 2 !== 0 && x % 2 == 0){
            var rect = this.add.sprite(40 + y * 60, 40 + x * 60, 'squares').setInteractive();
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
            //adding pieces to the  board
            for (var p = 0; p < rectangles.length; p++) {
                var pieces = this.add.sprite(rectangles[p].x, rectangles[p].y, 'oponentPiece1');
                piece.push(pieces);
                piece.visible = false;
                var pieces2 = this.add.sprite(rectangles[p].x , rectangles[p].y, 'playerPiece1');
                pieces2.visible = false;
                piece2.push(pieces2);
      
                var playerKingPiece = this.add.sprite(rectangles[p].x , rectangles[p].y, 'playerKing');
                playerKingPiece.visible = false;
                playerKing.push(playerKingPiece);
      
                var opponentKingPiece = this.add.sprite(rectangles[p].x , rectangles[p].y, 'oponentKing');
                opponentKingPiece.visible = false;
                opponentKing.push(opponentKingPiece);
            }
      
      
      
            //click on the piece to indicate which piece to move and update if the previous piece was clicked
            for (var i = 0; i < rectangles.length; i++) {
              
              rectangles[i].on('pointerdown', function(){
                if(this.playerInfo === 1) {
                  if(clickHolder.length < 2) {
                    clickHolder.push(this.x, this.y);
                  }
                  else if (clickHolder.length == 2) {  
                    clickHolder[0] = this.x; 
                    clickHolder[1] = this.y;
                  }
                }
      
                else if(this.playerInfo == 2) { 
                  if(clickHolder2.length < 2) { 
                    clickHolder2.push(this.x, this.y);
                  }
                  else if (clickHolder2.length == 2) {
                    clickHolder2[0] = this.x;
                    clickHolder2[1] = this.y;
                  }
                }
      
                else if(this.playerInfo == 3) { 
                  if(playerCheck.length < 2) {
                    playerCheck.push(this.x, this.y);
                  }
                  else if (playerCheck.length == 2) {
                    playerCheck[0] = this.x;
                    playerCheck[1] = this.y;
                  }
                }
      
                else if(this.playerInfo == 4) { 
                  if(opponentCheck.length < 2) {
                    opponentCheck.push(this.x, this.y); 
                  }
                  else if (opponentCheck.length == 2) {
                    opponentCheck[0] = this.x;
                    opponentCheck[1] = this.y;
                  }
                }
      
      
                //this is what happens when the player clicks to where they want to move the selected piece
                else if(this.playerInfo === 0) {
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
                          //when the piece reaches the final raw I change the player info so that it becomes a king
                          else if(this.y == 40) {
                            this.playerInfo = 3;                            
                          }
                          
                        }
                        
                      }
      
                     
      
                      //checks if moved to the second square right and oponent's piece
                      else if (this.x  == clickHolder[0] + 120 &&  this.y  == clickHolder[1] - 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == clickHolder[0] + 60 && rectangles[i].y == clickHolder[1] - 60) {
                            neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour[2] == 2 || neighbour[2] == 4) {
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
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 40) {
                                  this.playerInfo = 3;                            
                                }
      
                              }
                            }
                          }
      
      
                        }
      
                      }
                      //checks if moved to the second square left and take oponet's piece
                      else if (this.x  == clickHolder[0] - 120 &&  this.y  == clickHolder[1] - 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == clickHolder[0] - 60 && rectangles[i].y == clickHolder[1] - 60) {
                            neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour[2] == 2 || neighbour[2] == 4) {
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
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 40) {
                                  this.playerInfo = 3;                            
                                }
      
                              }
      
                            }
                          }
                        }
                        
                      }
      
      
                    }
      
                    if(playerCheck.length !== 0) {  
                      //checks if moved to the next square left and rigth and there's no piece to take 
                      if (this.x  == playerCheck[0] + 60 &&  this.y  == playerCheck[1] + 60 || this.x  == playerCheck[0] - 60 &&  this.y  == playerCheck[1] + 60 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if(rectangles[i].x == playerCheck[0] && rectangles[i].y == playerCheck[1] ) {
                            rectangles[i].playerInfo = 0;
                            playerCheck.length = 0;
      
                          }else if (rectangles[i].x == this.x && rectangles[i].y == this.y) {
                            rectangles[i].playerInfo = 3;
                          }
                        }
                      }
      
                      else if ( this.x  == playerCheck[0] + 60 &&  this.y  == playerCheck[1] - 60 || this.x  == playerCheck[0] - 60 &&  this.y  == playerCheck[1] - 60 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if(rectangles[i].x == playerCheck[0] && rectangles[i].y == playerCheck[1] ) {
                            rectangles[i].playerInfo = 0;
                            playerCheck.length = 0;
      
                          }else if (rectangles[i].x == this.x && rectangles[i].y == this.y) {
                            rectangles[i].playerInfo = 3;
                          }
                        }
                      }
      
                      //checks if moved to the second square right and take oponent's piece
                      else if (this.x  == playerCheck[0] + 120 &&  this.y  == playerCheck[1] - 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == playerCheck[0] + 60 && rectangles[i].y == playerCheck[1] - 60) {
                            neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour[2] == 2 || neighbour[2] == 4) {
                              for(var j = 0; j < rectangles.length; j++) {
                                 if (rectangles[j].x == playerCheck[0] + 120 && rectangles[j].y == playerCheck[1] - 120) {
                                  rectangles[j].playerInfo = 3;
      
      
                                }
      
                                else if(rectangles[j].x == playerCheck[0] && rectangles[j].y == playerCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
                                  playerCheck.length = 0;
      
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
                      //checks if moved to the second square left and take oponent's piece
                      else if (this.x  == playerCheck[0] - 120 &&  this.y  == playerCheck[1] - 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == playerCheck[0] - 60 && rectangles[i].y == playerCheck[1] - 60) {
                            neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour[2] == 2 || neighbour[2] == 4) {
                              for(var j = 0; j < rectangles.length; j++) {
                                if (rectangles[j].x == playerCheck[0] - 120 && rectangles[j].y == playerCheck[1] - 120) {
                                  rectangles[j].playerInfo = 3;
      
      
                                }
                                else if(rectangles[j].x == playerCheck[0] && rectangles[j].y == playerCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
                                  playerCheck.length = 0;
      
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
                      
                      //checks if moved to the second square left and take oponent's piece
      
                      else if (this.x  == playerCheck[0] - 120 &&  this.y  == playerCheck[1] + 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == playerCheck[0] - 60 && rectangles[i].y == playerCheck[1] + 60) {
                            neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour[2] == 2 || neighbour[2] == 4) {
      
                              for(var j = 0; j < rectangles.length; j++) {
                                if(rectangles[j].x == playerCheck[0] && rectangles[j].y == playerCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
      
      
                                }else if (rectangles[j].x == playerCheck[0] - 120 && rectangles[j].y == playerCheck[1] + 120) {
                                  rectangles[j].playerInfo = 3;
                                  playerCheck.length = 0;
                                }
                                else if (rectangles[j].x == neighbour[0] && rectangles[j].y == neighbour[1]) {
                                  rectangles[j].playerInfo = 0;
                                  neighbour.length = 0;
                                }
                                
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 460) {
                                  this.playerInfo = 4;
                                }
      
                              }
      
                            }
                          }
                        }
                        
                      }
                    //checks if moved to the second square right and take oponent's piece
      
                      else if (this.x  == playerCheck[0] + 120 &&  this.y  == playerCheck[1] + 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == playerCheck[0] + 60 && rectangles[i].y == playerCheck[1] + 60) {
                            neighbour.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour[2] == 2 || neighbour[2] == 4) {
      
                              for(var j = 0; j < rectangles.length; j++) {
                                if(rectangles[j].x == playerCheck[0] && rectangles[j].y == playerCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
      
      
                                }else if (rectangles[j].x == playerCheck[0] + 120 && rectangles[j].y == playerCheck[1] + 120) {
                                  rectangles[j].playerInfo = 3;
                                  playerCheck.length = 0;
                                }
      
                                else if (rectangles[j].x == neighbour[0] && rectangles[j].y == neighbour[1]) {
                                  rectangles[j].playerInfo = 0;
                                  neighbour.length = 0;
                                }
                                
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 460) {
                                  this.playerInfo = 4;
                                }
      
                              }
      
                            }
                          }
                        }
                        
                      }
                    }
      
      
      
                    //This repeats the steps above but for the second player
      
                    else if(opponentCheck.length !== 0) {

                      if (this.x  == opponentCheck[0] + 60 &&  this.y  == opponentCheck[1] + 60 || this.x  == opponentCheck[0] - 60 &&  this.y  == opponentCheck[1] + 60 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if(rectangles[i].x == opponentCheck[0] && rectangles[i].y == opponentCheck[1] ) {
                            rectangles[i].playerInfo = 0;
                            opponentCheck.length = 0;
      
                          }else if (rectangles[i].x == this.x && rectangles[i].y == this.y) {
                            rectangles[i].playerInfo = 4;
                          }
                        }
                      }
      
                      else if ( this.x  == opponentCheck[0] + 60 &&  this.y  == opponentCheck[1] - 60 || this.x  == opponentCheck[0] - 60 &&  this.y  == opponentCheck[1] - 60 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if(rectangles[i].x == opponentCheck[0] && rectangles[i].y == opponentCheck[1] ) {
                            rectangles[i].playerInfo = 0;
                            opponentCheck.length = 0;
      
                          }else if (rectangles[i].x == this.x && rectangles[i].y == this.y) {
                            rectangles[i].playerInfo = 4;
                          }
                        }
                      }
      
                      //checks if moved to the second square right
                      else if (this.x  == opponentCheck[0] + 120 &&  this.y  == opponentCheck[1] - 120 ) {
                        console.log('yes');
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == opponentCheck[0] + 60 && rectangles[i].y == opponentCheck[1] - 60) {
                            neighbour2.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour2[2] == 1 || neighbour2[2] == 3) {
                              for(var j = 0; j < rectangles.length; j++) {
                                 if (rectangles[j].x == opponentCheck[0] + 120 && rectangles[j].y == opponentCheck[1] - 120) {
                                  rectangles[j].playerInfo = 4;
                                }
      
                                else if(rectangles[j].x == opponentCheck[0] && rectangles[j].y == opponentCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
                                  opponentCheck.length = 0;
      
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
                      else if (this.x  == opponentCheck[0] - 120 &&  this.y  == opponentCheck[1] - 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == opponentCheck[0] - 60 && rectangles[i].y == opponentCheck[1] - 60) {
                            neighbour2.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour2[2] == 1 || neighbour2[2] == 3) {
                              for(var j = 0; j < rectangles.length; j++) {
                                if (rectangles[j].x == opponentCheck[0] - 120 && rectangles[j].y == opponentCheck[1] - 120) {
                                  rectangles[j].playerInfo = 4;
      
      
                                }
                                else if(rectangles[j].x == opponentCheck[0] && rectangles[j].y == opponentCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
                                  opponentCheck.length = 0;
      
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
      
      
                      else if (this.x  == opponentCheck[0] - 120 &&  this.y  == opponentCheck[1] + 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == opponentCheck[0] - 60 && rectangles[i].y == opponentCheck[1] + 60) {
                            neighbour2.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour2[2] == 1 || neighbour2[2] == 3) {
      
                              for(var j = 0; j < rectangles.length; j++) {
                                if(rectangles[j].x == opponentCheck[0] && rectangles[j].y == opponentCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
      
      
                                }else if (rectangles[j].x == opponentCheck[0] - 120 && rectangles[j].y == opponentCheck[1] + 120) {
                                  rectangles[j].playerInfo = 4;
                                  opponentCheck.length = 0;
                                }
      
                                else if (rectangles[j].x == neighbour2[0] && rectangles[j].y == neighbour2[1]) {
                                  rectangles[j].playerInfo = 0;
                                  neighbour2.length = 0;
                                }
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 460) {
                                  this.playerInfo = 4;
                                }
      
                              }
      
                            }
                          }
                        }
                        
                      }
      
      
                      else if (this.x  == opponentCheck[0] + 120 &&  this.y  == opponentCheck[1] + 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == opponentCheck[0] + 60 && rectangles[i].y == opponentCheck[1] + 60) {
                            neighbour2.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour2[2] == 1 || neighbour2[2] == 3) {
      
                              for(var j = 0; j < rectangles.length; j++) {
                                if(rectangles[j].x == opponentCheck[0] && rectangles[j].y == opponentCheck[1] ) {
                                  rectangles[j].playerInfo = 0;
      
      
                                }else if (rectangles[j].x == opponentCheck[0] + 120 && rectangles[j].y == opponentCheck[1] + 120) {
                                  rectangles[j].playerInfo = 4;
                                  opponentCheck.length = 0;
                                }
      
                                else if (rectangles[j].x == neighbour2[0] && rectangles[j].y == neighbour2[1]) {
                                  rectangles[j].playerInfo = 0;
                                  neighbour2.length = 0;
                                }
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 460) {
                                  this.playerInfo = 4;
                                }
      
                              }
      
                            }
                          }
                        }
                        
                      }
                    }
      
                      if(clickHolder2.length !== 0) {
                        if (this.x  == clickHolder2[0] + 60 &&  this.y  == clickHolder2[1] + 60 || this.x  == clickHolder2[0] - 60 &&  this.y  == clickHolder2[1] + 60) {
                          for (var i = 0; i < rectangles.length; i++) {
                            if(rectangles[i].x == clickHolder2[0] && rectangles[i].y == clickHolder2[1] ) {
                              rectangles[i].playerInfo = 0;
                              clickHolder2.length = 0;
      
                            } 
                            //when the piece reaches the final raw I change the player info so that it becomes a king
                            else if(this.y == 460) {
                              this.playerInfo = 4;                         
                            }
                            else if (rectangles[i].x == this.x && rectangles[i].y == this.y ) {
                              rectangles[i].playerInfo = 2;
                            }
                          }
                        }
      
      
                      else if (this.x  == clickHolder2[0] + 120 &&  this.y  == clickHolder2[1] + 120 ) {
                        for (var i = 0; i < rectangles.length; i++) {
                          if (rectangles[i].x == clickHolder2[0] + 60 && rectangles[i].y == clickHolder2[1] + 60) {
                            neighbour2.push(rectangles[i].x, rectangles[i].y, rectangles[i].playerInfo);
                            if(neighbour2[2] == 1 || neighbour2[2] == 3) {
                              for(var j = 0; j < rectangles.length; j++) {
      
                                if(rectangles[j].x == clickHolder2[0] && rectangles[j].y == clickHolder2[1] ) {
                                  rectangles[j].playerInfo = 0;
      
                                }
                                else if (rectangles[j].x == neighbour2[0] && rectangles[j].y == neighbour2[1]) {
                                  rectangles[j].playerInfo = 0;
                                  neighbour2.length = 0;
                                }
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 460) {
                                  this.playerInfo = 4;
                                }
                                else if (rectangles[j].x == clickHolder2[0] + 120 && rectangles[j].y == clickHolder2[1] + 120) {
                                  rectangles[j].playerInfo = 2;
                                  clickHolder2.length = 0;
      
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
                            if(neighbour2[2] == 1 || neighbour2[2] == 3) {
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
                                //when the piece reaches the final raw I change the player info so that it becomes a king
                                else if(this.y == 460) {
                                  this.playerInfo = 4;
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
                playerKing[i].visible = false;
                opponentKing[i].visible = false;
                
              }
      
              else if (rectangles[j].playerInfo == 1 && rectangles[j].x == piece[i].x && rectangles[j].y == piece[i].y) {
                piece[i].visible = true;
                piece2[i].visible = false;
                opponentKing[i].visible = false;
                playerKing[i].visible = false;
              }
              else if (rectangles[j].playerInfo == 2 && rectangles[j].x == piece2[i].x && rectangles[j].y == piece2[i].y) {
                piece2[i].visible = true;
                piece[i].visible = false;
                opponentKing[i].visible = false;
                playerKing[i].visible = false;
              }
              else if (rectangles[j].playerInfo == 3 && rectangles[j].x == playerKing[i].x && rectangles[j].y == playerKing[i].y) {
                playerKing[i].visible = true;
                piece[i].visible = false
                piece2[i].visible = false;
                opponentKing[i].visible = false;
              }
      
              else if (rectangles[j].playerInfo == 4 && rectangles[j].x == opponentKing[i].x && rectangles[j].y == opponentKing[i].y) {
                opponentKing[i].visible = true;
                piece[i].visible = false
                piece2[i].visible = false;
                playerKing[i].visible = false;
              }
            }
          }
      
         } //end update
      
      
      }
