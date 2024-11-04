<template>

    <div class="modal fade" id="popupAddClient" tabindex="-1" aria-labelledby="popupAddClient" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupAddClient">Ajouter un client</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="newClientNom" class="form-label required">Nom</label>
                            <input type="text" class="form-control required" id="newClientNom" v-model="newClient.nom">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="newClientPrenom" class="form-label required">Prenom</label>
                            <input type="text" class="form-control required" id="newClientPrenom" v-model="newClient.prenom">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="newClientTel" class="form-label required">Téléphone</label>
                            <input type="text" class="form-control required" id="newClientTel" v-model="newClient.telephone">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="newClientAdresse" class="form-label required">Adresse</label>
                            <input type="text" class="form-control required" id="newClientAdresse" v-model="newClient.adresse">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="newClientCp" class="form-label required">Code postal</label>
                            <input type="text" class="form-control required" id="newClientCp" v-model="newClient.cp">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="newClientVille" class="form-label required">Ville</label>
                            <input type="text" class="form-control required" id="newClientVille" v-model="newClient.ville">
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label for="newClientEmail" class="form-label required">Adresse mail</label>
                        <input type="email" class="form-control required" id="newClientEmail" v-model="newClient.email">
                    </div>
                    <div class="mb-3">
                        <label for="newClientPassword" class="form-label required">Mot de passe</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control required" id="newClientPassword" v-model="newClient.password">
                            <span class="input-group-text btn btn-success" @click="generate_password('newClient')" id="basic-addon2" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Générer un mot de passe"><i class="fa-solid fa-key"></i></span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" @click="insert_new_Client"><i class="fa-solid fa-floppy-disk"></i>&nbsp;Ajouter</button>
            </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="popupEditClient" tabindex="-1" aria-labelledby="popupEditClient" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupEditClient">Modifier un client</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="updateClientNom" class="form-label required">Nom</label>
                            <input type="text" class="form-control required" id="updateClientNom" v-model="updateClient.nom">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="updateClientPrenom" class="form-label required">Prenom</label>
                            <input type="text" class="form-control required" id="updateClientPrenom" v-model="updateClient.prenom">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="updateClientTel" class="form-label required">Téléphone</label>
                            <input type="text" class="form-control required" id="updateClientTel" v-model="updateClient.telephone">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="updateClientAdresse" class="form-label required">Adresse</label>
                            <input type="text" class="form-control required" id="updateClientAdresse" v-model="updateClient.adresse">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="updateClientCp" class="form-label required">Code postal</label>
                            <input type="text" class="form-control required" id="updateClientCp" v-model="updateClient.cp">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="updateClientVille" class="form-label required">Ville</label>
                            <input type="text" class="form-control required" id="updateClientVille" v-model="updateClient.ville">
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label for="updateClientEmail" class="form-label required">Adresse mail</label>
                        <input type="email" class="form-control required" id="updateClientEmail" v-model="updateClient.email">
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary" @click="valid_update_client"><i class="fa-solid fa-floppy-disk"></i>&nbsp;Modifier</button>
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
                            <label for="updateClientPassword" class="form-label required">Nouveau Mot de passe</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control required" id="updateClientPassword" v-model="newPwdClient">
                                <span class="input-group-text btn btn-success" @click="generate_password('updateClient')" id="basic-addon2" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Générer un mot de passe"><i class="fa-solid fa-key"></i></span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="updateClientPassword2" class="form-label required">Re-saisir le Mot de passe</label>
                            <input type="text" class="form-control required" id="updateClientPassword2" v-model="newPwdClient2">
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
            <div class="col-12 text-center mt-5">
                <h1>Gestion des clients</h1>
            </div>
        </div>
        <div class="row mt-3">
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
                            <td>{{ row.telephone}}</td>
                            <td>{{ row.email }}</td>
                            <td>{{ row.adresse }}<br />{{ row.cp }} {{ row.ville }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" @click="edit_client(row.id)" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier le client">
                                      <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button type="button" @click="change_pwd(row.id)" class="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="Changer le mot de passe"><i
                                        class="fa-solid fa-key"></i>
                                    </button>
                                    <button v-if="row.nom != 'admin'" type="button" @click="delete_client(row.id)" class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer le client"><i
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

    import { ref, onMounted, watch } from 'vue';
    import { useStore } from '../stores/store';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { Tooltip,Modal } from "bootstrap";

    const myStore = useStore();
    const router = useRouter();

    const TabClients = ref([]);
    const popupAddClient = ref(null);
    const popupEditClient = ref(null);
    const popupChangePwdClient = ref(null);
    const q_search = ref('');
    const newPwdClient = ref('');
    const newPwdClient2 = ref('');
    const sendMailChangePwd = ref(false);
    const msg_err_change_pwd = ref('');

    const newClient = ref({
        nom: '',
        prenom: '',
        adresse: '',
        cp: '',
        ville: '',
        email: '',
        telephone: '',
        password: ''
    });

    const updateClient = ref({
        id: '',
        nom: '',
        prenom: '',
        adresse: '',
        cp: '',
        ville: '',
        email: '',
        telephone: '',
        password: ''
    });

    const generate_password=(form)=>{
        const newPassword = Math.random().toString(36).slice(2);

        if(form=="newClient")
        {
            newClient.value.password = newPassword;
        }
        else if(form=="updateClient")
        {
            newPwdClient.value = newPassword;
        }
        
    }
    
    const delete_client= async (id)=>{

        if(confirm("Etes-vous sûr de supprimer ce client ?"))
        {
            try {
                const response = await axios.post('http://localhost:3000/delete-client', { id: id},
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

    const valid_update_pwd= async ()=>{
        
        document.getElementById('updateClientPassword').classList.remove('is-invalid');
        document.getElementById('updateClientPassword2').classList.remove('is-invalid');


        let valid_form=true;
        let error="";
        if(newPwdClient.value=="") {document.getElementById('updateClientPassword').classList.add('is-invalid');valid_form=false;error="Veuillez saisir les champs"}
        if(newPwdClient2.value=="") {document.getElementById('updateClientPassword2').classList.add('is-invalid');valid_form=false;error="Veuillez saisir les champs"}

        if(newPwdClient.value.length>0 && newPwdClient2.value.length>0 && (newPwdClient.value!=newPwdClient2.value)){valid_form=false;error="Les mots de passe ne sont pas identiques"}

        msg_err_change_pwd.value=error;

        if(valid_form)
        {
            try {
                const response = await axios.post('http://localhost:3000/update-client-pwd', { new_pwd: newPwdClient.value, id: updateClient.value.id,sendMailChangePwd:sendMailChangePwd.value,email: updateClient.value.email },
                    {
                        headers: {
                            'Authorization': `Bearer ${myStore.getToken()}`
                        }
                    }
                );
                popupChangePwdClient.value.hide();
                get_rows('');
            }
            catch (error) {
                console.error(error);
            }
        }

    }

    const insert_new_Client = async () => {
        try {
            const response = await axios.post('http://localhost:3000/new-client', newClient.value,
                {
                    headers: {
                        'Authorization': `Bearer ${myStore.getToken()}`
                    }
                }
            );
            popupAddClient.value.hide();
            get_rows('');
        }
        catch (error) {
            console.error(error);
        }
    }

    const displayPopupAddClient = () => {

        newClient.value.nom = '';
        newClient.value.prenom = '';
        newClient.value.adresse = '';
        newClient.value.cp = '';
        newClient.value.ville = '';
        newClient.value.email = '';
        newClient.value.telephone = '';
        newClient.value.password = '';

        popupAddClient.value = new Modal(document.getElementById("popupAddClient"));
        popupAddClient.value.show();
    }

    const edit_client= async (id)=>{
        
        const response = await axios.post('http://localhost:3000/get-client', { id: id },
            {
                headers: {
                    'Authorization': `Bearer ${myStore.getToken()}`
                }
            }
        );
        updateClient.value = response.data;
        popupEditClient.value=new Modal(document.getElementById("popupEditClient"));
        popupEditClient.value.show();

    }

    const change_pwd= async (id)=>{
        
        const response = await axios.post('http://localhost:3000/get-client', { id: id },
            {
                headers: {
                    'Authorization': `Bearer ${myStore.getToken()}`
                }
            }
        );
        updateClient.value = response.data;
        popupChangePwdClient.value=new Modal(document.getElementById("popupChangePassword"));
        popupChangePwdClient.value.show();

    }

    const valid_update_client= async ()=>{
        
        
        try {
            const response = await axios.post('http://localhost:3000/update-client', updateClient.value,
                {
                    headers: {
                        'Authorization': `Bearer ${myStore.getToken()}`
                    }
                }
            );
            popupEditClient.value.hide();
            get_rows('');
        }
        catch (error) {
            console.error(error);
        }

    }

    const get_rows = async (q) => {
        try {
            const response = await axios.post('http://localhost:3000/get-clients', { q: q },
                {
                    headers: {
                        'Authorization': `Bearer ${myStore.getToken()}`
                    }
                }
            );
            TabClients.value = response.data;
        }
        catch (error) {
            console.error(error);
        }
    }

    watch(() => q_search.value, (newVal, oldVal) => {
        get_rows(newVal);
    });

    onMounted(() => {

        if(myStore.getToken()!="")
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