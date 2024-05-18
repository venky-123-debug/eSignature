<script>
  import { createEventDispatcher, onMount } from "svelte"
  const dispatch = createEventDispatcher()
  export let signImg
  export let showSignPanel = false

  let canvas
  let ctx
  let isDrawing = false
  let signatureDrawn = false
  let showPdf = false

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
    ctx.clearRect(0, 0, canvas.width, canvas.height)

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
  const placeSign = () => {
    const aspectRatio = 5.5 / 1.2

    // Calculate new dimensions while maintaining aspect ratio
    let newWidth, newHeight
    if (canvas.width / canvas.height > aspectRatio) {
      newWidth = (canvas.height * aspectRatio) / 1.5
      newHeight = canvas.height
    } else {
      newWidth = canvas.width / 1.5
      newHeight = canvas.width / aspectRatio
    }

    // Create a temporary canvas to hold the resized image
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")

    // Set the new canvas dimensions
    tempCanvas.width = newWidth
    tempCanvas.height = newHeight

    // Set transparent background
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height)

    // Draw the original signature onto the temporary canvas with the new dimensions
    tempCtx.drawImage(canvas, 0, 0, newWidth, newHeight)

    // Update the signImg with the resized signature with transparent background
    signImg = tempCanvas.toDataURL("image/png")
  }

  const closePanel = () => {
    try {
      showSignPanel = false
      clearCanvas()
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div class:hidden={!showSignPanel && !showPdf} class="relative z-10">
  <div class="fixed inset-0 z-30 bg-black/60 backdrop-blur-md transition-opacity" />
  <div class="fixed inset-0 z-40 flex w-screen flex-col items-center justify-center gap-3 overflow-y-auto">
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <canvas on:mousedown={startDrawing} on:mousemove={draw} on:mouseup={stopDrawing} on:mouseout={stopDrawing} on:touchstart={startDrawingTouch} on:touchmove={drawTouch} on:touchend={drawTouch} bind:this={canvas} width="400" height="200" class="z-30 cursor-pointer rounded-md border border-gray-500 bg-white" />
    <div class="flex items-center justify-center gap-3">
      <button on:click={closePanel} type="button" class="flex min-w-fit items-center justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-900 active:bg-gray-800">Close</button>
      <button on:click={placeSign} type="button" class="flex min-w-fit items-center justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-600 active:bg-green-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Place Signature</button>
      <button on:click={clearCanvas} type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600 active:bg-red-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Clear</button>
      <button on:click={downloadSignature} type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600 active:bg-blue-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Download Signature</button>
    </div>
  </div>
</div>
