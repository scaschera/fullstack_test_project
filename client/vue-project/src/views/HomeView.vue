<template>
    <div class="container">
        
        <div class="row">
            <div class="col-12 text-center mt-5 ">
                <h1>Bienvenue</h1>
            </div>
        </div>
        <div class="row">
            <template v-if="articles.length>0">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                    <div class="col-12" v-for="article in articles">
                        <div class="card shadow-sm h-100">
                            <div class="bd-placeholder-img card-img-top" width="100%" height="225"  role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                
                                <img :src="article.url_img" class="bd-placeholder-img card-img-top" style="height:225px" />
                            </div>
                        
                            <div class="card-body">
                                <h5 class="card-title">{{ article.title }}</h5>
                                <p class="card-text">{{ article.content }}</p>
                                
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between align-items-end">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-primary" @click="add_to_cart(article.id)"><i class="fa-solid fa-cart-shopping"></i>&nbsp;Ajouter au panier</button>
                                    </div>
                                    <span class="text-uppercase text-bold mb-1"><span class="badge text-bg-success">{{ article.price }}€</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="col-12 text-center mt-5" >
                    <h5>Articles non disponibles, revenez plus tard !!!</h5>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>

    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useStore } from '@/stores/store';

    const articles = ref([]);

    const add_to_cart = (id) => {
        let myArticle={
            id: id,
            qte: 1,
            title: '',
            price: 0,
            url_img: ''
        }
        myArticle.id = id;
        myArticle.qte = 1;
        myArticle.title = articles.value.find(article => article.id == id).title;
        myArticle.price = articles.value.find(article => article.id == id).price;
        myArticle.url_img = articles.value.find(article => article.id == id).url_img;

        useStore().addToCart(myArticle);
    };

    const getArticles = () => {
        axios.post('http://localhost:3000/get-rows', { q: '' })
            .then(response => {
                articles.value = response.data;
        })
    };

    onMounted(() => {
        getArticles();
    });

</script>