<template>
  <fragment>
    <div class="mx-3 mt-3">
      <p v-if="exercise.precedingSibling"
        class="gradient-to-top pl-2"
      >
        {{ exercise.precedingSibling }}
      </p>
      <div v-for="(line, index) in text"
        :key="line"
      >
        <v-chip v-if="line"
          class="chip-multiline"
          :class="{ 'pa-1': line.includes('\n') }"
        >
          <span>{{ line }}</span>
        </v-chip>
        <draggable v-else
          :class="answer[index].length ? '' : 'v-chip placeholder-long'"
          :list="answer[index]"
          :group="group"
        >
          <div v-for="line in answer[index]"
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
      </div>
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
      <draggable v-else
        :class="(options.length ? '' : 'v-chip placeholder-long')"
        :list="options"
        group="answers"
      >
        <span v-for="line in options"
          :key="line"
        >
          <v-chip
            class="chip-multiline"
            :class="{ 'py-1': line.includes('\n') }"
          >
            <v-avatar left>
              <v-icon small>mdi-reorder-horizontal</v-icon>
            </v-avatar>
            <span>{{ line }}</span>
          </v-chip>
        </span>
      </draggable>
      <v-spacer />
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
      answer: [],
      options: [],
      text: [],
      group: {
        name: 'answers',
        put(to) {
          return to.el.children.length < 1;
        },
      },
    };
  },

  created() {
    this.options =  [...this.exercise.options];
    this.text = [...this.exercise.text];
    this.answer = [];
    for (let string in this.text) {
      this.answer.push([]);
    }
  },

  computed: {
    darkMode() {
      return this.$store.state['settings'].settings.darkMode;
    }
  },

  methods: {
    check() {
      if (this.error) {
        this.error.next();
        this.error = undefined;
      } else {
        const answer = [];
        for (const index in this.answer) {
          if (!this.answer[index][0]) answer[index] = this.text[index];
          else answer[index] = this.answer[index][0];
        }
        this.error = this.session.check(answer.join('\n'));
      }
    },
  },
}
</script>

<style scoped lang="scss">
.v-chip.placeholder-long {
  height: 28px;
  width: 16em;
  margin: 6px;
  background: #fff;
  border: 2px dashed #e0e0e0;
  border-radius: 1em;
}
</style>
