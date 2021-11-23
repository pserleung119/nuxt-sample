<template>
  <div class="d-flex my-3 p-4 home-card border rounded">
    <div class="home-img col-3 d-none d-lg-block">
      <img :src="home.images[0]">
    </div>
    <div class="col text-dark">
      <h2>{{ home.title }}</h2>
      <h5>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }}</h5>
      <p>{{ home.guests }} guests</p>
      <p>${{ home.pricePerNight }} / night</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    home: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
