<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float:left;margin:10px">
      <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
        <home-card :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {

  async asyncData ({ params, $dataApi }) {
    const homes = await $dataApi.getHomes()
    return {
      homes
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
