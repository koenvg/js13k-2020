import { TileEngine, loadImage, keyPressed, collides } from 'kontra'
import level from '../assets/data/level.json'
import { createCow, Cow } from 'sprites/cow/cow'
import { Level } from './level'
// @ts-ignore
import img from '../assets/img/Overworld.png'
import { createAlien, Alien } from 'sprites/alien/alien'

class LevelOne implements Level {
  private cowBeingSuckedUp: Cow

  constructor(
    public tileEngine: TileEngine,
    private cows: Cow[],
    private alien: Alien
  ) {}

  render(): void {
    this.tileEngine.render()
    this.cows.forEach((cow) => cow.render())
    this.alien.render()
  }
  update(): void {
    if (this.cowBeingSuckedUp) {
      return
    }
    this.cows.forEach((cow) => cow.update())
    this.alien.update()
    if (keyPressed('space')) {
      this.handleSpaceBar()
    }
  }

  private handleSpaceBar() {
    this.cowBeingSuckedUp = this.cows.find((cow) =>
      collides(cow, this.alien.getBoundingBoxInTileEngine())
    )
    if (this.cowBeingSuckedUp) {
      setTimeout(() => {
        this.cows = this.cows.filter((cow) => cow !== this.cowBeingSuckedUp)
        this.cowBeingSuckedUp = undefined
      }, 1000)
    }
  }
}

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

  return new LevelOne(tileEngine, cows, alien)
}
