<script lang="ts">
  import Canvas from "./lib/Canvas.svelte";
  import ObjectsTab from "./lib/ObjectsTab.svelte";
  import PropertiesTab from "./lib/PropertiesTab.svelte";
</script>

<main>
  <ObjectsTab></ObjectsTab>
  <Canvas></Canvas>
  <PropertiesTab></PropertiesTab>
</main>

<style>
  main {
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
