<template>
  <div class="q-pa-md">
    <!-- for user view -->
    <div
      v-if="authUser.role === 'user'"
      class="q-pa-md row items-start q-gutter-md"
    >
      <q-card class="my-card bg-deep-purple-3" v-for="user in users" :key="user.id">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
            <q-item-label caption>
              <q-icon color="dark-light" name="mail_outline" />
              {{ user.email }}
            </q-item-label>
            <q-item-label caption>
              <q-icon color="dark-light" name="language" />
              {{ user.website }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <!-- for admin view -->
    <q-table
      v-else
      style="height: 400px"
      title="Users List"
      :rows="users"
      :columns="columns"
      row-key="id"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
          icon="add_circle"
          size="12px"
          color="deep-purple-12"
          label="Add"
          @click="showDialog({ edit: false })"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size:16px; font-weight:bold"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width />
          <q-th auto-width />
          <q-th auto-width />
          <q-th auto-width />
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              size="sm"
              color="deep-purple-12"
              round
              icon="edit"
              @click="showDialog({ edit: true }, props.row)"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              size="sm"
              color="negative"
              round
              icon="delete"
              @click="showDialog({ delete: true }, props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- delete dialog -->

    <q-dialog v-model="showDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          
          <span class="q-ml-xs">Are you sure you want to delete ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- create and update dialog -->
    <q-dialog v-model="show">
      <q-card style="min-width: 300px; min-height: 350px">
        <q-card-section class="bg-deep-purple-11">
          <div class="text-h6 text-center">
            {{ isEdit ? "Update User" : "Create User" }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md q-mt-md">
            <q-input
              color="deep-purple-11"
              outlined
              v-model="name"
              label="Name"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            />

            <q-input
              color="deep-purple-11"
              outlined
              v-model="username"
              label="UserName"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'UserName is required',
              ]"
            />

            <q-input
              color="deep-purple-11"
              outlined
              v-model="email"
              type="email"
              label="Email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Email is required']"
            />
            <q-input
              color="deep-purple-11"
              outlined
              v-model="website"
              type="website"
              label="Website"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Website is required',
              ]"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Close" color="deep-purple-10" />
          <q-btn
            flat
            v-if="!isEdit"
            @click="createUser"
            color="deep-purple-10"
            label="Create"
          />

          <q-btn
            flat
            v-if="isEdit"
            @click="updateUser"
            color="deep-purple-10"
            label="Update"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script src="./user.js" />
<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
