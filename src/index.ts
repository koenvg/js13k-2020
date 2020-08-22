import { init, Sprite, GameLoop, load, TileEngine, dataAssets } from 'kontra';
import level from './assets/data/level.json';
// @ts-ignore
import img from './assets/img/Overworld.png';


let { canvas } = init();


async function start() {
  const assets = await load(img)
  const tileEngine = TileEngine({
    ...level,
    tilesets: [
      {
        firstgid: 1,
        image: img
      }
    ],
  });


  const sprite = Sprite({
    x: 100,        // starting x,y position of the sprite
    y: 80,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 40,
    dx: 2          // move the sprite 2px to the right every frame
  });

  const loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
      sprite.update();

      // wrap the sprites position when it reaches
      // the edge of the screen
      if (sprite.x > canvas.width) {
        sprite.x = -sprite.width;
      }
    },
    render: function () { // render the game state
      tileEngine.render();
      sprite.render();
    }
  });

  loop.start();
}

start();