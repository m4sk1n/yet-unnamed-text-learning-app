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
        :disabled="!!error"
      >
        <v-chip v-for="line in options"
          :key="line"
          :dark="!!error && !darkMode"
          :light="!!error && darkMode"
        >
          <v-avatar left>
            <v-icon small>mdi-reorder-vertical</v-icon>
          </v-avatar>
          <span>{{ line }}</span>
        </v-chip>
      </draggable>
      <p v-if="exercise.subsequentSibling" class="gradient-to-bottom pl-2 pt-3">
        {{ exercise.subsequentSibling }}
      </p>
    </div>
    <v-spacer />
    <div class="exercise-bottom mx-3 mb-3">
      <Error v-if="error"
        :error="error"
      />
      <v-spacer />
      <ButtonCheck :check="check" />
    </div>
  </fragment>
</template>

<script>
import draggable from 'vuedraggable';
import ButtonCheck from '@/components/ButtonCheck';
import Error from '@/components/Error';

export default {
  components: {
    draggable,
    ButtonCheck,
    Error,
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
      return this.$store.getters['settings/all'].darkMode;
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
        this.error = this.session.check(this.options.join(' '));
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>
