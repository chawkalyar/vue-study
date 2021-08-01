<template>
  <div v-if="!loginStatus">
    <Login />
  </div>
  <q-layout v-else view="lHh Lpr lFf">
    <q-header elevated class="bg-deep-purple-6">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2 "
    >
      <q-img
        class="absolute-top"
        src="https://c4.wallpaperflare.com/wallpaper/607/478/331/ruby-development-gradient-geometry-wallpaper-preview.jpg"
        style="height: 150px"
      > 
      <div class="absolute-bottom bg-transparent">
          <div class="q-mb-sm">
            <q-avatar >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
              />
            </q-avatar>
          </div>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div> 
       </q-img>

      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
      <q-list>
        <!-- <q-item style="height: 150px">
          <q-item-section avatar>
            <q-avatar size="55px">
              <img
                src="https://www.ccd.edu/sites/default/files/PhotoAvatar.jpg"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{
              user.name
            }}</q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item> -->

        <q-item  v-if="user.role === 'admin'"
          active-class="menu-link"
          clickable
          :to="{ name: 'AuthUser' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Users</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          active-class="menu-link"
          clickable
          :to="{ name: 'Weather' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="cloud" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Weather</q-item-label>
          </q-item-section>
        </q-item>

        <q-item active-class="menu-link" clickable :to="{ name: 'Todo' }" exact>
          <q-item-section avatar>
            <q-icon name="fact_check" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Todo</q-item-label>
          </q-item-section>
        </q-item>
        <q-item active-class="menu-link" clickable :to="{ name: 'User' }" exact>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>User</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          active-class="menu-link"
          clickable
          :to="{ name: 'Login' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section @click="logout">
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      </q-scroll-area>
    </q-drawer>

    <MainContent />
    <div class="absolute-center" v-show="commonState.loading">
      <q-spinner-ios color="dark" size="3em" />
    </div>
  </q-layout>
</template>

<script src="./app.js" />
<style scoped>
.menu-link {
  color: rgb(68, 32, 136);
  background: rgba(186, 165, 224, 0.746);
}
</style>
