/**
 * Created by megaju on 12/05/17.
 */

var emitter;
var scoreL = 0;
var scoreR = 0;

document.querySelector(".scoreL").innerHTML = `
                    ${scoreL}
                `;
document.querySelector(".scoreR").innerHTML = `
                    ${scoreR}
                `;

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

        // playerR
        this.playerR = game.add.sprite(game.width-40, game.height/2, 'platform');
        this.playerR.anchor.setTo(0.5);
        this.playerR.body.collideWorldBounds = true;
        this.playerR.body.immovable = true; // empêche que la platform soit poussé par la balle

        // assignation des touches playerR
        this.upR = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downR = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        // playerL
        this.playerL = game.add.sprite(40, game.height/2, 'platform');
        this.playerL.anchor.setTo(0.5);
        this.playerL.body.collideWorldBounds = true;
        this.playerL.body.immovable = true; // empêche que la platform soit poussé par la balle

        // assignation des touches playerL
        this.upL = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.downL = game.input.keyboard.addKey(Phaser.Keyboard.S);

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
        game.physics.arcade.collide([this.playerR, this.playerL], this.ball);

        // cas de défaite playerR bottom
        if (this.ball.x > this.playerR.x+20) {
            scoreL++;
            document.querySelector(".scoreL").innerHTML = `
                    ${scoreL}
                `;
            game.state.start('main'); // on redémarre le jeu
        }

        // cas de défaite playerL
        if (this.ball.x < this.playerL.x-20) {
            scoreR++;
            document.querySelector(".scoreR").innerHTML = `
                    ${scoreR}
                `;
            game.state.start('main'); // on redémarre le jeu
        }

        // mouvement playerR bottom
        if (this.upR.isDown) {
            this.playerR.body.velocity.y = -300;
        } else if (this.downR.isDown) {
            this.playerR.body.velocity.y = 300;
        } else {
            this.playerR.body.velocity.y = 0;
        }

        // mouvement playerR top
        if (this.upL.isDown) {
            this.playerL.body.velocity.y = -300;
        } else if (this.downL.isDown) {
            this.playerL.body.velocity.y = 300;
        } else {
            this.playerL.body.velocity.y = 0;
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
const game = new Phaser.Game(640, 320, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainsState);
game.state.start('main');