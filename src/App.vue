<template>
  <v-row justify="center">
    <WalletView
      title="Use Google's location service?"
      :bodyText="longText"
      @agree="handleAgree"
      @disagree="handleDisagree"
    />
  </v-row>
  <WalletForm/>
</template>

<script>
import WalletForm from './pages/WalletForm.vue'
import WalletView from './pages/WalletView.vue'

export default {
  name: 'App',
  components: {
    WalletForm,
    WalletView
  },
  data() {
    return {
      dataList: [
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 3', subtitle: 'Subtitle 3', text: 'Text 3' }, 
      ],
    };
  },
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
