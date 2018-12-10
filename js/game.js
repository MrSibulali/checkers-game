  var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    physics: {
      default: 'arcade',
      arcade: {y: 'gravity'}
    },
    scene: [example1]
  }

  var game  = new Phaser.Game(config);

  var graphics;
  var rect;
  var rectangles;

  var piece1;
  var piece1;
  var direction;
