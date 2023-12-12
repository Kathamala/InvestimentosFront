<template>
  <h1>Criação de Carteira</h1>
  <form @submit.prevent="submitForm">
    <div v-for="(field, index) in state.investimentList" :key="index">
      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model="state.investimentList[index].name"
            :error-messages="v$[`investimentList.${index}.name`]?.$errorMessages"
            label="Nome"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="state.investimentList[index].yieldRate"
            label="Taxa de Rendimento"
            required
            :error-messages="v$[`investimentList.${index}.yieldRate`]?.$errorMessages"
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-select
            v-model="state.investimentList[index].type"
            :items="types"
            label="Tipo"
            required
            :error-messages="v$[`investimentList.${index}.type`]?.$errorMessages"
          ></v-select>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="state.investimentList[index].value"
            label="Valor"
            required
            :error-messages="v$[`investimentList.${index}.value`]?.$errorMessages"
          ></v-text-field>
        </v-col>

      </v-row>
    </div>

    <div>
      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model="state.investimentGoal"
            :error-messages="v$.investimentGoal?.$errorMessages"
            label="Meta de Investimento"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <button @click.prevent="addInvestimento">+</button>
    <v-btn class="me-4" type="submit">Submit</v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </form>
</template>

<script>
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, decimal } from '@vuelidate/validators';

export default {
  setup() {
    const initialState = {
      investimentList: [
        {
          name: '',
          yieldRate: null,
          value: null,
          type: null,
        }
      ],
      investimentGoal: null
    };

    const state = reactive({
      ...initialState,
    });

    const isDouble = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    const types = [
      'Renda Fixa',
      'Renda Variável',
      'Imóvel',
      'Automóvel',
    ];

    const rules = {
      investimentGoal: { required, decimal, isDouble },
      'investimentList.*.name': { required },
      'investimentList.*.yieldRate': { required, decimal, isDouble },
      'investimentList.*.value': { required },
      'investimentList.*.type': { required },
    };

    const v$ = useVuelidate(rules, state);

    function addInvestimento() {
      state.investimentList.push({
        name: '',
        yieldRate: null,
        value: null,
        type: null,
      });
    }

    function clear() {
      /*v$.$reset();*/
      state.investimentList = [
        {
          name: '',
          yieldRate: null,
          value: null,
          type: null,
        }
      ]
      state.investimentGoal = null
    }

    function submitForm() {
      if (v$.$pending) {
        v$.$touch();
        return;
      }

      console.log('Form submitted!', state);
    }

    return {
      state,
      types,
      v$,
      addInvestimento,
      clear,
      submitForm
    };
  },
};
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
  