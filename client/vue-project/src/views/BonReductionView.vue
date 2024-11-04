<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-5">
        <h1>Gestion des bons de reduction</h1>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style="width:1%">#</th>
              <th scope="col">Code</th>
              <th scope="col">Description</th>
              <th scope="col" style="width:10%">Reduction</th>
              <th scope="col" style="width:10%">Type</th>
              <th scope="col" style="width:10%">Activé</th>
              <th scope="col " style="width:10%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in list_bons" :key="row.id">
              <td scope="row" valign="middle">{{ row.id }}</td>
              <td scope="row" valign="middle"><input type="text" :value="row.code" class="form-control" @keyup="update_bon(row.id,$event.target.value,'code')" /></td>
              <td scope="row" valign="middle"><input type="text" :value="row.description" class="form-control" @keyup="update_bon(row.id,$event.target.value,'description')" /></td>
              <td scope="row" valign="middle"><input type="text" :value="row.reduction" class="form-control" @keyup="update_bon(row.id,$event.target.value,'reduction')" /></td>
              <td scope="row" valign="middle">
                <select class="form-select"  @change="update_bon(row.id,$event.target.value,'type')">
                  <option value="pourcentage" :selected="row.type === 'pourcentage'">Pourcentage</option>
                  <option value="prix" :selected="row.type === 'prix'">Prix</option>
                </select>
              </td>
              <td scope="row" valign="middle">
                <input type="checkbox" :checked="row.is_active" @change="update_bon(row.id,$event.target.checked,'active')" />
              </td>
              <td scope="row" valign="middle">
                <button class="btn btn-danger" @click="delete_bon(row.id)"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td scope="col" colspan="2"><input type="text" v-model="new_bon.code" class="form-control" /></td>
              <td scope="col"><input type="text" v-model="new_bon.description" class="form-control" /></td>
              <td scope="col" style="width:10%"><input type="text" v-model="new_bon.reduction" class="form-control" /></td>
              <td scope="col" style="width:10%">
                <select class="form-select" v-model="new_bon.type">
                  <option value="pourcentage">Pourcentage</option>
                  <option value="prix">Prix</option>
                </select>
              </td>
              <td scope="col" style="width:10%">
                <input type="checkbox" v-model="new_bon.is_active" />
              </td>
              <td scope="col " style="width:10%"><button class="btn btn-success" @click="add_bon"><i class="fa-solid fa-plus"></i></button></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useStore } from '@/stores/store';

const list_bons = ref([]);
const new_bon = ref({
  code: '',
  description: '',
  reduction: '',
  type: 'pourcentage',
  is_active: true
});
const myStore = useStore();

const get_rows = async () => {
  try {
    const response = await axios.post('http://localhost:3000/get-bons-reduction');
    list_bons.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const add_bon = async () => {
  try {
    const response = await axios.post('http://localhost:3000/add-bon-reduction', new_bon.value, {
      headers: {
        'Authorization': `Bearer ${myStore.getToken()}`
      }
    });
    get_rows();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  get_rows();
});

</script>