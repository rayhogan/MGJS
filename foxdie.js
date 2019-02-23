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

}


function create() {

    var GAMEOVER = this.add.text(300, 300, 'COMING SOON', {
        fontSize: '20px',
        fill: '#000',
        fill: "#ffffff",
    });
}

function update() {


}


