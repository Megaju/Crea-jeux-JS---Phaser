/**
 * Created by megaju on 09/05/17.
 */
const loadState = {
    preload() {
        const loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#fff' });
        loadingLabel.anchor.setTo(0.5);

        const progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5);

        game.load.image('player', 'assets/player.png');
    },
    create() {
        game.state.start('menu');
    },
};