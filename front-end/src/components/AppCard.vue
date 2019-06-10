<template>
  <v-card class="app-card">
    <ProgressBar
      :progress="session.progress"
      :exercises="session.exercises"
    />
    <ExerciseResolver v-if="!session.finished"
      :session="session"
      :exercise="session.exercise"
    />
  </v-card>
</template>

<script>
import ExerciseResolver from '@/components/Exercises/Resolver';
import ProgressBar from '@/components/ProgressBar';

export default {
  components: {
    ExerciseResolver,
    ProgressBar,
  },
  
  props: {
    session: Object,
  },
}
</script>
