<template>
  <v-card tile>
    <v-card-title primary-title class="headline">
      {{ $t('dialogs.edit_course.header_edit') }}

      <v-spacer />
      
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            v-on="on"
          >
            <v-icon
            >mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            @click="exportCourse"
          >
            {{ $t('dialogs.edit_course.button_export') }}
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn
        icon
        small
      >
        <v-icon
          @click="dismiss"
        >mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-text-field
        class="pb-2"
        v-model="title"
        :rules="[v => !!v || $t('errors.no_title')]"
        :label="$t('dialogs.edit_course.label_title')"
        required
      ></v-text-field>

      <v-label>
        {{ $t('dialogs.edit_course.label_color') }}
      </v-label>

      <PickColor 
        :color="color"
        @changeColor="(c) => color = c"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="red accent-4"
        flat
        @click="showDeleteDialog = true"
      >{{ $t('general.delete') }}</v-btn>

      <v-btn
        color="orange accent-4"
        flat
        @click="showResetDialog = true"
      >{{ $t('general.reset') }}</v-btn>

      <v-spacer />

      <v-btn
        color="primary"
        :disabled="!contentIsValid"
        @click="update"
      >
        {{ $t('general.update') }}
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="showDeleteDialog"
      max-width=400
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('dialogs.edit_course.delete_warning_heading', { title: originalTitle }) }}
        </v-card-title>
        <v-card-text>
          {{ $t('dialogs.edit_course.delete_warning_desc') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            flat
            @click="showDeleteDialog = false;"
          >
            {{ $t('general.cancel') }}
          </v-btn>

          <v-btn
            flat
            @click="deleteCourse"
          >
            {{ $t('general.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showResetDialog"
      max-width=400
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('dialogs.edit_course.reset_warning_heading', { title: originalTitle }) }}
        </v-card-title>
        <v-card-text>
          {{ $t('dialogs.edit_course.reset_warning_desc') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            flat
            @click="showResetDialog = false;"
          >
            {{ $t('general.cancel') }}
          </v-btn>

          <v-btn
            flat
            @click="resetCourse"
          >
            {{ $t('general.reset') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import PickColor from '@/components/Dialogs/PickColor';

export default {
  props: {
    dismiss: Function,
    uuid: String,
  },

  components: {
    PickColor,
  },

  data() {
    return {
      title: '',
      originalTitle: '',
      color: '',
      showDeleteDialog: false,
      showResetDialog: false,
    };
  },

  computed: {
    contentIsValid() {
      return !!this.title;
    },
  },

  created() {
    const courseDetails = this.$store.state['courses'].courseList
      .find(({ uuid }) => uuid === this.uuid);
    this.title = courseDetails.title;
    this.originalTitle = courseDetails.title;
    this.color = courseDetails.color;
  },

  methods: {
    update() {
      this.$store.dispatch('courses/updateCourseDetails', {
        uuid: this.uuid,
        title: this.title,
        color: this.color,
      });
      this.$store.dispatch('alerts/add', {
        text: this.$t('alerts.edited_course_details'),
        type: 'success',
        timeout: 2000,
      });
      this.dismiss();
    },

    deleteCourse() {
      this.$store.dispatch('courses/deleteCourse', this.uuid);
      this.$store.dispatch('alerts/add', {
        text: this.$t('alerts.deleted_course'),
        type: 'success',
        timeout: 2000,
      });
      this.dismiss();
    },

    resetCourse() {
      this.$store.dispatch('courses/resetCourse', this.uuid);
      this.$store.dispatch('alerts/add', {
        text: this.$t('alerts.reset_course'),
        type: 'success',
        timeout: 2000,
      });
      this.dismiss();
    },

    exportCourse() {
      let course = {};
      course.details = this.$store.state['courses'].courseList
        .find(({ uuid }) => uuid === this.uuid);
      course.content = this.$store.state['courses'].courses[this.uuid];
      const blob = new Blob([JSON.stringify(course)], { type: 'application/json' });
      const el = document.createElement('a');
      el.download = `export-${this.uuid}.json`;
      el.href = window.URL.createObjectURL(blob);
      el.click();
    },
  },
}
</script>
