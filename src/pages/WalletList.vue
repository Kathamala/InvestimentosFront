<template>
    <v-row>
      <v-col v-for="(card, index) in cardList" :key="index" cols="12" sm="6" md="3">
        <WalletCardComponent :title="card.title" :subtitle="card.subtitle" :text="card.text">
          <template v-slot:actions>
            <v-btn @click="handleCardButtonClick(index)">Click me</v-btn>
          </template>
        </WalletCardComponent>
      </v-col>
    </v-row>
  </template>
  
  <script>
import WalletCardComponent from '../components/WalletCardComponent.vue'
  
  export default {
    components: {
        WalletCardComponent,
    },
    props: {
      cardList: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      handleCardButtonClick(index) {
        // Adicione lógica aqui para lidar com o clique do botão no cartão específico
        console.log(`Card button clicked for card at index ${index}`);
      },
    },
  };
  </script>