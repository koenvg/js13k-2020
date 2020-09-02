const dimension = 480
const margin = 40

export const configureContext = (context: CanvasRenderingContext2D) => {
  const body = document.body
  const html = document.documentElement

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
  context.canvas.height = height / 2 - margin
  context.canvas.style.marginTop = `${height / 4 + margin / 2}px`
  context.canvas.width = dimension
}
