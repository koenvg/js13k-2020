import { init, Sprite, GameLoop, load, TileEngine, initKeys } from 'kontra'
// @ts-ignore
import { createAlien } from 'sprites/alien/alien'
import { configureContext } from 'Config'
import { loadLevelOne } from 'levels/levelOne'
initKeys()

let { context } = init()
configureContext(context)

async function start() {
  const level = await loadLevelOne()

  const loop = GameLoop({
    update: function () {
      // update the game state
      level.update()
    },
    render: async function () {
      // render the game state
      level.render()
    },
  })
  loop.start()
}

start()
