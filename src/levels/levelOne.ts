import { TileEngine } from 'kontra'
import level from '../assets/data/level.json'
import { createCow } from 'sprites/cow/cow'
import { Level } from './level'

export const loadLevelOne = async (img: string): Promise<Level> => {
  const tileEngine = TileEngine({
    ...level,
    tilesets: [
      {
        firstgid: 1,
        image: img,
      },
    ],
  })

  const cow = await createCow({
    x: 150,
    y: 0,
  })

  tileEngine.addObject(cow)

  return {
    tileEngine,
    render: () => {
      tileEngine.render()
      cow.render()
    },
  }
}
