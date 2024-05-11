<script>
  import { loadJs } from "../../../scripts/loadLibrary"
  export let pdf
  export let showPdf = false
  let pdfData = ""
  let numPages = 0
  let currentPage = 1
  let canvas
  let pdfInput

  const handleFileUpload = () => {
    try {
      const file = pdfInput.files[0]

      if (file) {
        const reader = new FileReader()

        reader.onload = (event) => {
          pdfData = event.target.result
          displayPDF(pdfData)
        }

        reader.readAsArrayBuffer(file)
      }
      showPdf = true
    } catch (error) {
      console.error(error)
    }
  }

  async function displayPDF(data) {
    if (!document.getElementById("pdfjs")) {
      await loadJs("pdfjs", "lib/pdf.min.js")
    }
    if (!document.getElementById("pdfjsworker")) {
      await loadJs("pdfjsworker", "lib/pdf.worker.min.js")
    }
    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = "lib/pdf.worker.js"

    const loadingTask = pdfjsLib.getDocument({ data })
    pdf = await loadingTask.promise

    numPages = pdf.numPages

    const context = canvas.getContext("2d")

    renderPage(pdf, context, 1)
  }

  async function renderPage(pdf, context, pageNumber) {
    const page = await pdf.getPage(pageNumber)

    const viewport = page.getViewport({ scale: 1.5 })
    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    }

    await page.render(renderContext)
  }

  function nextPage() {
    if (currentPage < numPages) {
      currentPage++
      renderPage(pdf, canvas.getContext("2d"), currentPage)
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--
      renderPage(pdf, canvas.getContext("2d"), currentPage)
    }
  }

  const removePdf = () => {
    try {
      pdfInput = ""
      showPdf = false
    } catch (error) {
      console.error(error)
    }
  }
</script>

{#if showPdf}
  <div class="relative mt-20">
    <canvas bind:this={canvas} id="pdfCanvas" class="aspect-auto max-h-[500px] min-h-[450px] min-w-fit rounded-md" />
    <button on:click={removePdf} type="button" class="absolute right-3 top-3 z-10">
      <i class="fa-solid fa-circle-xmark text-lg text-red-600" />
    </button>
  </div>

  <div class="flex items-center gap-3">
    <button type="button" class:hidden={currentPage == 1} class="flex h-8 w-8 items-center justify-center rounded-full border border-white text-white disabled:cursor-not-allowed" on:click={prevPage}><i class="fa-solid fa-chevron-left" /></button>
    <span class="text-base font-semibold text-white">
      <span class="w-9 min-w-[20px]">{currentPage}</span>
      /
      <span class="w-9 min-w-[20px]">{numPages}</span>
    </span>

    <button class:hidden={currentPage == numPages} type="button" class="flex h-8 w-8 items-center justify-center rounded-full border border-white text-white disabled:cursor-not-allowed" on:click={nextPage}><i class="fa-solid fa-chevron-right" /></button>
  </div>
{:else}
  <div class="relative w-3/5 rounded-md border border-dashed border-gray-700 shadow-2xl hover:border-white">
    <div class="mt-2 flex justify-center px-6 py-10">
      <div class="text-center text-white">
        <i class="fas fa-file-pdf text-3xl" />
        <div class="mt-4 flex text-base leading-6">
          <span>Upload a file</span>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-sm leading-5">Upload only .pdf file</p>
      </div>
    </div>
    <input bind:this={pdfInput} id="pdfFile" type="file" class="absolute inset-0 h-full w-full cursor-pointer opacity-0" accept=".pdf" on:input={handleFileUpload} />
  </div>
{/if}
