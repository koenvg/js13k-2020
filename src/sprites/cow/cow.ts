import { Sprite, SpriteSheet, loadImage } from 'kontra'
import { SpriteProps } from 'sprites/types'
// @ts-ignore
import cowSrc from './Cow.png'

class Cow extends Sprite {
  width = 48
  height = 48
}

const createAnimations = (image: HTMLImageElement) => {
  const spriteSheet = SpriteSheet({
    image: image,
    frameWidth: 48,
    frameHeight: 48,
    animations: {
      idle: {
        frames: [0, 1, 2, 3],
        frameRate: 1,
      },
    },
  })
  return spriteSheet.animations
}
export const createCow = async (props: SpriteProps) => {
  const image = await loadImage(cowSrc)

  return new Cow({ ...props, animations: createAnimations(image) })
}
