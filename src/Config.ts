const dimension = 320

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
  context.canvas.height = height / 2
  context.canvas.style.marginTop = `${height / 4}px`
  context.canvas.width = dimension
}
