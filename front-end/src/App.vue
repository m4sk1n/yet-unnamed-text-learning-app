<template>
  <v-app :dark="darkMode">
    <v-flex sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
      <router-view></router-view>
    </v-flex>
  </v-app>
</template>

<script>
export default {
  computed: {
    darkMode() {
      return this.$store.state['settings'].settings.darkMode;
    }
  },

  created() {
    this.$store.dispatch('courses/refreshCourses');
    this.$store.dispatch('settings/loadSettings');
  },
}
</script>

<style lang="scss">
.v-content .v-content__wrap {
  display: flex;
  flex-direction: column;
}

.view-card {
  height: calc(100vh);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.exercise-bottom {
  display: flex;
}

::-webkit-scrollbar {
  width: calc(1em / 3);
}

::-webkit-scrollbar-thumb {
  background: #AAA;
  border-radius: calc(1em / 6);
}
</style>
