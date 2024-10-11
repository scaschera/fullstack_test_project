<template>

  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-2">
        <h1>Mes articles</h1>
      </div>
    </div>
    <div class="row" v-if="!display_form_add">
      <div class="col-12">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titre</th>
              <th scope="col">Content</th>
              <th scope="col">
                <button type="button" @click="display_form_add = true" class="btn btn-success"><i
                    class="fa-solid fa-plus"></i></button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in list_rows" :key="row.id">
              <th scope="row">{{ row.id }}</th>
              <td>{{ row.title }}</td>
              <td>{{ row.content }}</td>
              <td>
                <button type="button" @click="edit_article(row.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier" class="btn btn-primary"><i
                  class="fa-solid fa-edit"></i></button>&nbsp;
                <button type="button" @click="delete_article(row.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer" class="btn btn-danger"><i
                    class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" v-if="display_form_add">
      <div class="col-12 text-center mt-2">
        <h1>Ajouter un article</h1>
      </div>
      <div class="col-12">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Titre</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="titre">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Content</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-danger" @click="display_form_add = false">Annuler</button>&nbsp;
          <button type="button" class="btn btn-primary" @click="insert_new_row"><i
              class="fa-solid fa-floppy-disk"></i>&nbsp;Enregistrer</button>
        </div>
        <div class="mb-3" v-if="msg">
          <p>{{ msg }}</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="display_form_update">
      <div class="col-12 text-center mt-2">
        <h1>Modifier un article</h1>
      </div>
      <div class="col-12">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Titre</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="titre_update">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Content</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content_update"></textarea>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-danger" @click="display_form_update = false">Annuler</button>&nbsp;
          <button type="button" class="btn btn-primary" @click="update_row"><i
              class="fa-solid fa-floppy-disk"></i>&nbsp;Enregistrer</button>
        </div>
        <div class="mb-3" v-if="msg">
          <p>{{ msg_err_update }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref, onMounted, watch } from 'vue';
import { useStore } from '../stores/store';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { Tooltip } from "bootstrap";

const titre = ref('');
const content = ref('');

const id_update = ref('');
const titre_update = ref('');
const content_update = ref('');

const msg = ref('');
const msg_err_update = ref('');
const list_rows = ref([]);
const display_form_add = ref(false);
const display_form_update = ref(false);

const myStore = useStore();
const router = useRouter();

const insert_new_row = async () => {
  try {
    const response = await axios.post('http://localhost:3000/insert-row', {
      title: titre.value,
      content: content.value
    }, {
      headers: {
        'Authorization': `Bearer ${myStore.getToken()}`
      }
    });
    msg.value = response.data.message;

    display_form_add.value = false;
    titre.value = '';
    content.value = '';
    get_rows('');
  }
  catch (error) {
    console.error(error);
  }

}

const edit_article = async (id) => {
  try {
    const response = await axios.post('http://localhost:3000/get-row', { id: id });
    const row = response.data;
    msg_err_update.value = '';
    display_form_update.value = true;
    id_update.value = id;
    titre_update.value = row.title;
    content_update.value = row.content;
  }
  catch (error) {
    console.error(error);
    msg_err_update.value = error.response.data.message;
  }
}

const update_row = async () => {
  try {
    const response = await axios.post('http://localhost:3000/update-row', {
      id: id_update.value,
      title: titre_update.value,
      content: content_update.value
    }, {
      headers: {
        'Authorization': `Bearer ${myStore.getToken()}`
      }
    });
    msg_err_update.value = response.data.message;
    display_form_update.value = false;
    titre_update.value = '';
    content_update.value = '';
    get_rows('');
  }
  catch (error) {
    console.error(error);
  }
}

const delete_article = async (id) => {

  if (confirm('Etes-vous sûr de vouloir supprimer cet article ?')) {
    try {
      const response = await axios.post('http://localhost:3000/delete-row', { id: id }, {
        headers: {
          'Authorization': `Bearer ${myStore.getToken()}`
        }
      });
      get_rows('');
    }
    catch (error) {
      console.error(error);
    }
  }
}

const get_rows = async (q) => {
  try {
    const response = await axios.post('http://localhost:3000/get-rows', { q: q });
    list_rows.value = response.data;
  }
  catch (error) {
    console.error(error);
  }
}

watch(() => myStore.articlesearch, (newVal, oldVal) => {
  get_rows(newVal);
});

onMounted(() => {
  if(myStore.getToken()!="")
  {
    get_rows(myStore.articlesearch);
  }
  else{
    router.push({ name: 'login' });
  }

  // Tooltips initialization
  new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
  })

});
</script>