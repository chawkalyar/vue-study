<template>
  <q-page class="q-pa-md ">
    <q-banner
      v-if="commonState.error"
      class="text-white q-mb-sm"
      :class="commonState.error ? 'bg-red' : 'bg-positive'"
    >
      show success or error
    </q-banner>
    <q-toolbar class=" shadow-2">
      <q-toolbar-title>Todo List</q-toolbar-title>
      <q-btn flat>
        <q-icon name="add" @click="createDialog(todo)" />
      </q-btn>
    </q-toolbar>
    <q-list separator bordered v-for="(todo, index) in todos" :key="index">
      <q-item>
        <q-item-section>
          <q-checkbox dense v-model="todo.completed" color="deep-purple-13">
            {{ todo.title }}</q-checkbox
          >
        </q-item-section>

        <q-item-section avatar>
          <q-icon color="deep-purple-7" name="edit" @click="editDialog(todo)" />
        </q-item-section>
        <q-item-section avatar>
          <q-icon
            color="negative"
            name="delete"
            @click="deleteDialog(todo.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- delete dialog -->
    <q-dialog v-model="showDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-xs">Are you sure you want to delete ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Close" color="primary" />
          <q-btn flat label="Delete" color="negative" @click="deleteTodo" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- dialog -->
    <q-dialog v-model="show">
      <q-card style="min-width: 300px; min-height: 300px">
        <q-card-section class="bg-deep-purple-11">
          <div class="text-h6 text-center">
            {{ isEdit ? "Update Todo" : "Add Todo" }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-sm q-mt-md">
            <q-input
              color="deep-purple-11"
              v-model="title"
              label="Title"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Title is required']"
            />

            <q-input
              color="deep-purple-11"
              v-model="completed"
              label="Completed"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Completed is required',
              ]"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Close" color="deep-purple-10" />
          <q-btn
            flat
            v-if="!isEdit"
            @click="createTodo"
            color="deep-purple-10"
            label="Create"
          />

          <q-btn
            flat
            v-if="isEdit"
            @click="updateTodo"
            color="deep-purple-10"
            label="Update"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script src="./todo.js" />

<style scoped>
.q-list,
.q-toolbar {
  /* background: rgb(252, 252, 166); 
  */
  background: rgb(204, 188, 233);
}
</style>
