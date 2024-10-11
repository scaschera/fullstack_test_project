import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useStore = defineStore('myStore', () => {

    const user = ref({
        nom: '',
        prenom: '',
        email: '',
        token: ''
    })

    const router = useRouter();
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

    function login(userRecup) {

        user.value = {
            nom: userRecup.nom,
            prenom: userRecup.prenom,
            email: userRecup.email,
            token: userRecup.token
        }
        isLogin.value = true;
        router.push({ name: 'articles' });
    }

    function setToken(token) {
        user.value.token = token;
    }
    function getToken() {
        return user.value.token;
    }

    return { articlesearch, searchArticle, user, logout, login, setToken, isLogin, getToken }
})
