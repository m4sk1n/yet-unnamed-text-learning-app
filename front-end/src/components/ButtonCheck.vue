<template>
  <div class="button-check">
    <v-spacer />
    <v-btn
      class="right blue"
      fab
      large
      dark
      @click="check"
    >
      <v-icon large>
        mdi-chevron-right
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    check: Function,
  },
}
</script>

<style scoped lang="scss">
  .button-check {
    display: flex;
    z-index: 2;
    flex-direction: column;
  }
</style>
