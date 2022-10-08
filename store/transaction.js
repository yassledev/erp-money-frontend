import moment from 'moment'
const config = {
  headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.nZ86hUWPdG43W6HVSGFy6DJnDVOZhx8a73LhQ3gIxY8' }
}

export const state = () => ({
  transactions: [],
  transactionsByUser: []
})

export const mutations = {
  setTransactions (state, transactions) {
    state.transactions = transactions
  },
  setTransactionsByUser (state, transactions) {
    state.transactionsByUser = transactions
  }
}

export const actions = {
  async getTransactions ({ commit }) {
    const transactions = await this.$axios.$get(process.env.COMPTA_API + '/accounting_transactions', config)
    // eslint-disable-next-line no-return-assign
    transactions.transactions.map(transa => transa.createdAt = moment(transa.createdAt).locale('fr').format('LLLL'))
    commit('setTransactions', transactions.transactions)
  },
  async getTransactionsByUser ({ commit, dispatch }, idUser) {
    const transactions = await this.$axios.$get(process.env.MONEY_API + '/api/transactions/' + idUser, config)
    const filteredArray = transactions.data.map((item) => {
      return {
        name: item.products[0].name,
        quantity: item.products[0].quantity,
        payment_type: item.payment_type === 'card' ? 'Carte de crédit' : item.payment_type === 'cash' ? 'Espèce' : 'Solde',
        date: moment(item.date).locale('fr').format('LLLL'),
        price: item.price
      }
    })
    commit('setTransactionsByUser', filteredArray)
  }
}

export const getters = {
  transactions (state) {
    return state.transactions
  }
}
