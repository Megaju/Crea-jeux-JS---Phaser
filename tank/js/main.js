/**
 * Created by megaju on 13/05/17.
 */

const game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

const main = {

    init() {
        game.renderer.renderSession.roundPixels = true;
        game.world.setBounds(0, 0, 992, 480);
        physics.startSystem(Phaser.Physics.ARCADE);
        physics.arcade.gravity.y = 200;
    },
    preload() {

    },
    create() {

    },
    update() {

    },

};