<template>
    <section style="background-color: #eee;">
        <div class="container py-5">

            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                            <h5 class="my-3">{{ myStore.getUser().nom }} {{ myStore.getUser().prenom }}</h5>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link text-dark text-uppercase"
                                        :class="activeTab === 'infos' ? 'active' : ''" id="infos-tab"
                                        @click="activeTab = 'infos'" role="tab" aria-controls="infos"
                                        aria-selected="true" style="cursor:pointer">Infos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link  text-dark text-uppercase"
                                        :class="activeTab === 'mdp' ? 'active' : ''" id="mdp-tab"
                                        @click="activeTab = 'mdp'" role="tab" aria-controls="mdp" aria-selected="false"
                                        style="cursor:pointer">Mot de
                                        passe</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade" :class="activeTab === 'infos' ? 'show active' : ''"
                                    id="infos" role="tabpanel" aria-labelledby="infos-tab">
                                    <div class="row mt-3">
                                        <div class="col-sm-12">
                                            <input type="text" class="form-control" v-model="newName" placeholder="Nom"
                                                aria-label="Nom">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-sm-12">
                                            <input type="text" class="form-control" v-model="newPrenom"
                                                placeholder="Prénom" aria-label="Prénom">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-sm-12">
                                            <input type="mail" class="form-control" v-model="newEmail"
                                                placeholder="Email" aria-label="Email">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <button type="button" class="btn btn-primary"
                                                @click="valid_update_user">Modifier</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" :class="activeTab === 'mdp' ? 'show active' : ''" id="mdp"
                                    role="tabpanel" aria-labelledby="mdp-tab">
                                    <div class="row mt-3">
                                        <div class="col-sm-12">
                                            <input type="password" class="form-control" id="oldUserPassword"
                                                v-model="oldPwd" placeholder="Ancien mot de passe"
                                                aria-label="Ancien mot de passe">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-sm-12">
                                            <div class="input-group">
                                                <input type="text" class="form-control required" id="updateUserPassword"
                                                    placeholder="Nouveau mot de passe" v-model="newPwd">
                                                <span class="input-group-text btn btn-success"
                                                    @click="generate_password()" id="basic-addon2"
                                                    style="cursor: pointer;" data-bs-toggle="tooltip"
                                                    data-bs-placement="top" title="Générer un mot de passe"><i
                                                        class="fa-solid fa-key"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-sm-12">
                                            <input type="password" class="form-control" id="updateUserPassword2"
                                                v-model="newPwd2" placeholder="Confirmer mot de passe"
                                                aria-label="Confirmer mot de passe">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <button type="button" class="btn btn-primary"
                                                @click="valid_update_pwd">Modifier</button>
                                            <span v-if="msg_error_pwd" class="text-danger" style="margin-left: 10px;">{{
                                                msg_error_pwd
                                                }}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useStore } from '@/stores/store';
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import axios from 'axios';


const myStore = useStore();
const router = useRouter();

const activeTab = ref('infos');

const newName = ref(myStore.getUser().nom);
const newPrenom = ref(myStore.getUser().prenom);
const newEmail = ref(myStore.getUser().email);

const oldPwd = ref('');
const newPwd = ref('');
const newPwd2 = ref('');
const msg_error_pwd = ref('');

const generate_password = () => {
    const newPassword = Math.random().toString(36).slice(2);
    newPwd.value = newPassword;
}

const valid_update_pwd = async () => {

    if (confirm("Etes-vous sûr de modifier ces informations ?")) {

        

        if (oldPwd.value == "" || newPwd.value == "" || newPwd2.value == "") {

            document.getElementById('oldUserPassword').classList.remove('is-invalid');
            document.getElementById('updateUserPassword').classList.remove('is-invalid');
            document.getElementById('updateUserPassword2').classList.remove('is-invalid');

            if (oldPwd.value == "") { document.getElementById('oldUserPassword').classList.add('is-invalid'); }
            if (newPwd.value == "") { document.getElementById('updateUserPassword').classList.add('is-invalid'); }
            if (newPwd2.value == "") { document.getElementById('updateUserPassword2').classList.add('is-invalid'); }

            msg_error_pwd.value = "Veuillez saisir les champs";

            
            return;
        }

        if (newPwd.value != newPwd2.value) {
            msg_error_pwd.value = "Les mots de passe ne sont pas identiques";

            
            return;
        }

        //verification de l'ancien mdp

        try {
            const response = await axios.post('http://localhost:3000/check-pwd-user', { id: myStore.getUser().id, pwd: oldPwd.value },
                {
                    headers: {
                        'Authorization': `Bearer ${myStore.getToken()}`
                    }
                }
            );
            
            
            if(response.data.message=="ok")
            {
                const response_upd=await axios.post('http://localhost:3000/update-user-pwd', { new_pwd: newPwd.value, id: myStore.getUser().id },
                    {
                        headers: {
                            'Authorization': `Bearer ${myStore.getToken()}`
                        }
                    }
                );
                
                msg_error_pwd.value = response_upd.data.message;
            }
            else
            {
                msg_error_pwd.value = response.data.message;
            }
           
        }
        catch (error) {
            msg_error_pwd.value = error.response.data.error;
            
        }

    }

}

const valid_update_user = async () => {

    if (confirm("Etes-vous sûr de modifier ces informations ?")) {
        try {
            const response = await axios.post('http://localhost:3000/update-user', { nom: newName.value, prenom: newPrenom.value, email: newEmail.value, droit: myStore.getUser().droit, id: myStore.getUser().id },
                {
                    headers: {
                        'Authorization': `Bearer ${myStore.getToken()}`
                    }
                }
            );
            myStore.setUser(response.data);

        }
        catch (error) {
            console.error(error);
        }
    }

}

onMounted(() => {

    if(myStore.getToken()=="")
    {
        router.push({ name: 'login' });
    }
});

</script>