<template>
  <q-layout>
    <div class="q-px-md q-pt-xl q-mx-auto" style="max-width: 400px">
      <div class="text-center">
        <span class="text-h3 text-weight-medium text-white">Login</span>
      </div>

      <q-form @submit="login" class="q-gutter-md q-mt-md">
        <q-input
          color="grey-4"
          v-model="email"
          filled
          type="email"
          label="Email"
          label-color="grey-4"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
        >
          <template v-slot:prepend>
            <q-icon color="grey-4" name="email" />
          </template>
        </q-input>

        <q-input
          color="grey-4"
          label="Password"
          label-color="grey-4"
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Password is required']"
        >
          <template v-slot:prepend>
            <q-icon color="grey-4" name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div>
          <q-btn
            label="Login"
            type="submit"
            color="grey-3"
            text-color="black"
            @click="icon = true"
            style="width: 100%;"
          />

          <q-dialog v-model="icon" v-if="!loginStatus">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Login Failed</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                Please check your email and password.
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </q-form>
      <div class="text-center q-pa-md">
        <span class="text-grey-5">Don't have an account?</span
        ><span class="text-white" style="cursor: pointer;" @click="createDialog()"> Create</span>
      </div>

      <!-- create dialog -->
      <q-dialog v-model="show">
        <q-card square class="shadow-24" style="width:300px;height:485px">
          <q-card-section class="bg-deep-purple-5">
            <div class="text-h6 text-center">
              Create Account
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md q-mt-md">
              <div class="text-center">
                <span class="error " v-if="existUser === true"
                  >Email already exists!</span
                >
              </div>

              <q-input
                color="deep-purple-11"
                filled
                v-model="name"
                label="Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'UserName is required',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                color="deep-purple-11"
                filled
                v-model="email"
                type="email"
                label="Email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Email is required',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                color="deep-purple-11"
                filled
                v-model="password"
                type="password"
                label="Password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Password is required',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              label="SIGN UP"
              class="full-width text-white"
              unelevated
              size="md"
              color="deep-purple-5"
              @click="createUserAccount"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-layout>
</template>

<script src="./login.js" />

<style scoped>
.q-layout {
  background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}
.error {
  color: red;
}
</style>
