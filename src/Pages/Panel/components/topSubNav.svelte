<script>
  export let showPdf = false
</script>

<div class:hidden={!showPdf} class=" absolute top-16 z-10 flex h-10 w-full items-center bg-gradient-to-r from-black/20 shadow-xl">
  <button on:click type="button" class="mx-auto flex h-9 min-w-fit items-center justify-center rounded-md border border-gray-600 px-3 py-1.5 text-base font-semibold text-white hover:bg-gray-900 active:bg-gray-800">Add Signature</button>
</div>
