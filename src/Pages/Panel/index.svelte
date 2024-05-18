<script>
  import Header from "./components/header.svelte"
  import Upload from "./components/upload.svelte"
  import TopSubNav from "./components/topSubNav.svelte"
  import SignaturePanel from "./shared/signaturePanel.svelte"

  let showSignPanel = false
  let pdf
  let showPdf = false
  let signImg

  $:{
    console.log(signImg);
  }

</script>

<div class="relative flex min-h-screen w-screen flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-r from-gray-700 to-gray-900">
  <Header />
  <TopSubNav on:click={() => (showSignPanel = true)} bind:showPdf />
  <Upload bind:pdf bind:showPdf />
</div>

<SignaturePanel bind:showSignPanel bind:signImg/>
