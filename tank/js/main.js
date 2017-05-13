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
        //  Note: Graphics from Amiga Tanx Copyright 1991 Gary Roberts
        game.load.image('tank', 'assets/tank.png');
        game.load.image('turret', 'assets/turret.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('flame', 'assets/flame.png');
        game.load.image('target', 'assets/target.png');
    },
    create() {

    },
    update() {

    },

};