const config = {
  headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.nZ86hUWPdG43W6HVSGFy6DJnDVOZhx8a73LhQ3gIxY8' }
}

export const state = () => ({
  users: [],
  user: []
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  async getUsers ({ commit }) {
    const users = await this.$axios.$get(process.env.STUDENT_API + '/api/v1/student/GetAll', config)
    commit('setUsers', users)
  },
  async getUser ({ commit }, id) {
    const user = await this.$axios.$get(process.env.STUDENT_API + `/api/v1/student/Get/${id}`, config)
    commit('setUser', user)
  },
  async returnUser ({ commit }, id) {
    return await this.$axios.$get(process.env.STUDENT_API + `/api/v1/student/Get/${id}`, config)
  },
  async pay ({ commit }, payload) {
    return await this.$axios.$post(process.env.MONEY_API + '/api/payment/', payload, config)
  },
  async updateBalanceUser ({ commit }, payload) {
    return await this.$axios.$post(process.env.MONEY_API + '/api/abandon/', payload, config)
  }
}

export const getters = {
  users (state) {
    return state.users
  },
  user (state) {
    return state.user
  }
}
