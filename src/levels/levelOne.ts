import { TileEngine, loadImage } from 'kontra'
import level from '../assets/data/level.json'
import { createCow } from 'sprites/cow/cow'
import { Level } from './level'
// @ts-ignore
import img from '../assets/img/Overworld.png'
import { createAlien } from 'sprites/alien/alien'

export const loadLevelOne = async (): Promise<Level> => {
  await loadImage(img)
  const tileEngine = TileEngine({
    ...level,
    tilesets: [
      {
        firstgid: 1,
        image: img,
      },
    ],
  })
  const cows = await Promise.all([
    createCow({
      x: 150,
      y: 0,
    }),
    createCow({
      x: 20,
      y: 150,
    }),
  ])

  cows.forEach((cow) => tileEngine.addObject(cow))

  const alien = await createAlien({
    tileEngine: tileEngine,
  })

  return {
    tileEngine,
    render: () => {
      tileEngine.render()
      cows.forEach((cow) => cow.render())
      alien.render()
    },
    update: () => {
      cows.forEach((cow) => cow.update())
      alien.update()
    },
  }
}
