<template>
  <div class="container pt-5">
    <form>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        >
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        <small v-if="email.length > 5 && !validMail" id="emailHelp" class="form-text text-danger">This is not a valid email.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <div class="mb-4">
        <small v-if="error" id="emailHelp" class="form-text text-danger">{{ error }}</small>
      </div>
      <button type="button" class="btn btn-primary" @click="signin">
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  computed: {
    validMail () {
      if (this.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return true
      }
      return false
    }
  },
  mounted () {
    if (this.$store.state.user) {
      this.$route.push({ path: '/' })
    }
  },
  methods: {
    async signin () {
      const result = await this.$store.dispatch('userSignin', {
        email: this.email,
        password: this.password
      })
      if (result.error) {
        this.error = result.error
      } else {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>
