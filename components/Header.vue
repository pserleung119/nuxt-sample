<template>
  <div class="header px-4">
    <div class="links">
      <nuxt-link to="/">
        Home
      </nuxt-link>
    </div>

    <div v-if="initialLoading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="user-links">
      <div v-if="signedIn">
        <button type="button" class="btn btn-link" @click="signout">Signout</button>
      </div>
      <div v-else class="non-signed-in">
        <nuxt-link to="/signin">
          Sign In
        </nuxt-link>
        <nuxt-link to="/signup">
          Sign Up
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      initialLoading: true
    }
  },
  computed: {
    signedIn: {
      get () {
        return this.$store.getters.isAuthenticated
      }
    }
  },
  async mounted () {
    await this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('setUser', {
          email: user.email,
          token: user.refreshToken,
          id: user.uid
        })
      }
      this.initialLoading = false
    })
  },
  methods: {
    signout () {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2F353E;
}
a {
  margin-right: 5px;
  color: #f0f0f0;
  transition-duration: 0.1s;
}
button {
  color: #f0f0f0;
  transition-duration: 0.1s;
}

a:hover, button:hover {
  color: #ffffff;
  text-decoration: none;
}
</style>
