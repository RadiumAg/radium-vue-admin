import Layout from '@pages/layout/layout.vue';
import { createRouter, createWebHistory   } from 'vue-router';

export  const router = createRouter({
    history:createWebHistory(),
     routes:[{
        path:'',
         component:Layout,
    }],
});
