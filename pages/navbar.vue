<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <strong>Les Cigognes de l'Ingenierie en Apprentissage d'Alsace </strong>
      </v-col>
    </v-row>
    <br><br><br>
  </v-footer>
</template>

<script>
export default {
  name: 'NavBar.vue',
  methods: {
    goHome () {
      this.$router.push('/')
    },
    goMembers () {
      this.$router.push('/members')
    },
    goTransactions () {
      this.$router.push('/transactions')
    }
  }
}
</script>

<style scoped>

</style>
