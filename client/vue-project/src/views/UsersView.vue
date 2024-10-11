<template>  
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center mt-2">
                <h1>Gestion des utilisateurs</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Adresse mail</th>
                            <th scope="col">Droit</th>
                            <th scope="col">
                                <button type="button" @click="displayPopup" class="btn btn-success"><i
                                    class="fa-solid fa-plus"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in list_rows" :key="row.id">
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
                                    <button type="button" @click="delete_user(row.id)" class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer l'utilisateur"><i
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
<style lang="css" scoped>
</style>
<script setup>

    import { ref, onMounted } from 'vue';
    import { useStore } from '../stores/store';
    import axios from 'axios';
    import { useRouter } from 'vue-router'
    import { Tooltip,Modal } from "bootstrap";

    const list_rows = ref([]);
    const myStore = useStore();
    const router = useRouter();
    const myModal = ref(null);

    
    const displayPopup=()=>{
        myModal.value=new Modal(document.getElementById("exampleModal"));
        myModal.value.show();
    }

    const get_rows = async (q) => {
        try {
            const response = await axios.post('http://localhost:3000/get-users', { q: q },
                {
                    headers: {
                        'Authorization': `Bearer ${myStore.getToken()}`
                    }
                }
            );
            list_rows.value = response.data;
        }
        catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {

        if(myStore.getToken()!="" && myStore.user.droit=="admin")
        {
            get_rows('');
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