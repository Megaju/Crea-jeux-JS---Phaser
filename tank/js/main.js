/**
 * Created by megaju on 13/05/17.
 */

const game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

const main = {
    init() {
        game.renderer.renderSession.roundPixels = true;
        game.world.setBounds(0, 0, 992, 480);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;
    },
    preload() {
        //  Note: Graphics from Amiga Tanx Copyright 1991 Gary Roberts
        this.load.image('tank', 'assets/tank.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('flame', 'assets/flame.png');
        this.load.image('target', 'assets/target.png');
    },
    create() {
        this.add.tileSprite(0, 0, 992, 480, 'background');

        // targets
        this.targets = this.add.group(this.game.world, 'targets', false, true, Phaser.Physics.ARCADE);

        this.targets.create(300, 390, 'target');
        this.targets.create(500, 390, 'target');
        this.targets.create(700, 390, 'target');
        this.targets.create(900, 390, 'target');

        // strop gravity for targets
        this.targets.setAll('body.allowGravity', false);

        // bullet
        this.bullet = this.add.sprite(0, 0, 'bullet');
        this.bullet.exists = false;
        this.physics.arcade.enable(this.bullet);

        //tank
        this.tank = this.add.sprite(24, 383, 'tank');
        // this turret
        this.turret = this.add.sprite(this.tank.x + 30, this.tank.y + 14, 'turret');
        // flame
        this.flame = this.add.sprite(0, 0, 'flame');
        this.flame.anchor.set(0.5);
        this.flame.visible = false;

        // power of the shot
        game.power = 300;
        this.powerText = this.add.text(8, 8, 'Power: 300', { font: "18px Arial", fill: "#ffffff" });
        this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.powerText.fixedToCamera = true;
    },
    update() {

    },
};

game.state.add('main', main);
game.state.start('main');