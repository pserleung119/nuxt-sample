<template>
  <div>
    <div v-if="homes.length > 0" class="container">
      <p class="pt-4">
        Count: {{ maxHits }}
      </p>
      <div v-for="home in homes" :key="home.objectID" class="col-12 px-0">
        <nuxt-link :to="`/homes/${home.objectID}`" class="home-card" no-prefetch>
          <home-card :home="home" />
        </nuxt-link>
      </div>
    </div>
    <div v-else class="container py-5">
      <h1 class="text-center">
        No Result Found.
      </h1>
      <p class="text-center">
        Go back to <nuxt-link to="/">
          Home
        </nuxt-link>.
      </p>
    </div>
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-for="(i, index) in maxPage" :key="`page-${index}`">
            <nuxt-link :to="$route.fullPath.replace(/page=\d{1,}/, `page=${index}`)" class="page-link" no-prefetch>{{ index + 1 }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {

  // https://nuxtjs.org/docs/internals-glossary/context/
  async asyncData ({ route, $dataApi, error }) {
    const response = await $dataApi.getFilteredHomes(route.query.search || '', route.query.page || 0)
    if (!response.ok) { return error({ statusCode: response.status, message: response.statusText }) }
    return {
      homes: response.json.hits,
      maxHits: response.json.nbHits,
      maxPage: response.json.nbPages
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
  watch: {
    '$route.fullPath': {
      handler (newUrl, oldUrl) {
        if (oldUrl !== newUrl) {
          window.location.reload()
        }
      }
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
