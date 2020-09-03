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
  width = 26
  height = 26
  x = this.width / 2
  y = this.height / 2
  anchor = { x: 0.5, y: 0.5 }
  tileEngine: TileEngine

  constructor(props: AlienProps) {
    super(props)
    this.tileEngine = props.tileEngine
  }

  update = () => {
    this.moveVertical()
    this.moveHorizontal()
  }

  private collisionDetection = (move: () => void) => () => {
    const objectPosition = { x: this.x, y: this.y }
    const tileEngineOffset = { sx: this.tileEngine.sx, sy: this.tileEngine.sy }

    move()

    const boundingBox = {
      x: this.x + this.tileEngine.sx - this.width / 2,
      y: this.y + this.tileEngine.sy - this.height / 2,
      width: this.width,
      height: this.height,
    }

    if (this.tileEngine.layerCollidesWith('collision', boundingBox)) {
      this.x = objectPosition.x
      this.y = objectPosition.y
      this.tileEngine.sx = tileEngineOffset.sx
      this.tileEngine.sy = tileEngineOffset.sy
    }
  }

  private moveHorizontal = this.collisionDetection(() => {
    if (keyPressed('left')) {
      if (this.tileEngine.sx === 0 || this.x > this.context.canvas.width / 2) {
        this.x =
          this.x - this.width / 2 > stepSize
            ? this.x - stepSize
            : this.width / 2
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
          this.x < this.context.canvas.width - stepSize - this.width / 2
            ? this.x + stepSize
            : this.context.canvas.width - this.width / 2
      } else {
        this.tileEngine.sx = this.tileEngine.sx + stepSize
      }
    }
  })

  private moveVertical = this.collisionDetection(() => {
    if (keyPressed('up')) {
      if (this.tileEngine.sy === 0 || this.y > this.context.canvas.height / 2) {
        this.y =
          this.y - this.height / 2 > stepSize
            ? this.y - stepSize
            : this.height / 2
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
          this.y < this.context.canvas.height - stepSize - this.height / 2
            ? this.y + stepSize
            : this.context.canvas.height - this.height / 2
      } else {
        this.tileEngine.sy = this.tileEngine.sy + stepSize
      }
    }
  })
}

const createAnimations = (image: HTMLImageElement) => {
  const spriteSheet = SpriteSheet({
    image: image,
    frameWidth: 256,
    frameHeight: 256,
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
