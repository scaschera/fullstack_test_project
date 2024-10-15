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
                            <option value="utilisateur">utilisateur</option>
                            <option value="admin">admin</option>
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
    <div class="modal fade" id="popupEditUser" tabindex="-1" aria-labelledby="popupEditUser" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupEditUser">Modifier un utilisateur</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="mb-3">
                        <label for="updateUserNom" class="form-label required">Nom</label>
                        <input type="text" class="form-control required" id="updateUserNom" v-model="updateUser.nom">
                    </div>
                    <div class="mb-3">
                        <label for="updateUserPrenom" class="form-label required">Prenom</label>
                        <input type="text" class="form-control required" id="updateUserPrenom" v-model="updateUser.prenom">
                    </div>
                    <div class="mb-3">
                        <label for="updateUserEmail" class="form-label required">Adresse mail</label>
                        <input type="email" class="form-control required" id="updateUserEmail" v-model="updateUser.email">
                    </div>
                    <div class="mb-3">
                        <label for="updateUserDroit" class="form-label">Droit</label>
                        <select class="form-select" id="updateUserDroit" aria-label="updateUserDroit" v-model="updateUser.droit">
                            <option value="utilisateur">utilisateur</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" @click="valid_update_user"><i class="fa-solid fa-floppy-disk"></i>&nbsp;Modifier</button>
            </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="popupChangePassword" tabindex="-1" aria-labelledby="popupChangePassword" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="popupChangePassword">Changer le mot de passe</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="updateUserPassword" class="form-label required">Nouveau Mot de passe</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control required" id="updateUserPassword" v-model="newPwdUser">
                                <span class="input-group-text btn btn-success" @click="generate_password('updateUser')" id="basic-addon2" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Générer un mot de passe"><i class="fa-solid fa-key"></i></span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="updateUserPassword2" class="form-label required">Re-saisir le Mot de passe</label>
                            <input type="text" class="form-control required" id="updateUserPassword2" v-model="newPwdUser2">
                        </div>
                        <div class="mb-3" id="row_send_mail">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="sendMailChangePwd" v-model="sendMailChangePwd">
                                <label class="form-check-label" for="sendMailChangePwd">
                                    Envoyer un mail à la personne
                                </label>
                            </div>
                        </div>
                        <div class="mb-3" v-if="msg_err_change_pwd">
                            <p class="text-danger text-center" >{{msg_err_change_pwd}}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-primary" @click="valid_update_pwd"><i class="fa-solid fa-floppy-disk"></i>&nbsp;Modifier</button>
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
    const popupEditUser = ref(null);
    const popupChangePassword = ref(null);

    const newUser = ref({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        droit: 'utilisateur'
    });

    const updateUser = ref({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        droit: 'utilisateur'
    });

    const newPwdUser = ref('');
    const newPwdUser2 = ref('');
    const sendMailChangePwd = ref(false);
    const msg_err_change_pwd = ref('');

    const generate_password=(form)=>{
        const newPassword = Math.random().toString(36).slice(2);

        if(form=="newUser")
        {
            newUser.value.password = newPassword;
        }
        else if(form=="updateUser")
        {
            newPwdUser.value = newPassword;
        }
        
    }   

    const delete_user= async (id)=>{

        if(confirm("Etes-vous sûr de supprimer cet utilisateur ?"))
        {
            try {
                const response = await axios.post('http://localhost:3000/delete-user', { id: id},
                    {
                        headers: {
                            'Authorization': `Bearer ${myStore.getToken()}`
                        }
                    }
                );
                get_rows('');
            }
            catch (error) {
                console.error(error);
            }
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

    const edit_user= async (id)=>{
        
        const response = await axios.post('http://localhost:3000/get-user', { id: id },
            {
                headers: {
                    'Authorization': `Bearer ${myStore.getToken()}`
                }
            }
        );
        updateUser.value = response.data;
        if(updateUser.value.nom=="admin")
        {
            document.getElementById('updateUserNom').disabled=true;
            document.getElementById('updateUserPrenom').disabled=true;
            document.getElementById('updateUserDroit').disabled=true;
        }
        else
        {
            document.getElementById('updateUserNom').disabled=false;
            document.getElementById('updateUserPrenom').disabled=false;
            document.getElementById('updateUserDroit').disabled=false;
        }
        popupEditUser.value=new Modal(document.getElementById("popupEditUser"));
        popupEditUser.value.show();

    }

    const change_pwd= async (id)=>{
        
        const response = await axios.post('http://localhost:3000/get-user', { id: id },
            {
                headers: {
                    'Authorization': `Bearer ${myStore.getToken()}`
                }
            }
        );
        updateUser.value = response.data;
        if(updateUser.value.nom=="admin")
        {
            document.getElementById('row_send_mail').style.display="none";
        }
        else
        {
            document.getElementById('row_send_mail').style.display="block";
        }
        popupChangePassword.value=new Modal(document.getElementById("popupChangePassword"));
        popupChangePassword.value.show();

    }

    const valid_update_pwd= async ()=>{
        
        document.getElementById('updateUserPassword').classList.remove('is-invalid');
        document.getElementById('updateUserPassword2').classList.remove('is-invalid');


        let valid_form=true;
        let error="";
        if(newPwdUser.value=="") {document.getElementById('updateUserPassword').classList.add('is-invalid');valid_form=false;error="Veuillez saisir les champs"}
        if(newPwdUser2.value=="") {document.getElementById('updateUserPassword2').classList.add('is-invalid');valid_form=false;error="Veuillez saisir les champs"}

        if(newPwdUser.value.length>0 && newPwdUser2.value.length>0 && (newPwdUser.value!=newPwdUser2.value)){valid_form=false;error="Les mots de passe ne sont pas identiques"}

        msg_err_change_pwd.value=error;

        if(valid_form)
        {
            try {
                const response = await axios.post('http://localhost:3000/update-user-pwd', { new_pwd: newPwdUser.value, id: updateUser.value.id,sendMailChangePwd:sendMailChangePwd.value,email: updateUser.value.email },
                    {
                        headers: {
                            'Authorization': `Bearer ${myStore.getToken()}`
                        }
                    }
                );
                popupChangePassword.value.hide();
                get_rows('');
            }
            catch (error) {
                console.error(error);
            }
        }

    }

    const valid_update_user= async ()=>{
        
        document.getElementById('updateUserNom').classList.remove('is-invalid');
        document.getElementById('updateUserPrenom').classList.remove('is-invalid');
        document.getElementById('updateUserEmail').classList.remove('is-invalid');
        document.getElementById('updateUserDroit').classList.remove('is-invalid');


        let valid_form=true;
        if(updateUser.value.nom=="") {document.getElementById('updateUserNom').classList.add('is-invalid');valid_form=false;}
        if(updateUser.value.prenom=="") {document.getElementById('updateUserPrenom').classList.add('is-invalid');valid_form=false;}
        if(updateUser.value.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null) {document.getElementById('updateUserPrenom').classList.add('is-invalid');valid_form=false;}
        if(updateUser.value.droit=="") {document.getElementById('updateUserDroit').classList.add('is-invalid');valid_form=false;}

        if(valid_form)
        {
            try {
                const response = await axios.post('http://localhost:3000/update-user', updateUser.value,
                    {
                        headers: {
                            'Authorization': `Bearer ${myStore.getToken()}`
                        }
                    }
                );
                popupEditUser.value.hide();
                get_rows('');
            }
            catch (error) {
                console.error(error);
            }
        }

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