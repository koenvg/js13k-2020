import {
  Sprite,
  keyPressed,
  TileEngine,
  SpriteConstructor,
  load,
  SpriteSheet,
  loadImage,
} from 'kontra'
// @ts-ignore
import alienSrc from './alien.png'
import { SpriteProps } from 'sprites/types'

const stepSize = 16 / 6

interface AlienProps extends SpriteProps {
  tileEngine: TileEngine
}

export class Alien extends Sprite {
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

  getBoundingBoxInTileEngine = () => {
    return {
      x: this.x + this.tileEngine.sx,
      y: this.y + this.tileEngine.sy,
      width: this.width + 2,
      height: this.height + 2,
      anchor: this.anchor,
    }
  }

  private collisionDetection = (move: () => void) => () => {
    const objectPosition = { x: this.x, y: this.y }
    const tileEngineOffset = {
      sx: this.tileEngine.sx,
      sy: this.tileEngine.sy,
    }
    const reset = () => {
      this.x = objectPosition.x
      this.y = objectPosition.y
      this.tileEngine.sx = tileEngineOffset.sx
      this.tileEngine.sy = tileEngineOffset.sy
    }

    const boundingBoxBefore = this.getBoundingBoxInTileEngine()

    move()

    const boundingBox = this.getBoundingBoxInTileEngine()

    if (this.tileEngine.layerCollidesWith('collision', boundingBox)) {
      reset()
    }

    // if a player would hop over a level
    if (
      (this.tileEngine.layerCollidesWith('Level 0', boundingBoxBefore) &&
        this.tileEngine.layerCollidesWith('Level 1', boundingBox)) ||
      (this.tileEngine.layerCollidesWith('Level 1', boundingBoxBefore) &&
        this.tileEngine.layerCollidesWith('Level 0', boundingBox))
    ) {
      reset()
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
        frameRate: 7,
      },
    },
  })
  return spriteSheet.animations
}

export const createAlien = async (props: AlienProps) => {
  const image = await loadImage(alienSrc)

  return new Alien({ ...props, animations: createAnimations(image) })
}
