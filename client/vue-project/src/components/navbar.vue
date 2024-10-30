<template>

  <!--------------contenu du panier (deb)-->
  <div id="content_cart" class="d-none">
    <div class="container">
      <div class="row fluid">
        <div class="col-12">
          <ul class="list-group list-group-flush">
            <template v-if="useStore().getCart().length>0">
              <li class="list-group-item" v-for="row in useStore().getCart()" :key="row.id">
                {{ row.qte }} x {{ row.title }} - {{ row.price }} €
              </li>
            </template>
            <template v-else>
              <li class="list-group-item text-center">Panier vide</li>
            </template>
            <li class="list-group-item text-center"><span class="badge bg-secondary" >Total : {{useStore().getTotalCart()}} €</span></li>
          </ul>
        </div>
      </div>
      <div class="row" v-if="useStore().getCart().length>0">
        <div class="col-12 text-center">
          <RouterLink class="btn btn-primary btn-sm" aria-current="page" :to="{ name: 'panier' }"><i class="fa-solid fa-bag-shopping"></i>&nbsp;Commander</RouterLink>
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
            <i class="fas fa-shopping-cart nav-icon" style="margin-right:5px"></i>
            <span class="badge bg-secondary" v-if="useStore().getCartLength()>0"
              style="margin-right:10px">{{ useStore().getCartLength() }}</span>
            <i class="fa-solid fa-caret-down" style="color:red"></i>
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

const removeArticleInCart = (id) => {
  alert(id);
  //useStore().removeFromCart(id);
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
<style lang="css" scoped>
  
</style>