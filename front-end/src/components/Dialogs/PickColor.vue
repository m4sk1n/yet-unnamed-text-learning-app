<template>
  <div id="color-picker">
    <div
      v-for="(color, key) in colors"
      :key="key"
      class="color"
      :class="{
        'color-selected': currentColor === key,
      }"
      :style="`
        background-color: ${color.base}
      `"
      v-ripple
      @click="setColor(key)"
    >
      <v-icon v-if="currentColor === key"
        class="tick-icon"
        color="rgba(255,255,255,0.8)"
      >mdi-check</v-icon>
    </div>
  </div>
</template>

<script>
import colors from 'vuetify/es5/util/colors';

export default {
  props: {
    color: String,
  },

  data() {
    return {
      colors: {},
      currentColor: undefined,
    };
  },

  created() {
    for (const color of [
        'red', 'pink', 'purple', 'deepPurple',
        'indigo', 'blue', 'lightBlue', 'cyan',
        'teal', 'green', 'orange', 'deepOrange',
        'brown', 'blueGrey',
      ]) {
      this.colors[color] = colors[color];
    }
    this.currentColor = this.color;
  },

  methods: {
    setColor(color) {
      this.currentColor = color;
      this.$emit('changeColor', color.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase());
    }
  },
}
</script>

<style scoped lang="scss">

  .color {
    display: inline-block;
    height: 32px;
    width: 32px;
    border-radius: 16px;
    margin: 2px;
    text-align: center;
  }

  .color-selected {
    background-image: linear-gradient(white, white);
    background-blend-mode: soft-light;
  }

  .tick-icon {
    position: fixed;
    margin-left: -12px;
    margin-top: 4px;
  }
</style>
