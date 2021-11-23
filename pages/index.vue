<template>
  <div>
    <section class="search-form w-100 d-flex justify-content-center align-items-center">
      <div class="col-6">
        <div class="input-group">
          <input v-model="keyword" type="text" class="form-control" placeholder="Search for house">
          <div class="input-group-append">
            <button id="button-addon2" class="btn btn-primary" type="button" @click="searchHomes">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
    <div class="container pt-5">
      <h3 class="font-weight-bold mb-4">
        Featured Homes
      </h3>
      <div v-for="home in homes" :key="home.objectID" class="col-12 px-0">
        <nuxt-link :to="`/homes/${home.objectID}`" class="home-card" no-prefetch>
          <home-card :home="home" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  async asyncData ({ params, $dataApi, error }) {
    const response = await $dataApi.getFeaturedHomes()
    if (!response.ok) { return error({ statusCode: response.status, message: response.statusText }) }

    return {
      homes: response.json.hits
    }
  },
  data () {
    return {
      keyword: ''
    }
  },
  head () {
    return {
      title: 'NuxtSample',
      meta: [{
        name: 'description',
        content: 'This is a nuxt sample app!',
        hid: 'description'
      }]
    }
  },
  methods: {
    searchHomes () {
      this.$router.push(`/homes?page=0&search=${this.keyword}`)
    }
  }
}
</script>

<style scoped>
.search-form {
  height: 600px;
  background-image: url('/images/hero.jpeg');
  background-position: center;
  background-size: cover;
}
.home-card:hover {
  text-decoration: none;
}
</style>
