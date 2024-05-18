<script>
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  export let showSignPanel = false
  export let canvas
  export let signatureDrawn = false
  export let showPdf = false
</script>

<div class:hidden={showSignPanel && showPdf} class="relative z-10">
  <div class="fixed inset-0 z-30 bg-black/60 backdrop-blur-md transition-opacity" />
  <div class="fixed inset-0 z-40 flex w-screen flex-col items-center justify-center gap-3 overflow-y-auto">
    <div class="flex h-auto w-3/5 flex-col bg-black/60 rounded-md gap-6 border border-dashed border-gray-700 p-6 shadow-2xl">
      <h1 class="text-left font-semibold text-lg text-orange-500">Draw and Place Signature</h1>
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <canvas on:mousedown on:mousemove on:mouseup on:mouseout on:touchstart on:touchmove on:touchend bind:this={canvas} width="400" height="100" class="z-30 cursor-pointer rounded-md border border-gray-500 bg-white" />
      <div class="flex w-full items-center justify-start gap-3">
        <button on:click={() => dispatch("close")} type="button" class="flex min-w-fit items-center justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-900 active:bg-gray-800">Close</button>
        <button disabled={!signatureDrawn} on:click={() => dispatch("ok")} type="button" class="flex min-w-fit items-center justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-600 active:bg-green-500 disabled:cursor-not-allowed">Place Signature</button>
      </div>
    </div>
    <div class="flex w-3/5 items-center justify-end gap-3">
      <button on:click type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600 active:bg-red-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Clear</button>
      <button on:click={() => dispatch("downloadSignature")} type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600 active:bg-blue-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Download Signature</button>
    </div>
  </div>
</div>
