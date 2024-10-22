<template>
  <div class="modal fade" id="popupAddArticle" tabindex="-1" aria-labelledby="popupAddArticle" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="popupAddArticle">Ajouter un article</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Titre</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="titre">
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Prix</label>
                    <div class="input-group mb-3">
                      <input type="number" class="form-control" id="exampleFormControlInput1" v-model="prix" step="0.01">
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">€</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Quantité</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" v-model="qte" >
                  </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="insert_new_row"><i
                class="fa-solid fa-floppy-disk"></i>&nbsp;Enregistrer</button>
          </div>
          </div>
      </div>
  </div>
  <div class="modal fade" id="popupUpdateArticle" tabindex="-1" aria-labelledby="popupUpdateArticle" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="popupUpdateArticle">Modifier un article</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Titre</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" v-model="titre_update">
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content_update"></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Prix</label>
                  <div class="input-group mb-3">
                    <input type="number" class="form-control" id="exampleFormControlInput1" v-model="prix_update" step="0.01">
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">€</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Quantité</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" v-model="qte_update" >
                </div>
              </div>
            </div>
            <div class="mb-3" v-if="msg">
              <p>{{ msg_err_update }}</p>
            </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="update_row"><i
                class="fa-solid fa-floppy-disk"></i>&nbsp;Enregistrer</button>
          </div>
          </div>
      </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-2">
        <h1>Mes articles</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style="width:1%">#</th>
              <th scope="col">Titre</th>
              <th scope="col">Content</th>
              <th scope="col" style="width:10%">Prix</th>
              <th scope="col" style="width:10%">Quantité</th>
              <th scope="col " style="width:10%">
                <button type="button" @click="display_form_add" class="btn btn-success"><i
                    class="fa-solid fa-plus"></i></button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in list_rows" :key="row.id">
              <th scope="row" valign="middle">{{ row.id }}</th>
              <td valign="middle">{{ row.title }}</td>
              <td valign="middle">{{ row.content }}</td>
              <td valign="middle">{{ row.price }} €</td>
              <td valign="middle">
                  <span :class="`badge bg-${row.qte === 0 ? 'danger' : row.qte <= 5 ? 'warning' : 'success'}`" style="margin-top: 5px;">{{ row.qte }}</span>
                  <div class="btn-group float-end" role="group" aria-label="Basic example" >
                    <button type="button" v-if="row.qte > 0" @click="update_qte_article(row.qte-1,row.id)"  class="btn btn-sm btn-secondary"><i
                      class="fa-solid fa-minus"></i></button>
                    <button type="button" @click="update_qte_article(row.qte+1,row.id)" class="btn  btn-sm btn-secondary"><i
                      class="fa-solid fa-plus"></i></button>
                    
                  </div>
              </td>
              <td valign="middle">
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
  </div>
</template>
<script setup>

import { ref, onMounted, watch } from 'vue';
import { useStore } from '../stores/store';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { Tooltip, Modal } from "bootstrap";

const titre = ref('');
const content = ref('');
const prix = ref('0');
const qte = ref('0');

const id_update = ref('');
const titre_update = ref('');
const content_update = ref('');
const prix_update = ref('0');
const qte_update = ref('0');

const msg_err_update = ref('');
const list_rows = ref([]);
const modal_form_add = ref(null);
const modal_form_update = ref(null);

const myStore = useStore();
const router = useRouter();

const display_form_add=()=>{

  titre.value = '';
  content.value = '';
  prix.value = '0';
  qte.value = '0';

  modal_form_add.value=new Modal(document.getElementById("popupAddArticle"));
  modal_form_add.value.show();
}

const insert_new_row = async () => {
  try {
    const response = await axios.post('http://localhost:3000/insert-row', {
      title: titre.value,
      content: content.value,
      price: prix.value,
      qte: qte.value
    }, {
      headers: {
        'Authorization': `Bearer ${myStore.getToken()}`
      }
    });

    modal_form_add.value.hide();
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
    
    modal_form_update.value=new Modal(document.getElementById("popupUpdateArticle"));
    modal_form_update.value.show();

    id_update.value = id;
    titre_update.value = row.title;
    content_update.value = row.content;
    prix_update.value = row.price;
    qte_update.value = row.qte;
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
      content: content_update.value,
      price: prix_update.value,
      qte: qte_update.value
    }, {
      headers: {
        'Authorization': `Bearer ${myStore.getToken()}`
      }
    });
    msg_err_update.value = response.data.message;
    modal_form_update.value.hide();
    titre_update.value = '';
    content_update.value = '';
    get_rows('');
  }
  catch (error) {
    console.error(error);
  }
}

const update_qte_article = async (newqte, id) => {
  try {
    const response = await axios.post('http://localhost:3000/update-qte', {
      qte: newqte,
      id: id
    }, {
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