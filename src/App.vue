<template>
  <div id="app">
    <Canvas />
    <HomePage />
  </div>
</template>

<script>
import Canvas from "./components/canvas";
import HomePage from "./components/homepage";
export default {
  name: "app",
  components: { Canvas, HomePage }
};
</script>

<style>
</style>
