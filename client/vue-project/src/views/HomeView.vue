<template>

  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-2">
        <h1>Test project fullstack</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Titre</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="titre">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Content</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-primary" @click="insert_new_row">Envoyer</button>
        </div>
        <div class="mb-3" v-if="msg">
          <p>{{ msg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref } from 'vue';
import axios from 'axios';

const titre = ref('');
const content = ref('');
const msg = ref('');

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
</script>