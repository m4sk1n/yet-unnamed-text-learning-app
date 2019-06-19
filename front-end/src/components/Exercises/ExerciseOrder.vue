<template>
  <fragment>
    <div class="mx-3 mt-3">
      <p v-if="exercise.precedingSibling"
        class="gradient-to-top pl-2"
      >
        {{ exercise.precedingSibling }}
      </p>
      <draggable
        :list="options"
        :disabled="error"
      >
        <div v-for="line in options"
          :key="line"
        >
          <v-chip
            class="chip-multiline"
            :class="{ 'py-1': line.includes('\n') }"
            :dark="error && !darkMode"
            :light="error && darkMode"
          >
            <v-avatar left>
              <v-icon small>mdi-reorder-horizontal</v-icon>
            </v-avatar>
            <span>{{ line }}</span>
          </v-chip>
        </div>
      </draggable>
      <p v-if="exercise.subsequentSibling"
        class="gradient-to-bottom pl-2 pt-3"
      >
        {{ exercise.subsequentSibling }}
      </p>
    </div>
    <v-spacer />
    <div class="exercise-bottom mx-3 mb-3">
      <WrongAnswer v-if="error"
        :error="error"
      />
      <v-spacer></v-spacer>
      <ButtonCheck :check="check" />
    </div>
  </fragment>
</template>

<script>
import draggable from 'vuedraggable';
import ButtonCheck from '@/components/ButtonCheck';
import WrongAnswer from '@/components/WrongAnswer';

export default {
  components: {
    draggable,
    ButtonCheck,
    WrongAnswer,
  },
  
  props: {
    exercise: Object,
    session: Object,
  },

  data() {
    return {
      error: undefined,
      options: [],
    };
  },

  computed: {
    darkMode() {
      return this.$store.state['settings'].settings.darkMode;
    }
  },

  created() {
    this.options =  [...this.exercise.shuffled];
  },

  methods: {
    check() {
      if (this.error) {
        this.error.next();
        this.error = undefined;
      } else {
        this.error = this.session.check(this.options.join('\n'));
      }
    },
  },
}
</script>

<style scoped lang="scss">
.chip-multiline .v-chip__content {
  white-space: pre-wrap;
  min-height: 32px !important;
  height: auto !important;
}
</style>
