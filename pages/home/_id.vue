<template>
  <div>
    <div style="display:flex;">
      <img v-for="image in home.images" :key="image" :src="image" width="200" height="150">
    </div>
    {{ home.title }}<br>
    ${{ home.pricePerNight }} / night<br>
    <img src="/images/marker.svg" width="20" height="20">{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br>
    <img src="/images/star.svg" width="20" height="20">{{ home.reviewValue }} <br>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br>
    {{ home.description }}
    <div ref="map" style="height: 800px; width: 800px;" />
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image"><br>
      {{ review.reviewer.name }} <img src="/images/star.svg" width="20" height="20">{{ review.rating }}<br>
      {{ formatDate(review.date) }}<br>
      {{ review.comment }}
    </div>
  </div>
</template>
<script>
export default {

  async asyncData ({ params, $dataApi, error }) {
    const homeResponse = await $dataApi.getHome(params.id)
    if (!homeResponse.ok) { return error({ statusCode: homeResponse.status, message: homeResponse.statusText }) }
    const reviewResponse = await $dataApi.getReviews(params.id)
    if (!reviewResponse.ok) { return error({ statusCode: reviewResponse.status, message: reviewResponse.statusText }) }
    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits
    }
  },

  head () {
    return {
      title: this.home.title
    }
  },

  mounted () {
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
  },

  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleString()
    }
  }
}
</script>
