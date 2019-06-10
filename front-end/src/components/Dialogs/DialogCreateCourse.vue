<template>
  <fragment>
    <v-stepper
      v-model="progress"
      vertical
    >
      <v-stepper-step
        :complete="progress > 1"
        step="1"
      >
        {{ $t('dialogs.create_course.step_details') }}
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-form
          @submit="validateDetails()"
          ref="details"
          lazy-validation
        >
          <v-text-field
            class="pb-2"
            v-model="title"
            :rules="[v => !!v || $t('errors.no_title')]"
            :label="$t('dialogs.create_course.label_title')"
            required
          ></v-text-field>
        </v-form>

        <v-label>
          {{ $t('dialogs.create_course.label_color') }}
        </v-label>

        <PickColor
          v-show="progress === 1"
          :color="color"
          @changeColor="(c) => color = c"
        />

        <v-btn
          type="submit"
          color="primary"
          @click="validateDetails()"
        >
          {{  $t('general.continue') }}
        </v-btn>

        <v-btn
          flat
          @click="dismiss()"
        >{{ $t('general.cancel') }}</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="progress > 2" step="2">
        {{ $t('dialogs.create_course.step_content') }}
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-form ref="content" lazy-validation>
          <v-textarea
            v-model="content"
            :rules="[
              v => !!v || $t('errors.no_content'),
              v => v && !v.trim().includes('\n\n\n')
                ||
              $t('errors.indentation'),
            ]"
            :label="$t('dialogs.create_course.label_content')"
          ></v-textarea>
        </v-form>

        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="!contentIsValid"
            @click="create()"
          >
            {{ $t('general.create') }}
          </v-btn>

          <v-btn
            flat
            @click="dismiss()"
          >
            {{ $t('general.cancel') }}
          </v-btn>

          <v-spacer />

          <v-btn
            flat
            @click="showHelp = true"
          >
            {{ $t('general.help') }}
          </v-btn>
        </v-card-actions>
      </v-stepper-content>
    </v-stepper>
    <v-bottom-sheet
      inset
      v-model="showHelp"
    >
      <v-flex
      >
      <v-card>
        <v-card-title class="headline">
          {{ $t('dialogs.create_course.help_headline') }}
          <v-spacer />
            <v-btn
              icon
              small
            >
              <v-icon
                @click="showHelp = false"
              >mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
          {{ $t('dialogs.create_course.help_desc') }}
          <br>
          <br>
          ‘Lorem ipsum dolor sit amet,
          <br>
          consectetur adipiscing elit.
          <br>
          Donec vitae vehicula enim.
          <br>
          Pellentesque eget hendrerit risus.
          <br>
          <br>
          Etiam ornare hendrerit eros.
          <br>
          Morbi volutpat, diam metus pretium,
          <br>
          ac ornare neque sem id tortor.
          <br>
          Maecenas sed rutrum dui, maximus nibh.
          <br>
          <br>
          Nunc vehicula nisl eget dui cursus,
          <br>
          eu lacinia purus finibus.
          <br>
          Proin tincidunt ut massa ut accumsan. 
          <br>
          Nunc tristique tortor et dolor auctor.’
        </v-card-text>
      </v-card>
      </v-flex>
    </v-bottom-sheet>
  </fragment>
</template>

<script>
import { Content } from 'yet-unnamed-text-learning-app-core';
import PickColor from '@/components/Dialogs/PickColor';

export default {
  props: {
    dismiss: Function,
  },

  components: {
    PickColor,
  },

  data() {
    return {
      content: undefined,
      title: undefined,
      progress: 1,
      color: 'blue',
      showHelp: false,
    };
  },

  computed: {
    contentIsValid() {
      return this.content && !this.content.trim().includes('\n\n\n');
    },
  },

  methods: {
    validateDetails() {
      if (this.$refs.details.validate()) {
        this.progress = 2;
      }
    },

    create() {
      if (this.$refs.content.validate()) {
        const content = new Content(this.content);
        const genUUID = a=>a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,genUUID)
        const uuid = genUUID();
        this.$store.dispatch('courses/addCourse', {
          course: content,
          details: {
            title: this.title,
            progress: 0,
            color: this.color,
            uuid,
          },
        });
        this.$store.dispatch('alerts/add', {
          text: this.$t('alerts.created_course'),
          type: 'success',
          timeout: 2000,
        });
        this.dismiss();
      }
    },
  },
}
</script>
