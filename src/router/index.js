import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import('../views/home.vue')
const Preview = () => import('../views/preview.vue')

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/preview',
        name: 'preview',
        component: Preview,
    },
    {
        path: '*',
        redirect: '/home'
    }];

const router = new VueRouter({
    routes,
});
export default router;
