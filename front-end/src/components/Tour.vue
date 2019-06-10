<template>
  <fragment>
    <v-toolbar card color="primary">
      <v-spacer />
      <v-btn icon dark @click="dismiss()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-carousel
      :cycle="false"
      :hide-controls="true"
      :interval="1099511627776"
    >
      <v-carousel-item>
        <v-card class="blue tour-item">
          <v-card-title primary-title class="headline">{{ $t('tour.hello_heading') }}</v-card-title>
          <v-card-text class="subheading">
            <i18n path="tour.hello_desc">
              <v-icon small>mdi-plus</v-icon>
            </i18n>
          </v-card-text>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="cyan tour-item">
          <v-card-title primary-title class="headline">{{ $t('tour.sessions_heading') }}</v-card-title>
          <v-card-text class="subheading">
            {{ $t('tour.sessions_desc') }}
            <ul>
              <li>{{ $t('tour.sessions_exercise1') }}</li>
              <li>{{ $t('tour.sessions_exercise2') }}</li>
              <li>{{ $t('tour.sessions_exercise3') }}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-carousel-item>
      <v-carousel-item>
        <v-card class="green tour-item">
          <v-card-title primary-title class="headline">{{ $t('tour.settings_heading') }}</v-card-title>
          <v-card-text class="subheading">
            <i18n path="tour.settings_desc">
              <v-icon small>mdi-pencil</v-icon>
            </i18n>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </fragment>
</template>

<script>
export default {
  props: {
    dismiss: Function,
  }
}
</script>

<style lang="scss">
  .tour-item {
    height: -webkit-fill-available;
  }
</style>
