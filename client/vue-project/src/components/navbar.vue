<template>

  <!--------------contenu du panier (deb)-->
  <div id="content_cart" class="d-none">
    <div class="container">
      <div class="row fluid">
        <div class="col-12">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Livre 1 - 15 €&nbsp;<a href="#" class="float-end"><i class="fa-solid fa-trash"></i></a></li>
            <li class="list-group-item">Livre 2 - 15 €&nbsp;<a href="#" class="float-end"><i class="fa-solid fa-trash"></i></a></li>
            <li class="list-group-item"><span class="badge bg-secondary" style="font-size: 15px !important;">Total : 30 €</span></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <a href="#" class="btn btn-primary"><i class="fa-solid fa-bag-shopping"></i></a>
        </div>
        <div class="col-6">
          <a href="#" class="btn btn-danger"><i class="fa-solid fa-trash"></i></a>
        </div>
      </div>
    </div>
  </div>
  <!--------------contenu du panier (fin)-->

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">Hello world</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isLogged">
            <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'articles' }">Articles</RouterLink>
          </li>
          <li class="nav-item" v-if="isLogged">
            <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'clients' }">Clients</RouterLink>
          </li>
          <li class="nav-item" v-if="isLogged && user.droit == 'admin'">
            <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'users' }">Utilisateurs</RouterLink>
          </li>
        </ul>
        <!-- Dropdown de login -->
        <template v-if="isLogged">
          <span class="badge bg-primary fs-6" style="margin-right:10px">
            <template v-if="user.droit == 'admin'">
              <i class="fas fa-user"></i>
            </template>
            <template v-else>
              <RouterLink :to="{ name: 'profile' }"><i class="fas fa-user" style="cursor: pointer;color: #FFF;"></i>
              </RouterLink>
            </template>
            {{ user.nom }} {{ user.prenom }}
            <i class="fa-solid fa-right-from-bracket" style="color:red;padding-left: 10px;cursor: pointer;"
              @click="useStore().logout"></i>
          </span>
        </template>
        <template v-if="!isLogged">
          <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'login' }" style="margin-right:10px">Se
            connecter</RouterLink>
        </template>
        <form class="d-flex" v-if="isLogged">
          <div class="input-group mb-1 mt-1">
            <input class="form-control" type="search" v-model="q" @keyup="search_article"
              placeholder="Rechercher un article" aria-label="Search">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
          </div>
        </form>
        <div class="d-flex">
          <div class="nav-link active" style="margin-right:10px;cursor: pointer;" data-bs-container="body"
            data-bs-toggle="popover">
            <i class="fas fa-shopping-cart nav-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>
<script setup>

import { onMounted, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from '@/stores/store';
import { Popover } from 'bootstrap'

const q = ref('');

const router = useRouter();
const user = ref({
  nom: '',
  prenom: '',
  email: ''
});

const isLogged = ref(false);

const search_article = () => {
  useStore().searchArticle(q.value);
  router.push({ name: 'articles' });
}

watch(() => useStore().user, (newVal, oldVal) => {
  user.value = newVal;
});

watch(() => useStore().isLogin, (newVal, oldVal) => {
  isLogged.value = newVal;
});

onMounted(() => {
  new Popover(document.body, {
    selector: "[data-bs-toggle='popover']",
    placement: 'bottom',
    html: true,
    trigger: 'click',
    
    content: () => {
      return document.getElementById('content_cart').innerHTML
    }
  })
});

</script>