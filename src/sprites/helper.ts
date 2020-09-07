export const loadImage = (src: string) => {
  const image = new Image()
  image.src = src
  return new Promise((resolve) => (image.onload = resolve))
}
