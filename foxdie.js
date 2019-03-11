var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameCanvas',
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
var ladders;

function create() {

    var self = this;

    // 2D Camera
    this.cameras.main.setBounds(0, 0, 800, 1500);
    this.cameras.main.setViewport(0, 0, 800, 600);

    // Draw Scene
    this.add.image(400, 800, 'background');
    this.add.image(400, 600, 'background');
    this.add.image(400, 1300, 'background');
    ladders = this.physics.add.staticGroup();
    ladders.create(380, 675, 'ladder');
    ladders.create(380, 1100, 'ladder');

    ground = this.physics.add.staticGroup();
    ground.create(400, 1500, 'ground');
    ground.create(-100, 300, 'ground');
    ground.create(850, 300, 'ground');

    // Draw Player
    player = self.physics.add.sprite(200, 800, 'player');
    player.setBounce(0.2);
    player.body.setGravityY(600);

    player.falling = false;
    player.fallHeight = 0;
    player.isAlive = true;

    // Set camera to follow player
    this.cameras.main.startFollow(player, true, 1, 1);

    // Add collider
    self.physics.add.collider(player, ground);

    // Cursor keys
    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.fadeIn(1000);

}

function update() {

    if (player) {

        if (cursors.left.isDown && player.x > 0) {
            player.setVelocityX(-160);

        } else if (cursors.right.isDown && player.x < 800) {
            player.setVelocityX(160);

        } else {
            player.setVelocityX(0);
        }

        if (checkOverlap(player, ladders) > 0) {
            // Can't be falling if overlapping
            player.falling = false;
            player.fallHeight = 0;
            // Disable gravity
            player.setGravityY(0);


            // Check ladder movement
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
            // If we are not touching the ground then apply gravity
            if (checkOverlap(player, ground) == 0) {
                player.falling = true;
                if (player.fallHeight == 0) {
                    player.fallHeight = player.y;
                }
                player.body.setGravityY(600);
            }
            else {
                if (player.falling) {
                    player.falling = false;
                    if ((player.y - player.fallHeight) > 500) {
                        player.isAlive = false;
                        console.log("SNAKE IS DEAD");
                    }
                    player.fallHeight = 0;
                }
            }
        }

    }

}

function checkOverlap(spriteA, spriteB) {

    var overlapping = 0;
    try {

        for (var i = 0; i < spriteB.children.entries.length; i++) {
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.children.entries[i].getBounds();

            if (Phaser.Geom.Rectangle.Intersection(boundsA, boundsB).width > 0) {
                overlapping = 1;
                break;
            }
        }

        return overlapping;
    }
    catch (e) {
        console.log(e);
        return false;
    }

}



