<template>
  <q-page class="flex column bg">
    <div class="col q-pt-lg q-px-md" v-if="Object.entries(weather).length > 0">
      <q-input
        @keydown.enter.prevent="search"
        color="dark"
        rounded
        outlined
        v-model="searchName"
        placeholder="Search"
        dark
      >
        <template v-slot:append>
          <q-icon
            v-if="searchName !== ''"
            name="close"
            @click="clear"
            class="cursor-pointer"
          />
          <q-icon name="search" @click="search" />
        </template>
      </q-input>
      <q-banner v-if="commonState.error" class="text-white bg-red q-mx-md">
        {{ searchName }} is not found.
      </q-banner>
    </div>

    <div
      class="col text-white text-center"
      v-if="Object.entries(weather).length > 0"
    >
      <div class="text-h3 text-weight-light">
        {{ weather.name }}
      </div>

      <div class="text-h5 text-weight-light">
        <img :src="weatherIcon" />
        <p>{{ weather.weather[0].main }}</p>
      </div>

      <div class="text-h2 text-weight-thin q-my-lg relative-position">
        <span>{{ weather.main.temp }}&#8451;</span>
      </div>
    </div>

    <!-- <q-img
      class="absolute-bottom"
      src="https://png2.cleanpng.com/sh/7e2c24ae6230642040db11bd323fc75d/L0KzQYm3U8I6N6pAj5H0aYP2gLBuTf1icZ8yjNHCZYKwirbwjPdidJZ3gdc2Y3n3iX76ifxpd6ZqjOZuLUXkcrW7V8Y6a2poTdMCLkKzRoWCVck3OWY3SqUANEC1RYm5VsUveJ9s/kisspng-main-tower-zeilgalerie-city-silhouette-5abd4769c9c5a7.2064959615223540258265.png"
      style="height: 100px"
    >
    </q-img> -->
  </q-page>
</template>

<script src="./weather.js" />

<style scoped>
.q-page {
  background: linear-gradient(#512da8, #9198e5);
}

.q-input {
  font-size: 15px;
}
</style>
