<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center mt-2">
                <h1>Gestion des clients</h1>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Tél.</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Adresse</th>
                            <th scope="col" style="width:20%">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Rechercher..." v-model="q_search" id="search_client" >
                                    <span class="input-group-text" id="basic-addon2"><i class="fa-solid fa-search"></i></span>
                                    <button type="button" @click="displayPopupAddClient" class="btn btn-success"><i
                                        class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in TabClients" :key="row.id">
                            <th scope="row">{{ row.id }}</th>
                            <td>{{ row.nom }}</td>
                            <td>{{ row.prenom }}</td>
                            <td>{{ row.email }}</td>
                            <td>{{ row.droit }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" @click="edit_user(row.id)" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier l'utilisateur">
                                      <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button type="button" @click="change_pwd(row.id)" class="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="Changer le mot de passe"><i
                                        class="fa-solid fa-key"></i>
                                    </button>
                                    <button v-if="row.nom != 'admin'" type="button" @click="delete_user(row.id)" class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer l'utilisateur"><i
                                        class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>  
</template>
<script setup>

    import { ref, onMounted } from 'vue';
    import { useStore } from '../stores/store';
    import axios from 'axios';
    import { useRouter } from 'vue-router'

    const myStore = useStore();
    const router = useRouter();

    const TabClients = ref([]);
    const popupAddClient = ref(null);
    const q_search = ref('');

    onMounted(() => {

        if(myStore.getToken()=="")
        {
           router.push({ name: 'login' });
        }
    });
</script>