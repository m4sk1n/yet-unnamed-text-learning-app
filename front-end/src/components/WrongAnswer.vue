<template>
  <v-card
    class="wrong-answer-screen ma-3 pa-3"
    :dark="!darkMode"
    :light="darkMode"
  >
    <div class="d-flex">
      <v-icon class="error--text" large>mdi-alert-box</v-icon>
    </div>
    <div class="ml-3">
      <span class="error--text">
        {{ $t('session.correct_answer') }}
      </span>
      <br>
      <div class="wrong-answer-text">{{ error.result }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    error: Object,
  },

  computed: {
    darkMode() {
      return this.$store.getters['settings/all'].darkMode;
    }
  },
}
</script>

<style scoped lang="scss">
.wrong-answer-screen {
  display: flex;
  bottom: 0;
  z-index: 1;
  max-height: 16em;
}
.wrong-answer-text {
  white-space: pre-wrap;
  max-height: calc(100% - 16px);
  overflow: auto;
}
</style>