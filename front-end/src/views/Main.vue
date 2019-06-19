<template>
  <v-card class="view-card">
    <v-toolbar
      :color="color"
    >
      <v-spacer />

      <v-btn
        icon
        dark
        @click.stop="showTour = true"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>

      <v-btn
        icon
        dark
        @click.stop="showCreateDialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
    <v-bottom-nav
      :active.sync="bottomNav"
      :color="color"
      :value="true"
      absolute
      dark
      shift
    >
      <v-btn dark route to="/main/courses">
        <span>{{ $t('toolbar.courses') }}</span>
        <v-icon>mdi-book-open</v-icon>
      </v-btn>

      <v-btn dark route to="/main/settings">
        <span>{{ $t('toolbar.settings') }}</span>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-bottom-nav>
    <div
      class="alerts-main"
    >
      <v-alert
        v-for="alert in alerts"
        :key="alert.uuid"
        :type="alert.type"
        :value="true"
        dismissible
        transition="fade-transition"
      >
        {{ alert.text }}
      </v-alert>
    </div>
    <v-dialog
      v-model="showCreateDialog"
      max-width=600
    >
      <DialogCreateCourse v-if="showCreateDialog"
        :dismiss="dismissCreateDialog"
      />
    </v-dialog>
    <v-dialog
      v-model="showTour"
      max-width=600
    >
      <Tour v-if="showTour"
        :dismiss="() => showTour = false"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import DialogCreateCourse from '@/components/Dialogs/DialogCreateCourse';
import Tour from '@/components/Tour';

export default {
  components: {
    DialogCreateCourse,
    Tour,
  },

  data() {
    return {
      bottomNav: 0,
      showCreateDialog: false,
      showTour: false,
    };
  },

  computed: {
    alerts() {
      return [...this.$store.state['alerts'].alerts].reverse();
    },

    color() {
      switch (this.bottomNav) {
        case 0: return 'indigo';
        case 1: return 'teal';
      }
    },
  },

  methods: {
    dismissCreateDialog() {
      this.showCreateDialog = false;
    },
  },
}
</script>

<style scoped lang="scss">
.alerts-main {
  position: absolute;
  bottom: 56px;
  left: 28px;
}
</style>
