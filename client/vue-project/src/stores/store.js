import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('myStore', () => {

    const articlesearch = ref('')
    function searchArticle(q) {
        articlesearch.value = q;
    }

    return { articlesearch, searchArticle }
})
