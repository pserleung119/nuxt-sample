<template>
  <div>
    <div class="position-relative">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="image in home.images" :key="image">
          <img :src="image" width="350" height="300">
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination" />
      </swiper>
    </div>
    <div class="container d-flex flex-wrap py-4">
      <div class="py-0 py-md-4 col-12 col-md-6">
        <h3>{{ home.title }}</h3>
        <p class="mb-1">
          ${{ home.pricePerNight }} / night
        </p>
        <div class="">
          <img src="/images/marker.svg" width="20" height="20" class="mr-2"><span>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}</span>
        </div>
        <div>
          <img src="/images/star.svg" width="20" height="20" class="mr-2">{{ home.reviewValue }}
        </div>
        <p>{{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath</p>
        <p>{{ home.description }}</p>
      </div>
      <div class="py-0 py-md-4 col-12 col-md-6">
        <div ref="map" style="width: 100%; height: 25rem;" />
      </div>
      <div v-for="review in reviews" :key="review.objectID">
        <img :src="review.reviewer.image"><br>
        {{ review.reviewer.name }} <img src="/images/star.svg" width="20" height="20">{{ review.rating }}<br>
        {{ formatDate(review.date) }}<br>
        {{ review.comment }}
      </div>
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
        spaceBetween: 0,
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

<style scoped>
img {
  object-fit: cover;
}
</style>
