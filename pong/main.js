/**
 * Created by megaju on 12/05/17.
 */

const game = new Phaser.Game(640, 320, Phaser.AUTO, 'gameDiv');

var emitter;
var scoreL = 0;
var scoreR = 0;
var ballScale = 0.9;

function result(scoreR, scoreL, sprite) {
    sprite.destroy();
    if (scoreR > scoreL) {
        // Player Right win !
        document.querySelector(".result").innerHTML = `Player right win !!!`;
    } else if (scoreR === scoreL) {
        // Egality
        document.querySelector(".result").innerHTML = `Egality`;
    } else {
        // Player Left win !
        document.querySelector(".result").innerHTML = `Player left win !!!`;
    }
}

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
        this.upLw = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.upLz = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.downL = game.input.keyboard.addKey(Phaser.Keyboard.S);

        // ball
        this.ball = game.add.sprite(game.width/2, game.height/2, 'ball');
        this.ball.anchor.setTo(0.5);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.setTo(1); // 1 = valeur max, elle ne perd pas de sa force
        let randDirectionBall = Math.floor((Math.random() * 10) +1);
        console.log(randDirectionBall);
        if (randDirectionBall < 5) {
            this.ball.body.velocity.x = -300;
        } else {
            this.ball.body.velocity.x = 300;
        }
        this.ball.body.velocity.y = 300;
        this.ball.scale.setTo(ballScale);

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
            ballScale = ballScale - 0.1;
            if (ballScale <= 0) {
                // end game
                result(scoreR, scoreL, this.ball);
            } else {
                game.state.start('main'); // on redémarre le jeu
            }
        }

        // cas de défaite playerL
        if (this.ball.x < this.playerL.x-20) {
            scoreR++;
            document.querySelector(".scoreR").innerHTML = `
                    ${scoreR}
                `;
            ballScale = ballScale - 0.1;
            if (ballScale <= 0) {
                // end game
                result(scoreR, scoreL, this.ball);
            } else {
                game.state.start('main'); // on redémarre le jeu
            }
        }

        // mouvement playerR
        if (this.upR.isDown) {
            this.playerR.body.velocity.y = -300;
        } else if (this.downR.isDown) {
            this.playerR.body.velocity.y = 300;
        } else {
            this.playerR.body.velocity.y = 0;
        }

        // mouvement playerL
        if (this.upLw.isDown || this.upLz.isDown) {
            this.playerL.body.velocity.y = -300;
        } else if (this.downL.isDown) {
            this.playerL.body.velocity.y = 300;
        } else {
            this.playerL.body.velocity.y = 0;
        }

        // particle
        var px = this.ball.body.velocity.x;
        var py = this.ball.body.velocity.y;

        emitter.minParticleSpeed.set(px, py);
        emitter.maxParticleSpeed.set(px, py);

        emitter.emitX = this.ball.x;
        emitter.emitY = this.ball.y;
    },
};

// START ! ! !
game.state.add('main', mainsState);
game.state.start('main');