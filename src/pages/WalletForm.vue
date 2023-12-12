<template>
  <h1> Criação de Carteira </h1>
  <form>

     <div v-for="(field, index) in state.investimentList" :key="index">
      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model="state.investimentList[index].name"
            :counter="10"
            label="Nome"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="state.investimentList[index].yearning"
            label="Rendimento"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-select
            v-model="state.investimentList[index].type"
            :items="types"
            label="Tipo"
            required
          ></v-select>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="state.investimentList[index].value"
            label="Valor"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <button @click.prevent="addInvestimento">+</button>
    <v-btn class="me-4" @click="v$.$validate">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>
  
<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'

  
  const initialState = {
    investimentList: [
      {
        name: '',
        yearning: null,
        value: null,
        type: null,
      }
    ],
  }

  const state = reactive({
    ...initialState,
  })

  const types = [
    'Renda Fixa',
    'Renda Variável',
    'Imóvel',
    'Automóvel',
  ]

  const rules = {
    name: { required },
    yearning: { required },
    type: { required },
    types: { required },
    value: { required },
  }
 
  const v$ = useVuelidate(rules, state)

  function addInvestimento(){
    state.investimentList.push({
        name: '',
        yearning: null,
        value: null,
        type: null,
      })
  }

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }
  
</script>
  
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
  