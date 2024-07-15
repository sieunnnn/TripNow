<template>
  <div ref="mapContainer" class="maps-integration"></div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  address: String
});

const mapContainer = ref(null);
let map, marker, infowindow;

const initializeMap = () => {
  const mapOptions = {
    center: { lat: 37.574187, lng: 126.976882 },
    zoom: 14,
  };

  map = new google.maps.Map(mapContainer.value, mapOptions);
  marker = new google.maps.Marker({ map });
  infowindow = new google.maps.InfoWindow();
};

const geocodeAddress = (address) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const location = results[0].geometry.location;
      map.setCenter(location);
      map.setZoom(17);

      marker.setPosition(location);
      infowindow.setContent(
          `<strong>${results[0].formatted_address}</strong>`
      );
      infowindow.open(map, marker);
    } else {
      console.error('Geocode was not successful for the following reason: ' + status);
    }
  });
};

onMounted(() => {
  initializeMap();
  geocodeAddress(props.address);
});


watch(() => props.address, (newAddress) => {
  geocodeAddress(newAddress);
});
</script>

<style scoped lang="scss">
.maps-integration {
  width: 100%;
  height: 200px;
  margin-top: 5px;
}
</style>
