<template>
  <div class="d-flex flex-wrap">
    <div v-for="home in homes" :key="home.objectID" class="col-12">
      <nuxt-link :to="`/home/${home.objectID}`" class="home-card" no-prefetch>
        <home-card :home="home" />
      </nuxt-link>
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
.home-card:hover {
  text-decoration: none;
}
</style>
