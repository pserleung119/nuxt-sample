// context includes internal objects like VueStore, Router, etc.
// Inject is given as the second parameter when exporting a function so you can use it across your app.
export default function (context, inject) {
  let mapLoaded = false
  let mapWaiting = null

  addScript()
  // First params will be registered as this.$${first param}
  // ↓will inject showMap function to this.$map so you can call this.$map.showMap
  inject('maps', {
    showMap
  })

  function addScript () {
    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCXro-hkUGKryBEjp3LGr5mAg7gzkMhwAQ&callback=initMap'
    script.async = true
    window.initMap = initMap
    document.head.appendChild(script)
  }

  function initMap () {
    mapLoaded = true
    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting
      renderMap(canvas, lat, lng)
      mapWaiting = null
    }
  }

  function showMap (canvas, lat, lng) {
    if (mapLoaded) { renderMap(canvas, lat, lng) } else { mapWaiting = { canvas, lat, lng } }
  }
  function renderMap (canvas, lat, lng) {
    console.log('mounted')
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const position = new window.google.maps.LatLng(lat, lng)
    const marker = new window.google.maps.Marker({ position })
    marker.setMap(map)
  }
}
