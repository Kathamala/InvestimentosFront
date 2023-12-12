<!-- DialogCard.vue -->
<template>
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          {{ buttonLabel }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          {{ bodyText }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="handleDisagree">
            {{ disagreeLabel }}
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="handleAgree">
            {{ agreeLabel }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      bodyText: String,
      buttonLabel: {
        type: String,
        default: 'Open Dialog',
      },
      agreeLabel: {
        type: String,
        default: 'Agree',
      },
      disagreeLabel: {
        type: String,
        default: 'Disagree',
      },
    },
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
      handleAgree() {
        this.dialog = false;
        this.$emit('agree');
      },
      handleDisagree() {
        this.dialog = false;
        this.$emit('disagree');
      },
    },
  };
  </script>
  