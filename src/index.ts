import { init, Sprite, GameLoop, load, TileEngine, initKeys } from 'kontra'
import level from './assets/data/level.json'
// @ts-ignore
import img from './assets/img/Overworld.png'
import { createAlien } from 'sprites/alien'
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

  const alien = await createAlien({
    tileEngine: tileEngine,
  })

  const loop = GameLoop({
    update: function () {
      // update the game state
      alien.update()
    },
    render: async function () {
      // render the game state

      tileEngine.render()

      alien.render()
    },
  })
  loop.start()
}

start()
