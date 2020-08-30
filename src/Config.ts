const dimension = 320

export const configureContext = (context: CanvasRenderingContext2D) => {
  context.canvas.height = dimension
  context.canvas.width = dimension
}
