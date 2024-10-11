

<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">Hello world</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isLogged">
            <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'articles' }">Articles</RouterLink>
          </li>
        </ul>
        <!-- Dropdown de login -->
        <template v-if="isLogged">
          <span class="badge bg-primary fs-6" style="margin-right:10px">
            <i class="fas fa-user"></i>
            {{ user.nom }} {{ user.prenom }}
            <i class="fa-solid fa-right-from-bracket" style="color:red;padding-left: 10px;"></i>
          </span>
        </template>
        <template v-if="!isLogged">
          <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'login' }" style="margin-right:10px">Se connecter</RouterLink>
        </template>
        <form class="d-flex" v-if="isLogged">
          <div class="input-group mb-1 mt-1">
            <input class="form-control" type="search" v-model="q" @keyup="search_article" placeholder="Rechercher un article" aria-label="Search">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
          </div>
        </form>
        
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script setup>

  import { onMounted, ref, watch } from 'vue';
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { useStore } from '@/stores/store';

  const q=ref('');

  const router = useRouter();
  const user=ref({
      nom: '',
      prenom: '',
      email: ''
    });

  const isLogged=ref(false);

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

</script>

<style scoped></style>
