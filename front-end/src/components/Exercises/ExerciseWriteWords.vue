<template>
  <fragment>
    <div class="mx-3 mt-3">
      <p v-if="exercise.precedingSibling"
        class="gradient-to-top pl-2"
      >
        {{ exercise.precedingSibling }}
      </p>
      <ExerciseContent 
        :text="exercise.text"
        :answers="answers"
        @change="answers = $event"
      />
      <p v-if="exercise.subsequentSibling"
        class="gradient-to-bottom pl-2 pt-3"
      >
        {{ exercise.subsequentSibling }}
      </p>
    </div>
    <v-spacer />
    <div class="exercise-bottom mx-3 mb-3">
      <Error v-if="error"
        :error="error"
      />
      <v-spacer></v-spacer>
      <ButtonCheck :check="check" />
    </div>
  </fragment>
</template>

<script>
import Vue from 'vue';
import draggable from 'vuedraggable';
import ButtonCheck from '@/components/ButtonCheck';
import Error from '@/components/Error';

const ExerciseContent = Vue.component('exercise-content', {
  props: {
    text: Array,
    answers: Array,
  },

  computed: {
    darkMode() {
      return this.$store.getters['settings/all'].darkMode;
    }
  },

  render(createElement) {
    let i = 0;
    const rec = (str) => {
      if (typeof str === 'string') {
        return str + ' ';
      } else if (str === undefined) {
        let index = i;
        i++;
        return createElement('input', {
          attrs: {
            class: this.darkMode ? 'text-field-dark' : 'text-field',
            type: 'text',
            size: 1,
          },
          domProps: {
            value: this.answers[index],
          },
          on: {
            input: ({ target }) => {
              this.answers[index] = target.value;
              this.$emit('change', this.answers)
              target.setAttribute('size', target.value.length ? target.value.length : 1)
            },
          },
        });
      } else {
        rec(str);
      }
    };
    if (typeof this.text[0] !== 'object') {
      return createElement('div', this.text.map(rec));
    } else {
      return createElement(
        'span',
        {
          class: {
            'text-multiline': true,
          }
        },
        this.text.map(a => createElement('div', a.map(rec)))
      );
    }
  },
});

export default {            
  components: {
    draggable,
    ButtonCheck,
    Error,
    ExerciseContent,
  },

  props: {
    exercise: Object,
    session: Object,
  },

  data() {
    return {
      answers: [],
      name: '',
      error: undefined,
    };
  },

  computed: {
    darkMode() {
      return this.$store.getters['settings/all'].darkMode;
    }
  },

  methods: {
    check() {
      if (this.error) {
        this.error.next();
        this.error = undefined;
      } else {
        this.error = this.session.check(this.answers.join(' '));
      }
    },
  },
}
</script>

<style lang="scss">
.chip-multiline .v-chip__content {
  white-space: pre-wrap;
  min-height: 32px !important;
  height: auto !important;
}

.text-field-dark {
  border-bottom: 1px solid #FFF;
  margin: 0 4px;
}

.text-field {
  border-bottom: 1px solid #212121;
  margin: 0 4px;
}

.text-field:focus {
  outline: none;
  box-shadow: none;
  border-bottom: 1px solid #2196F3;
}

.text-multiline {
  div {
    margin-top: 4px;
  }
  div:first-child {
    margin-top: 0;
  } 
}
</style>
