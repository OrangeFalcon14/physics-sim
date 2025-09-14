<script lang="ts">
  import Canvas from "./lib/Canvas.svelte";
  import ObjectsTab from "./lib/ObjectsTab.svelte";
  import PropertiesTab from "./lib/PropertiesTab.svelte";
  import CenterPanel from "./lib/CenterPanel.svelte";
</script>

<main>
  <ObjectsTab></ObjectsTab>
  <CenterPanel />
  <PropertiesTab></PropertiesTab>
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: stretch;
  }
</style>
