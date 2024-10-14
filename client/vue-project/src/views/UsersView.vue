<template>  
    <div class="modal fade" id="popupAddUser" tabindex="-1" aria-labelledby="popupAddUser" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupAddUser">Ajouter un utilisateur</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="mb-3">
                        <label for="newUserNom" class="form-label required">Nom</label>
                        <input type="text" class="form-control required" id="newUserNom" v-model="newUser.nom">
                    </div>
                    <div class="mb-3">
                        <label for="newUserPrenom" class="form-label required">Prenom</label>
                        <input type="text" class="form-control required" id="newUserPrenom" v-model="newUser.prenom">
                    </div>
                    <div class="mb-3">
                        <label for="newUserEmail" class="form-label required">Adresse mail</label>
                        <input type="email" class="form-control required" id="newUserEmail" v-model="newUser.email">
                    </div>
                    <div class="mb-3">
                        <label for="newUserPassword" class="form-label required">Mot de passe</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control required" id="newUserPassword" v-model="newUser.password">
                            <span class="input-group-text btn btn-success" @click="generate_password('newUser')" id="basic-addon2" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Générer un mot de passe"><i class="fa-solid fa-key"></i></span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="newUserDroit" class="form-label">Droit</label>
                        <select class="form-select" id="newUserDroit" aria-label="newUserDroit" v-model="newUser.droit">
                            <option value="utilisateur">Utilisateur</option>
                            <option value="admin">Administrateur</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" @click="insert_new_user"><i class="fa-solid fa-floppy-disk"></i>&nbsp;Ajouter</button>
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
                                <button type="button" @click="displayPopupAddUser" class="btn btn-success"><i
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
    .required:after {
        content:" *";
        color: red;
    }
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
    const popupAddUser = ref(null);
    const newUser = ref({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        droit: 'utilisateur'
    });
    const msg_err_add=ref('');

    const updateUser = ref({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        droit: 'utilisateur'
    });

    const generate_password=(form)=>{
        const newPassword = Math.random().toString(36).slice(2);

        if(form=="newUser")
        {
            newUser.value.password = newPassword;
        }
        else if(form=="updateUser")
        {
            updateUser.value.password = newPassword;
        }
        
    }   

    const initNewUserForm=()=>{

        newUser.value.nom = "";
        newUser.value.prenom = "";
        newUser.value.email = "";
        newUser.value.password = "";
        newUser.value.droit = "utilisateur";

        document.getElementById('newUserNom').classList.remove('is-invalid');
        document.getElementById('newUserPrenom').classList.remove('is-invalid');
        document.getElementById('newUserEmail').classList.remove('is-invalid');
        document.getElementById('newUserPassword').classList.remove('is-invalid');
        document.getElementById('newUserDroit').classList.remove('is-invalid');

    }


    const insert_new_user = async (form) => {

        document.getElementById('newUserNom').classList.remove('is-invalid');
        document.getElementById('newUserPrenom').classList.remove('is-invalid');
        document.getElementById('newUserEmail').classList.remove('is-invalid');
        document.getElementById('newUserPassword').classList.remove('is-invalid');
        document.getElementById('newUserDroit').classList.remove('is-invalid');


        let valid_form=true;
        if(newUser.value.nom=="") {document.getElementById('newUserNom').classList.add('is-invalid');valid_form=false;}
        if(newUser.value.prenom=="") {document.getElementById('newUserPrenom').classList.add('is-invalid');valid_form=false;}
        if(newUser.value.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null) {document.getElementById('newUserEmail').classList.add('is-invalid');valid_form=false;}
        if(newUser.value.password=="") {document.getElementById('newUserPassword').classList.add('is-invalid');valid_form=false;}
        if(newUser.value.droit=="") {document.getElementById('newUserDroit').classList.add('is-invalid');valid_form=false;}

        if(valid_form)
        {
            try {
                const response = await axios.post('http://localhost:3000/add-user', newUser.value,
                    {
                        headers: {
                            'Authorization': `Bearer ${myStore.getToken()}`
                        }
                    }
                );
                popupAddUser.value.hide();
                get_rows('');
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    
    const displayPopupAddUser=()=>{
        popupAddUser.value=new Modal(document.getElementById("popupAddUser"));
        initNewUserForm();
        popupAddUser.value.show();
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