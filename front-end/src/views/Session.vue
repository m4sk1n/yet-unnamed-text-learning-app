<template>
  <v-card class="view-card">
    <v-toolbar color="primary">
      <v-btn
        icon
        dark
        @click.stop="showExitDialog = true"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-dialog
      v-model="showExitDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{ $t('session.exit_prompt_heading') }}</v-card-title>
        
        <v-card-text>
          {{ $t('session.exit_prompt_desc') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            flat
            color="red darken-1"
            @click="exit"
          >
            {{ $t('general.exit') }}
          </v-btn>

          <v-btn
            flat
            color="green darken-1"
            @click="showExitDialog = false"
          >
            {{ $t('general.continue') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ProgressBar v-if="session"
      :progress="session.progress"
      :exercises="session.exercises"
    />
    <ExerciseResolver v-if="session"
      :session="session"
      :exercise="session.exercise"
      :exit="exit"
    />
  </v-card>
</template>

<script>
import { Content, Session } from 'yet-unnamed-text-learning-app-core';
import ExerciseResolver from '@/components/Exercises/Resolver';
import ProgressBar from '@/components/ProgressBar';

export default {
  async created() {
    this.content = Content.parse(
      this.$store.getters['courses/courses'][this.$route.params.uuid]
    );
    this.session = new Session({ content: this.content, exercises: this.$store.getters['settings/all'].exercisesAmount });
    if (this.session.finished) {
      this.$store.dispatch('alerts/add', {
        text: this.$t('alerts.finished_course'),
        type: 'info',
        timeout: 2000,
      });
    }
  },
  
  components: {
    ExerciseResolver,
    ProgressBar,
  },

  data() {
    return {
      content: undefined,
      session: undefined,
      showExitDialog: false,
    };
  },

  methods: {
    saveProgress(uuid) {
      this.$store.dispatch('courses/updateCourse', { course: this.content, uuid })
    },
    exit() {
      Content.getProgress(this.content);
      this.saveProgress(this.$route.params.uuid);
      this.showExitDialog = false;
      this.$router.push({
        path: '/',
      });
    },
  },
}
</script>
