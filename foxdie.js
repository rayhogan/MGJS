var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'img/background.png');
    this.load.image('ground', 'img/ground.png');
    this.load.image('ladder', 'img/ladder.png');
    this.load.image('player', 'img/player.png');
}

var player;
var ground;
var ladder;
var cursor;

function create() {

    var self = this;

    // Draw Scene
    this.add.image(400, 300, 'background');
    ladder = self.physics.add.sprite(380, 175, 'ladder');
    ground = this.physics.add.staticGroup();
    ground.create(400, 575, 'ground');

    // Draw Player
    player = self.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(600);

    // Add collider
    self.physics.add.collider(player, ground);

    // Cursor keys
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {

    if (player) {

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

        } else {
            player.setVelocityX(0);
        }

        if (checkOverlap(player, ladder).width > 0) {

            player.setGravityY(0);
            if (cursors.up.isDown) {
                player.setVelocityY(-200);
            }
            else if (cursors.down.isDown) {
                player.setVelocityY(+200);
            }
            else {
                player.setVelocityY(0);
            }
        }
        else {
            player.body.setGravityY(600);
        }

    }

}

function checkOverlap(spriteA, spriteB) {

    try {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Geom.Rectangle.Intersection(boundsA, boundsB);
    }
    catch (e) {
        console.log(e);
        return false;
    }

}



