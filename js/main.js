
//noinspection JSAnnotator
/**
 * Created by megaju on 09/05/17.
 */
const main = {

    preload() {
        // Charger les fichiers nécessaires au jeu
        game.load.image('player', 'assets/player.png');
    },
    create() {
        // créer au début et une fois

        // paramètres de base
        game.stage.backgroundColor = '#2f2230';
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        // Player
        this.player = game.add.sprite(game.width/2, game.height/2, 'player');
        this.player.anchor.setTo(0.5);
    },
    update() {
        // sur une base de 60fps
    }
};

// affiche le jeu, on définit la taille, le moteur de rendus et la div dans laquelle
// se passe le jeu.
const game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

// on ajoute
game.state.add('main', main);
// on lance le jeu
game.state.start('main');