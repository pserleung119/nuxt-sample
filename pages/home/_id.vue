<template>
  <div>
    <div class="position-relative">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="image in home.images" :key="image">
          <img :src="image" width="200" height="150">
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination" />
        <div slot="button-prev" class="swiper-button-prev" />
        <div slot="button-next" class="swiper-button-next" />
      </swiper>
    </div>
    {{ home.title }}<br>
    ${{ home.pricePerNight }} / night<br>
    <img src="/images/marker.svg" width="20" height="20">{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br>
    <img src="/images/star.svg" width="20" height="20">{{ home.reviewValue }} <br>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br>
    {{ home.description }}
    <div ref="map" style="height: 80vw; width: 80vw;" />
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image"><br>
      {{ review.reviewer.name }} <img src="/images/star.svg" width="20" height="20">{{ review.rating }}<br>
      {{ formatDate(review.date) }}<br>
      {{ review.comment }}
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {

  components: {
    Swiper,
    SwiperSlide
  },

  async asyncData ({ params, $dataApi, error }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviews(params.id)
    ])

    const badResponse = responses.find(response => !response.ok)
    if (badResponse) { return error({ statusCode: badResponse.status, message: badResponse.statusText }) }
    return {
      home: responses[0].json,
      reviews: responses[1].json.hits
    }
  },

  data () {
    return {
      swiperOptions: {
        spaceBetween: 5,
        breakpoints: {
          0: {
            slidesPerView: 1.4,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        mousewheel: {
          forceToAxis: true
        },
        freeMode: true
      }
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
    formatDate (dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleString()
    }
  }
}
</script>
