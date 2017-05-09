/**
 * Created by megaju on 09/05/17.
 */
const bootState = {
    preload() { // > Charger les fichiers nécessaires au jeu
        // boot (chargement)
        game.load.image('progressBar', 'assets/progressBar.png');
    },
    create() { // > Créer au début et une fois
        game.stage.backgroundColor = '#2f2230';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

            game.scale.setMinMax(game.width / 2, game.height / 2, game.width * 2, game.height * 2,)

            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
        }

        game.state.start('load');
    },
};