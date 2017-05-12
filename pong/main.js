/**
 * Created by megaju on 12/05/17.
 */

var emitter;

const mainsState = {
    preload() {
        game.load.image('platform', 'assets/platform.png');
        game.load.image('ball', 'assets/ball.png');
        game.load.image('particle', 'assets/particle.png');
    },
    create() {
        // fond, physique
        game.stage.backgroundColor = '#ccc';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true; // sur tout les obj, la physique ARCADE est active

        // centrer la scène du jeu
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        // player bottom
        this.player = game.add.sprite(game.width/2, game.height-40, 'platform');
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = true;
        this.player.body.immovable = true; // empêche que la platform soit poussé par la balle

        // assignation des touches player bottom
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        // player top
        this.player2 = game.add.sprite(game.width/2, 40, 'platform');
        this.player2.anchor.setTo(0.5);
        this.player2.body.collideWorldBounds = true;
        this.player2.body.immovable = true; // empêche que la platform soit poussé par la balle

        // assignation des touches player top
        this.leftP2 = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.rightP2 = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // ball
        this.ball = game.add.sprite(game.width/2, game.height/2, 'ball');
        this.ball.anchor.setTo(0.5);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.setTo(1); // 1 = valeur max, elle ne perd pas de sa force
        this.ball.body.velocity.x = 300;
        this.ball.body.velocity.y = 300;

        // système de particule
        emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);
        emitter.makeParticles(['particle']);
        emitter.gravity = 200;
        emitter.setAlpha(0.5, 0, 500);
        emitter.setScale(0.8, 0, 0.8, 0, 500);

        emitter.start(false, 1000, 120);
    },
    update() {
        // collide avec les platform des joueurs
        game.physics.arcade.collide([this.player, this.player2], this.ball);

        // cas de défaite player bottom
        if (this.ball.y > this.player.y+20) {
            game.state.start('main'); // on redémarre le jeu
        }

        // cas de défaite player top
        if (this.ball.y < this.player2.y-20) {
            game.state.start('main'); // on redémarre le jeu
        }

        // mouvement player bottom
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
        } else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
        } else {
            this.player.body.velocity.x = 0;
        }

        // mouvement player top
        if (this.leftP2.isDown) {
            this.player2.body.velocity.x = -300;
        } else if (this.rightP2.isDown) {
            this.player2.body.velocity.x = 300;
        } else {
            this.player2.body.velocity.x = 0;
        }

        // particle
        var px = this.ball.body.velocity.x;
        var py = this.ball.body.velocity.y;

        px *= -1;
        py *= -1;

        emitter.minParticleSpeed.set(px, py);
        emitter.maxParticleSpeed.set(px, py);

        emitter.emitX = this.ball.x;
        emitter.emitY = this.ball.y;

        // emitter.forEachExists(game.world.wrap, game.world);
        game.world.wrap(this.ball, 64);
    }
};

// START ! ! !
const game = new Phaser.Game(360, 640);
game.state.add('main', mainsState);
game.state.start('main');