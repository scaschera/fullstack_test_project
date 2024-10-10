import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('myStore', () => {

    const user = ref({
        nom: '',
        prenom: '',
        email: '',
        token: ''
    })

    const isLogin = ref(false);
    const articlesearch = ref('')

    function searchArticle(q) {
        articlesearch.value = q;
    }

    function logout() {
        user.value = {
            nom: '',
            prenom: '',
            email: '',
            token: ''
        }
        isLogin.value = false;
    }

    function login(user) {
        user.value = user;
        isLogin.value = true;
    }

    function setToken(token) {
        user.value.token = token;
    }

    return { articlesearch, searchArticle, user, logout, login, setToken, isLogin }
})
