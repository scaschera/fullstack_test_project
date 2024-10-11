<template>  
  <div class="container">
    <div class="row mt-5">
      <div class="col-lg-6 offset-lg-3 col-sm-12">
          <div class="card">
            <div class="card-header">
              Connexion
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label required">Adresse mail</label>
                <input type="email" class="form-control required" id="mail_input" v-model="mail" placeholder="">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label required">Mot de passe</label>
                <input type="password" class="form-control required" id="pwd_input" v-model="pass" placeholder="">
              </div>
              <span id="msg_error" class="text-danger">{{ msg_err }}</span>
            </div>
            <div class="card-footer text-center">
              <button class="btn btn-primary" @click="connect">Se connecter</button>
            </div>
          </div>
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

  import { onMounted, ref, watch } from 'vue';
  import axios from 'axios';
  import { useStore } from '../stores/store';
  import { useRouter } from 'vue-router'

  const mail=ref('');
  const pass=ref('');
  const msg_err=ref('');
  const myStore = useStore();
  const router = useRouter();

  const connect = async () => {
    
    if(mail.value.length>0 && pass.value.length>0)
    {
      try{
        const response = await axios.post('http://localhost:3000/login', {
          email: mail.value,
          password: pass.value  
        });
        msg_err.value = response.data.message;
        if(response.data.message=="Connexion réussie")
        {
          //window.location.href = "/";
          myStore.login(response.data.user);
          
        }
      }
      catch(err)
      {
        msg_err.value = err.response.data.message;
      }

    }
  }


  watch(mail, (newVal, oldVal) => {
    if(newVal.length==0){ 
      document.getElementById('mail_input').classList.add('is-invalid');
    }
    else
    {
      if(newVal.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null)
      {
        document.getElementById('mail_input').classList.add('is-invalid');
      }
      else
      {
        document.getElementById('mail_input').classList.remove('is-invalid');
      }
    }
  });

  watch(pass, (newVal, oldVal) => {
    if(newVal.length==0){ 
      document.getElementById('pwd_input').classList.add('is-invalid');
    }
    else
    {
      document.getElementById('pwd_input').classList.remove('is-invalid');
    }
  });

  onMounted(() => {
    if(myStore.getToken()!="")
    {
      router.push({ name: 'articles' });
    }
  });

</script>