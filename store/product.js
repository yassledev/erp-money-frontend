const config = {
  headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.nZ86hUWPdG43W6HVSGFy6DJnDVOZhx8a73LhQ3gIxY8' }
}

export const state = () => ({
  products: []
})

export const mutations = {
  setProducts (state, products) {
    state.products = products
  }
}

export const actions = {
  async getProducts ({ commit }) {
    const products = await this.$axios.$get(process.env.COMPTA_API + '/products', config)
    commit('setProducts', products)
  }
}

export const getters = {
  products (state) {
    return state.products
  }
}
