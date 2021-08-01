<template>
  <div class="q-pa-md">
    <q-table
      class="q-mt-lg"
      title="Users Management"
      :rows="authUser"
      :columns="columns"
      row-key="id"
      hide-bottom
    >
      <template v-slot:top-right>
        <q-btn
          size="12px"
          color="deep-purple-12"
          label="Create New User"
          @click="createDialog()"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size:15px; font-weight:bold"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="password" :props="props">
            {{ props.row.password }}
          </q-td>
          <q-td key="role" :props="props">
            <q-badge
              :class="props.row.role === 'admin' ? 'bg-orange' : 'bg-green'"
            >
              {{ props.row.role }}
            </q-badge>
          </q-td>

          <q-td>
            <q-btn
              flat
              round
              color="dark"
              icon="edit"
              @click="editDialog(props.row)"
            />
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="deleteDialog(props.row.email)"
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
          <q-btn flat label="Delete" color="negative" @click="deleteAuthUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- dialog -->
    <q-dialog v-model="show">
      <q-card style="min-width: 300px; min-height: 300px">
        <q-card-section class="bg-deep-purple-11">
          <div class="text-h6 text-center">
            {{ isEdit ? "Update User" : "Create User" }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-sm q-mt-md">
            <div class="text-center">
              <span style="color:red" v-if="existUser === true"
                >Email already exists!</span
              >
            </div>
            <q-input
              color="deep-purple-11"
              v-model="name"
              label="Name"
              type="text"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            />

            <q-input
              color="deep-purple-11"
              v-model="email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Email is required']"
            />

            <q-input
              color="deep-purple-11"
              v-model="password"
              label="Password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Password is required',
              ]"
            />

            <!-- <q-input
              color="deep-purple-11"
              v-model="role"
              label="Role"
              type="text"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Role is required',
              ]"
            /> -->

            <q-select
              color="deep-purple-11"
              v-model="role"
              :options="options"
              label="Role"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Close" color="deep-purple-10" />
          <q-btn
            flat
            v-if="!isEdit"
            color="deep-purple-10"
            label="Create"
            @click="createUser"
          />

          <q-btn
            flat
            v-if="isEdit"
            @click="updateAuthUser"
            color="deep-purple-10"
            label="Update"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script src="./auth-user.js" />

<style>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
