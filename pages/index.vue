<template>
  <div class="d-flex flex-wrap">
    <section class="search-form w-100 d-flex justify-content-center align-items-center">
      <div class="col-6">
        <form>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for house">
            <div class="input-group-append">
              <button id="button-addon2" class="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <div class="container">
      <div v-for="home in homes" :key="home.objectID" class="col-12 px-0">
        <nuxt-link :to="`/home/${home.objectID}`" class="home-card" no-prefetch>
          <home-card :home="home" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  async asyncData ({ params, $dataApi, error }) {
    const response = await $dataApi.getHomes()
    if (!response.ok) { return error({ statusCode: response.status, message: response.statusText }) }
    return {
      homes: response.json.hits
    }
  },
  head () {
    return {
      title: 'Homepage',
      meta: [{
        name: 'description',
        content: 'This is a homepage!',
        hid: 'description'
      }]
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
