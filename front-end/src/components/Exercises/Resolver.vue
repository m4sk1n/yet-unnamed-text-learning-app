<template>
  <component
    :is="EXERCISES[exercise.type]"
    :exercise="exercise"
    :key="exercise.uuid"
    :session="session"
    :exit="exit"
  >
  </component>
</template>


<script>
import ExerciseOrder from '@/components/Exercises/ExerciseOrder.vue';
import ExerciseOrderWords from '@/components/Exercises/ExerciseOrderWords.vue';
import ExerciseSelect from '@/components/Exercises/ExerciseSelect.vue';
import ExerciseSelectWords from '@/components/Exercises/ExerciseSelectWords.vue';
import ExerciseWriteWords from '@/components/Exercises/ExerciseWriteWords.vue';

export default {
  components: {
    ExerciseOrder,
  },

  props: {
    exercise: Object,
    session: Object,
    exit: Function,
  },

  data() {
    return {
      EXERCISES: {
        'ordering': ExerciseOrder,
        'word-ordering': ExerciseOrderWords,
        'selecting': ExerciseSelect,
        'word-selecting': ExerciseSelectWords,
        'writing': ExerciseWriteWords,
        'word-writing': ExerciseWriteWords,
      },
    };
  },

  watch: {
    exercise() {
      if (this.session.finished) {
        this.$store.dispatch('alerts/add', {
          text: this.$t('alerts.finished_session'),
          type: 'success',
          timeout: 2000,
        });
        this.exit();
      }
    }
  },
}
</script>
