<template>
    <section class="h-100 h-custom" style="background-color: #eee;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
                <div class="card card-registration card-registration-2" style="border-radius: 15px;">
                <div class="card-body p-0">
                    <div class="row g-0">
                    <div class="col-lg-8">
                        <div class="p-5">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                            <h1 class="fw-bold mb-0">Panier</h1>
                            <h6 class="mb-0 text-muted">{{ useStore().getCartLength() }} article<template v-if="useStore().getCartLength()>1">s</template></h6>
                        </div>
                        <template v-for="row in useStore().getCart()"  :key="row.id" >
                            <hr class="my-4" >

                            <div class="row mb-4 d-flex justify-content-between align-items-center">
                                <div class="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                        :src="row.url_img"
                                        class="img-fluid rounded-3" :alt="row.title">
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                    <h6 class="mb-0">{{row.title}}</h6>
                                </div>
                                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">

                                    <input id="form1" min="0" name="quantity" v-model="row.qte" type="number"
                                        class="form-control form-control-sm" />
                                </div>
                                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 class="mb-0">{{ Math.round((row.price*row.qte) * 100) / 100}}€</h6>
                                </div>
                                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <a href="#!" @click="useStore().removeFromCart(row.id)" class="text-muted"><i class="fas fa-times"></i></a>
                                </div>
                            </div>
                        </template>
                        <h5 v-if="useStore().getCart().length==0" class="text-center">Panier vide</h5>
                        <hr class="my-4"  >

                        <div class="pt-5">
                            <h6 class="mb-0"><RouterLink to="/" class="text-body"><i
                                class="fas fa-long-arrow-alt-left me-2"></i>Retour à la boutique</RouterLink></h6>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-4 bg-body-tertiary">
                        <div class="p-5">
                        <h3 class="fw-bold mb-5 mt-2 pt-1">Resumé de la commande</h3>
                        <hr class="my-4">

                        <div class="d-flex justify-content-between mb-4">
                            <h5 class="text-uppercase">{{ useStore().getCartLength() }} article<template v-if="useStore().getCartLength()>1">s</template></h5>
                            <h5>{{ useStore().getTotalCart() }} €</h5>
                        </div>

                        <h5 class="text-uppercase mb-3">Livraison</h5>

                        <div class="mb-4 pb-2">
                            <select data-mdb-select-init v-model="useStore().cartDelivery">
                                <option value="5">Standard à domicile (5-7 jours) - 5€</option>
                                <option value="10">Prioritaire (24/48 heures) - 10€</option>
                                <option value="0">Point relais (5-7 jours) - Gratuit</option>
                            </select>
                        </div>

                        <h5 class="text-uppercase mb-3">Code de réduction</h5>

                        <div class="mb-5">
                            <div data-mdb-input-init class="form-outline">
                                <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                                <label class="form-label" for="form3Examplea2">Saisir le code</label>
                            </div>
                        </div>

                        <hr class="my-4">

                        <div class="d-flex justify-content-between mb-5">
                            <h5 class="text-uppercase">Total</h5>
                            <h5>{{ useStore().getTotalCartBeforeBuy() }} €</h5>
                        </div>

                        <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark">Register</button>

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
<style lang="css" scoped>
    @media (min-width: 1025px) {
        .h-custom {
            height: 100vh !important;
        }
    }

    .card-registration .select-input.form-control[readonly]:not([disabled]) {
        font-size: 1rem;
        line-height: 2.15;
        padding-left: .75em;
        padding-right: .75em;
    }

    .card-registration .select-arrow {
        top: 13px;
    }
</style>
<script setup>

    import { useStore } from '@/stores/store';

</script>