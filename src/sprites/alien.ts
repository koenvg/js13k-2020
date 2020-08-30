import {
  Sprite,
  keyPressed,
  TileEngine,
  SpriteConstructor,
  getWorldRect,
} from 'kontra'
import * as Config from '../Config'

const stepSize = 4
type SpriteProps = ConstructorParameters<SpriteConstructor>[0]

interface AlienProps extends SpriteProps {
  tileEngine: TileEngine
}
export class Alien extends Sprite {
  x = Config.canvasWidthTakingScalingIntoAccount / 2
  y = Config.canvasHeightTakingScalingIntoAccount / 2
  width = 16
  height = 16
  color = 'red'
  tileEngine: TileEngine

  constructor(props: AlienProps) {
    super(props)
    this.tileEngine = props.tileEngine
  }

  update = () => {
    if (keyPressed('up')) {
      if (
        this.tileEngine.sy === 0 ||
        this.y > Config.canvasHeightTakingScalingIntoAccount / 2
      ) {
        this.y = this.y > stepSize ? this.y - stepSize : 0
      } else {
        this.tileEngine.sy = this.tileEngine.sy - stepSize
      }
    } else if (keyPressed('down')) {
      if (
        this.tileEngine.sy ===
          this.tileEngine.mapheight -
            Config.canvasHeightTakingScalingIntoAccount ||
        this.y < Config.canvasHeightTakingScalingIntoAccount / 2
      ) {
        this.y =
          this.y <
          Config.canvasHeightTakingScalingIntoAccount - stepSize - this.height
            ? this.y + stepSize
            : Config.canvasHeightTakingScalingIntoAccount - this.height
      } else {
        this.tileEngine.sy = this.tileEngine.sy + stepSize
      }
    }

    if (keyPressed('left')) {
      if (
        this.tileEngine.sx === 0 ||
        this.x > Config.canvasWidthTakingScalingIntoAccount / 2
      ) {
        this.x = this.x > stepSize ? this.x - stepSize : 0
      } else {
        this.tileEngine.sx = this.tileEngine.sx - stepSize
      }
    } else if (keyPressed('right')) {
      if (
        this.tileEngine.sx ===
          this.tileEngine.mapwidth -
            Config.canvasWidthTakingScalingIntoAccount ||
        this.x < Config.canvasWidthTakingScalingIntoAccount / 2
      ) {
        this.x =
          this.x <
          Config.canvasWidthTakingScalingIntoAccount - stepSize - this.width
            ? this.x + stepSize
            : Config.canvasWidthTakingScalingIntoAccount - this.width
      } else {
        this.tileEngine.sx = this.tileEngine.sx + stepSize
      }
    }
  }
}
