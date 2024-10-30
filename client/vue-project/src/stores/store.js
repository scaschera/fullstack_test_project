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

    const cart = ref([]);

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

    function getTotalCart() {
        let total = 0;

        cart.value.forEach(element => {
            total += element.price * element.qte;
        });

        return total;
    }

    function addToCart(article) {
        let articleInCart = false;
        cart.value.forEach(element => {
            if (element.id == article.id) {
                element.qte++;
                articleInCart = true;
            }
        });
        if (!articleInCart) {
            article.qte = 1;
            cart.value.push(article);
        }
    }

    function removeFromCart(id) {
        let articleInCart = false;
        cart.value.forEach(element => {
            if (element.id == id) {
                if (element.qte > 1) {
                    element.qte--;
                } else {
                    articleInCart = true;
                }
            }
        });
        if (articleInCart) {
            cart.value = cart.value.filter(element => element.id != id);
        }
        console.log(cart.value);
    }

    function getCart() {
        return cart.value;
    }

    function getCartLength() {

        let qte = 0;

        cart.value.forEach(element => {
            qte += element.qte
        })
        return qte;
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

    return {
        articlesearch,
        searchArticle,
        user,
        logout,
        login,
        setToken,
        isLogin,
        getToken,
        getUser,
        setUser,
        cart,
        getTotalCart,
        getCart,
        addToCart,
        removeFromCart,
        getCartLength
    }
})
