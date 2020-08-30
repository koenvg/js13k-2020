import { init, Sprite, GameLoop, load, TileEngine, initKeys, bindKeys } from 'kontra';
import level from './assets/data/level.json';
// @ts-ignore
import img from './assets/img/Overworld.png';
import { Alien } from 'sprites/alien';
initKeys();

const stepSize = 7;
let { canvas } = init();

async function start() {
  await load(img)
  const tileEngine = TileEngine({

    ...level,
    tilesets: [
      {
        firstgid: 1,
        image: img
      }
    ],
  });


  const alien = new Alien({
    tileEngine: tileEngine,
  });

  const loop = GameLoop({
    fps: 60,
    update: function () { // update the game state
      alien.update();

    },
    render: function () { // render the game state
      tileEngine.render();

      alien.render();
    }
  });
  loop.start();
}

start();