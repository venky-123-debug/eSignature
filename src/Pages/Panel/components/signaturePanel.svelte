<script>
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  export let showSignPanel = false
  export let canvas
  export let signatureDrawn = false
  export let showPdf = false
  $: console.log({ showSignPanel, showPdf })
</script>

<div class:hidden={!showSignPanel && !showPdf} class="relative z-10">
  <div class="fixed inset-0 z-30 bg-black/60 backdrop-blur-md transition-opacity" />
  <div class="fixed inset-0 z-40 flex w-screen flex-col items-center justify-center gap-3 overflow-y-auto">
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <!-- <div class="relative"> -->
      <canvas on:mousedown on:mousemove on:mouseup on:mouseout on:touchstart on:touchmove on:touchend bind:this={canvas} width="400" height="200" class="cursor-pointer rounded-md border border-gray-500 bg-white z-30" />
      <!-- <div class="absolute inset-x-0 bottom-1.5 flex w-full items-center justify-between px-1.5">
        <button on:click={() => dispatch("close")} type="button" class="flex min-w-fit items-center justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-900 active:bg-gray-800">Close</button>
        <button on:click={() => dispatch("ok")} type="button" class="flex min-w-fit items-center justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-600 active:bg-green-500">Ok</button>
      </div>
    </div> -->
    <div class="flex items-center justify-center gap-3">
      <button on:click type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600 active:bg-red-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Clear</button>
      <button on:click={() => dispatch("downloadSignature")} type="button" class="flex min-w-[36px] items-center justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600 active:bg-blue-500 disabled:cursor-not-allowed" disabled={!signatureDrawn}>Download Signature</button>
    </div>
  </div>
</div>
