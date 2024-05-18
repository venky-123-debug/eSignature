<script>
  import { onMount } from "svelte"
  import Header from "./components/header.svelte"
  import Upload from "./components/upload.svelte"
  import TopSubNav from "./components/topSubNav.svelte"
  import SignaturePanel from "./shared/signaturePanel.svelte"

  let canvas
  let ctx
  let isDrawing = false
  let signatureDrawn = false
  let showSignPanel = false
  let pdf
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

    signatureDrawn = true 
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

    signatureDrawn = true 
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
    try {
      console.log(canvas.toDataURL("image/png"))
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="relative flex min-h-screen w-screen flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-r from-gray-700 to-gray-900">
  <Header />
  <TopSubNav on:click={() => (showSignPanel = true)} bind:showPdf />
  <Upload bind:pdf bind:showPdf />
</div>

<SignaturePanel on:mousedown={startDrawing} on:mousemove={draw} on:mouseup={stopDrawing} on:mouseout={stopDrawing} on:touchstart={startDrawingTouch} on:touchmove={drawTouch} on:touchend={drawTouch} bind:canvas bind:signatureDrawn bind:showSignPanel on:click={clearCanvas} on:downloadSignature={downloadSignature} on:close={() => (showSignPanel = false)} on:ok={placeSign}/>
