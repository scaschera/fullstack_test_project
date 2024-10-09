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
                <button type="button" @click="delete_article(row.id)" class="btn btn-danger"><i
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
  </div>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';

const titre = ref('');
const content = ref('');
const msg = ref('');
const list_rows = ref([]);
const display_form_add = ref(false);

const insert_new_row = async () => {
  try {
    const response = await axios.post('http://localhost:3000/insert-row', {
      title: titre.value,
      content: content.value
    });
    msg.value = response.data.message;
  }
  catch (error) {
    console.error(error);
  }

}

const delete_article = async (id) => {

  if (confirm('Etes-vous sûr de vouloir supprimer cet article ?')) {
    try {
      const response = await axios.post('http://localhost:3000/delete-row', { id: id });
      get_rows();
    }
    catch (error) {
      console.error(error);
    }
  }
}

const get_rows = async () => {
  try {
    const response = await axios.get('http://localhost:3000/get-rows');
    list_rows.value = response.data;
  }
  catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  get_rows();
});
</script>