<template>
  <nav class="header px-4">
    <div class="links">
      <nuxt-link to="/">
        NuxtBnb
      </nuxt-link>
    </div>

    <div v-if="initialLoading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="user-links">
      <div v-if="signedIn">
        <button type="button" class="btn btn-links signout-btn" @click="signout">Signout</button>
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
  </nav>
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

<style lang="scss" scoped>
@import "../assets/styles/main.scss";

.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $gray-900;
}
a {
  margin-right: 5px;
  color: $gray-300;
  transition-duration: 0.1s;
}
.signout-btn {
  color: $gray-300;
  transition-duration: 0.1s;
}

a:hover, .signout-btn:hover {
  color: $gray-100;
  text-decoration: none;
}
</style>
