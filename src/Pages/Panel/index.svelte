<script>
  import { onMount } from "svelte"
  import Header from "./components/header.svelte"

  let canvas
  let ctx
  let isDrawing = false
  let signatureDrawn = false // Track if signature has been drawn

  onMount(() => {
    try {
      if (canvas) {
        ctx = canvas.getContext("2d")
      }
    } catch (error) {
      console.error(error)
    }
  })

  const startDrawing = (e) => {
    isDrawing = true
    draw(e)
  }

  const draw = (e) => {
    if (!isDrawing) return

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000"

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)

    signatureDrawn = true // Set signature drawn to true
  }

  const startDrawingTouch = (e) => {
    isDrawing = true
    drawTouch(e.touches[0])
  }

  const drawTouch = (e) => {
    if (!isDrawing) return

    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000"

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)

    signatureDrawn = true // Set signature drawn to true
  }

  const stopDrawing = () => {
    isDrawing = false
    ctx.beginPath()
  }

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    signatureDrawn = false // Reset signature drawn
  }

  const downloadSignature = () => {
    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = url
    link.download = "signature.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
</script>

<div class="flex min-h-screen relative w-screen flex-col items-center bg-gradient-to-r from-gray-700 to-gray-900 justify-center gap-3 overflow-hidden">
  <Header />
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <canvas on:mousedown={startDrawing} on:mousemove={draw} on:mouseup={stopDrawing} on:mouseout={stopDrawing} on:touchstart={startDrawingTouch} on:touchmoveh={drawTouch} on:touchend={drawTouch} bind:this={canvas} width="400" height="200" class="border cursor-pointer border-gray-500 bg-white rounded-md" />
  <div class="flex items-center justify-center gap-3">
    <button on:click={clearCanvas} type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600 active:bg-red-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Clear</button>
    <button on:click={downloadSignature} type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600 active:bg-blue-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Download Signature</button>
  </div>
</div>
