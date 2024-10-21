import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useStore = defineStore('myStore', () => {

    const user = ref({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        droit: '',
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
            id: '',
            nom: '',
            prenom: '',
            email: '',
            droit: '',
            token: ''
        }
        isLogin.value = false;
        router.push({ name: 'login' });
    }

    function login(userRecup) {

        user.value = {
            id: userRecup.id,
            nom: userRecup.nom,
            prenom: userRecup.prenom,
            email: userRecup.email,
            droit: userRecup.droit,
            token: userRecup.token
        }
        isLogin.value = true;
        router.push({ name: 'articles' });
    }

    function setUser(userRecup) {
        user.value = {
            id: getUser().id,
            nom: userRecup.nom,
            prenom: userRecup.prenom,
            email: userRecup.email,
            droit: getUser().droit,
            token: getUser().token
        }
    }

    function setToken(token) {
        user.value.token = token;
    }
    function getToken() {
        return user.value.token;
    }

    function getUser() {
        return user.value;
    }

    return { articlesearch, searchArticle, user, logout, login, setToken, isLogin, getToken, getUser, setUser }
})
