<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-list>
      <v-subheader>{{ $t('settings.header_general') }}</v-subheader>

      <v-list-tile
        @click="$store.dispatch('settings/changeSetting', {
          key: 'darkMode',
          value: !darkMode,
        })"
      >
        <v-list-tile-action>
          <v-switch
            :value="darkMode"
          ></v-switch>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ $t('settings.dark_mode') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      
      <v-list-tile>
        <v-list-tile-action>
          <v-select
            style="width: min-content"
            :value="exercisesAmount"
            :items="[5,10,15,25,40]"
            @change="$store.dispatch('settings/changeSetting', {
              key: 'exercisesAmount',
              value: $event,
            })"
          ></v-select>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('settings.exercises_amount') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      
      <v-list-tile>
        <v-list-tile-action>
          <v-select
            style="width: min-content"
            :value="language"
            :items="langs"
            item-text="lang"
            item-value="code"
            @change="$store.dispatch('settings/changeSetting', {
              key: 'language',
              value: $event,
            }); $i18n.locale = $event;"
          ></v-select>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('settings.language') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-subheader>{{ $t('settings.header_backup') }}</v-subheader>

      <v-list-tile
        @click="exportAllCourses()"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('settings.export_all') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        @click="importMultipleCourses()"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('settings.import_multiple') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        @click="importCourse()"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('settings.import_single') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-subheader>{{ $t('about.about') }}</v-subheader>
      
      <v-list-tile class="longer-setting">
        <v-list-tile-content>
          {{ $t('about.about_desc') }}
          <br>
          {{ $t('about.license_info') }}
          <br>
          <i18n path="about.author_info">
            <a href="https://mkljczk.pl">Marcin Mikołajczak</a>
          </i18n>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-dialog
      v-model="showImportDialog"
      max-width=600
    >
      <v-card tile>
        <v-card-title primary-title class="headline">
          {{ $t('settings.duplicates_heading') }}
        </v-card-title>

        <v-card-text>
          {{ $t('settings.duplicates_desc') }}
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="red accent-4"
            flat
            @click="showImportDialog = false; continueImport = undefined"
          >{{ $t('general.abort') }}</v-btn>

          <v-btn
            color="orange accent-4"
            flat
            @click="continueImport('skip')"
          >{{ $t('general.skip') }}</v-btn>

          <v-spacer />

          <v-btn
            color="primary"
            flat
            @click="continueImport()"
          >{{ $t('settings.duplicates_import') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import localForage from 'localforage';
import langs from '@/locales/meta.json'

export default {
  name: 'settings',

  data() {
    return {
      showImportDialog: false,
      continueImport: undefined,
      duplicateCourseName: '',
      langs,
    };
  },

  computed: {
    darkMode() {
      return this.$store.getters['settings/all'].darkMode;
    },

    exercisesAmount() {
      return this.$store.getters['settings/all'].exercisesAmount;
    },

    language() {
      return this.$store.getters['settings/all'].language;
    },
  },

  methods: {
    exportAllCourses() {
      const courses = [];
      for (const details of this.$store.getters['courses/list']) {
        courses.push({
          details,
          content: this.$store.getters['courses/courses'][details.uuid],
        });
      }
      const blob = new Blob([JSON.stringify(courses)], { type: 'application/json' });
      const el = document.createElement('a');
      el.download = `export-all-${Date.now() % 1000000}.json`;
      el.href = window.URL.createObjectURL(blob);
      el.click();
    },

    importMultipleCourses() {
      this.continueImport = undefined;
      const dialog = document.createElement('input');
      dialog.type = 'file';
      dialog.accept = 'application/json';
      dialog.click();
      dialog.onchange = (e) => {
        if (!e.target.files.length) {
          return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          const courses = JSON.parse(ev.target.result);
          const continueImport = (handling) => {
            for (const course of courses) {
              if (handling !== 'skip' || !this.$store.getters['courses/courses'][course.details.uuid]) {
                this.$store.dispatch('courses/importCourse', course);
              }
            }
            this.showImportDialog = false;
          };
          for (const course of courses) {
            if (this.$store.getters['courses/courses'][course.details.uuid]) {
              this.showImportDialog = true;
            }
          }
          if (this.showImportDialog) {
            this.continueImport = continueImport;
          } else {
            continueImport();
          }
        };
        reader.readAsText(file);
      };
    },

    importCourse() {
      const dialog = document.createElement('input');
      dialog.type = 'file';
      dialog.accept = 'application/json';
      dialog.click();
      dialog.onchange = (e) => {
        if (!e.target.files.length) {
          return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          const course = JSON.parse(ev.target.result);
          this.$store.dispatch('courses/importCourse', course);
        };
        reader.readAsText(file);
      };
    },
  },
}
</script>

<style lang="scss">
  .longer-setting > .v-list__tile {
    height: auto;
  }
</style>
