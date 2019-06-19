<template>
  <div
    class="app-progress-bar"
    :style="{ 'width': `${progress / exercises * 100}%` }"
  ></div>
</template>

<script>
export default {
  props: {
    exercises: Number,
    progress: Number,
  }
}
</script>


<style scoped lang="scss">
.app-progress-bar {
  border-top: 4px solid #2196f3;
  transition: width 1s;
}
</style>
