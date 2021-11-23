<template>
  <div class="d-flex my-3 p-4 home-card border rounded">
    <div class="home-img col-3 d-none d-lg-block">
      <img :src="home.images[0]">
    </div>
    <div class="col text-dark">
      <h4>{{ home.title }}</h4>
      <p class="address">{{ home.location.address }} {{ home.location.city }} {{ home.location.state }}</p>
      <p class="mb-1">{{ home.guests }} guests</p>
      <p class="mb-1">${{ home.pricePerNight }} / night</p>
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

<style lang="scss" scoped>
@import "../assets/styles/main.scss";

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.address {
  color: $gray-700;
}
</style>
