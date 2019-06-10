<template>
  <v-card class="view-card">
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout
        row
        wrap
      >
        <v-flex v-for="course in courses"
          :key="course.uuid"
          xs12
        >
          <v-card
          class="white--text"
          :color="`${course.color} darken-2`"
          >
            <v-card-title primary-title
            >
              <div>
                <div class="headline">{{ course.title }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                @click="startSession(course)"
                flat
                dark
              >{{ $t('general.learn') }}</v-btn>

              <v-spacer></v-spacer>

              <v-btn
                flat
                icon
                dark
                @click="displayEditDialog(course)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-card-actions>
            <ProgressBar
              :exercises=100
              :progress="course.progress"
            />
          </v-card>
        </v-flex>
        <v-flex v-if="!courses.length"
          class="xs-12"
        >
          <i18n path="courses_list.no_courses" tag="p" class="headline text-xs-center">
            <v-icon>mdi-plus</v-icon>
          </i18n>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="showEditDialog"
      max-width=600
    >
      <DialogEditCourse v-if="showEditDialog"
        :dismiss="dismissEditDialog"
        :uuid="courseToEdit.uuid"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import DialogEditCourse from '@/components/Dialogs/DialogEditCourse';
import ProgressBar from '@/components/ProgressBar';

export default {
  name: 'courses',

  components: {
    ProgressBar,
    DialogEditCourse
  },

  data() {
    return {
      showEditDialog: false,
      courseToEdit: undefined,
    };
  },

  computed: {
    courses() {
      return [...this.$store.getters['courses/list']]
        .sort((a, b) => { return b.updatedAt - a.updatedAt });
    },
  },

  created() {
    if (this.$route.query.alert) {
      this.$store.dispatch('alerts/add', {
        text: this.$route.query.alert,
        type: 'info',
        timeout: 2000,
      });
      this.$router.push({ query: { } });
    }
  },

  methods: {
    dismissEditDialog() {
      this.showEditDialog = false;
      this.courseToEdit = undefined;
    },

    displayEditDialog(course) {
      this.showEditDialog = true;
      this.courseToEdit = course;
    },

    startSession(course) {
      if (course.progress == 100) {
        this.$store.dispatch('alerts/add', {
          text: this.$t('alerts.finished_course'),
          type: 'info',
          timeout: 2000,
        });
        return;
      }
      this.$router.push(`/session/${course.uuid}`);
    },
  },
}
</script>
