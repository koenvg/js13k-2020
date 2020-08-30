const dimension = 320
const scalingFactor = 1

export const configureContext = (context: CanvasRenderingContext2D) => {
  context.canvas.height = dimension
  context.canvas.width = dimension
  context.scale(scalingFactor, scalingFactor)
  // context.imageSmoothingEnabled = false
}

export const canvasWidthTakingScalingIntoAccount = dimension / scalingFactor

export const canvasHeightTakingScalingIntoAccount = dimension / scalingFactor
