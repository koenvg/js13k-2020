import { init, Sprite, GameLoop, load, TileEngine, initKeys } from 'kontra'
import level from './assets/data/level.json'
// @ts-ignore
import img from './assets/img/Overworld.png'
import { Alien } from 'sprites/alien'
import { configureContext } from 'Config'
initKeys()

let { canvas, context } = init()
configureContext(context)

async function start() {
  await load(img)
  const tileEngine = TileEngine({
    ...level,
    tilesets: [
      {
        firstgid: 1,
        image: img,
      },
    ],
  })
  // tileEngine.context.scale(2, 2)

  const alien = new Alien({
    tileEngine: tileEngine,
  })

  const loop = GameLoop({
    fps: 60,
    update: function () {
      // update the game state
      alien.update()
    },
    render: function () {
      // render the game state

      tileEngine.render()

      alien.render()
    },
  })
  loop.start()
}

start()
