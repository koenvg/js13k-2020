import {
  Sprite,
  keyPressed,
  TileEngine,
  SpriteConstructor,
  load,
  SpriteSheet,
} from 'kontra'
// @ts-ignore
import alienImage from './alien.png'

const stepSize = 16 / 6
type SpriteProps = ConstructorParameters<SpriteConstructor>[0]

interface AlienProps extends SpriteProps {
  tileEngine: TileEngine
}
class Alien extends Sprite {
  x = this.context.canvas.width / 2
  y = this.context.canvas.height / 2
  width = 16
  height = 16
  tileEngine: TileEngine

  constructor(props: AlienProps) {
    super(props)
    this.tileEngine = props.tileEngine
  }

  update = () => {
    if (keyPressed('up')) {
      if (this.tileEngine.sy === 0 || this.y > this.context.canvas.height / 2) {
        this.y = this.y > stepSize ? this.y - stepSize : 0
      } else {
        this.tileEngine.sy = this.tileEngine.sy - stepSize
      }
    } else if (keyPressed('down')) {
      if (
        this.tileEngine.sy ===
          this.tileEngine.mapheight - this.context.canvas.height ||
        this.y < this.context.canvas.height / 2
      ) {
        this.y =
          this.y < this.context.canvas.height - stepSize - this.height
            ? this.y + stepSize
            : this.context.canvas.height - this.height
      } else {
        this.tileEngine.sy = this.tileEngine.sy + stepSize
      }
    }

    if (keyPressed('left')) {
      if (this.tileEngine.sx === 0 || this.x > this.context.canvas.width / 2) {
        this.x = this.x > stepSize ? this.x - stepSize : 0
      } else {
        this.tileEngine.sx = this.tileEngine.sx - stepSize
      }
    } else if (keyPressed('right')) {
      if (
        this.tileEngine.sx ===
          this.tileEngine.mapwidth - this.context.canvas.width ||
        this.x < this.context.canvas.width / 2
      ) {
        this.x =
          this.x < this.context.canvas.width - stepSize - this.width
            ? this.x + stepSize
            : this.context.canvas.width - this.width
      } else {
        this.tileEngine.sx = this.tileEngine.sx + stepSize
      }
    }
  }
}

const createAnimations = (image: HTMLImageElement) => {
  const spriteSheet = SpriteSheet({
    image: image,
    frameWidth: 64,
    frameHeight: 64,
    animations: {
      // create a named animation: walk
      walk: {
        frames: '0..7', // frames 0 through 9
        frameRate: 30,
      },
    },
  })
  return spriteSheet.animations
}

export const createAlien = async (props: AlienProps) => {
  const image = new Image()
  image.src = alienImage
  await new Promise((resolve) => (image.onload = resolve))

  return new Alien({ ...props, animations: createAnimations(image) })
}
