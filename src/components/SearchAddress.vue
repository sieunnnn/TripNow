<template>
  <div>
    <div ref="searchContainer" class="search-container">
      <input ref="autocompleteInput" type="text" placeholder="주소를 입력 후, 목록에서 알맞은 값을 선택해주세요." class="modal-input"/>
    </div>
    <div ref="mapContainer" class="maps-integration"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const mapContainer = ref(null);
const autocompleteInput = ref(null);
let map, marker, infowindow, autocomplete;

const emit = defineEmits(['updateAddress']);

const searchPlace = () => {
  const place = autocomplete.getPlace();
  if (!place.geometry || !place.geometry.location) return;

  updateMap(place);
  emit('updateAddress', place.formatted_address);
};

const updateMap = (place) => {
  if (!place.geometry || !place.geometry.location) return;

  map.setCenter(place.geometry.location);
  map.setZoom(17);

  marker.setPosition(place.geometry.location);
  infowindow.setContent(
      `<strong>${place.name}</strong><br>
     <span>${place.formatted_address}</span>`
  );
  infowindow.open(map, marker);
};

onMounted(() => {
  const mapOptions = {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 13,
  };

  map = new google.maps.Map(mapContainer.value, mapOptions);
  marker = new google.maps.Marker({ map });
  infowindow = new google.maps.InfoWindow();

  autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value, {
    fields: ["geometry", "name", "formatted_address"]
  });
  autocomplete.addListener("place_changed", searchPlace);
});
</script>

<style scoped>
@import "../assets/styles/modal.scss";

.search-container {
  margin-bottom: 14px;
}

.maps-integration {
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
}
</style>
