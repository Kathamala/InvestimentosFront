<template>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-btn @click="handleButtonClick">Click me</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      subtitle: String,
      text: String,
    },
    methods: {
      handleButtonClick() {
        // Adicione lógica aqui para lidar com o clique do botão
        console.log('Button clicked!');
      },
    },
  };
  </script>