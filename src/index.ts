import { init, Sprite, GameLoop, load, TileEngine, initKeys } from 'kontra'
// @ts-ignore
import img from './assets/img/Overworld.png'
import { createAlien } from 'sprites/alien/alien'
import { configureContext } from 'Config'
import { loadLevelOne } from 'levels/levelOne'
import { createCow } from 'sprites/cow/cow'
initKeys()

let { context } = init()
configureContext(context)

async function start() {
  await load(img)
  const level = await loadLevelOne(img)

  const alien = await createAlien({
    tileEngine: level.tileEngine,
  })

  const cow = await createCow({
    x: 48,
    y: 48,
  })

  const loop = GameLoop({
    update: function () {
      // update the game state
      alien.update()
    },
    render: async function () {
      // render the game state
      level.render()
      alien.render()
    },
  })
  loop.start()
}

start()
