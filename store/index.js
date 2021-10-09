export const state = () => ({
  user: null
})

export const getters = {
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  }
}

export const actions = {
  async userSignup (context, account) {
    try {
      const result = await this.$fire.auth.createUserWithEmailAndPassword(account.email, account.password)
      const user = result.user
      context.commit('setUser', {
        email: user.email,
        token: user.refreshToken,
        id: user.uid
      })
      return { user }
    } catch (error) {
      return { error: error.message }
    }
  },
  async userSignin (context, account) {
    try {
      const result = await this.$fire.auth.signInWithEmailAndPassword(account.email, account.password)
      const user = result.user
      context.commit('setUser', {
        email: user.email,
        token: user.refreshToken,
        id: user.uid
      })
      return { user: result.user }
    } catch (error) {
      return { error: error.message }
    }
  },
  async userLogout (context) {
    await this.$fire.auth.signOut()
    context.commit('setUser', null)
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}
