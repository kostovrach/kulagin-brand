import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/home/HomeView.vue'),
        },
        {
            path: '/services',
            name: 'services',
            component: () => import('@/views/services/ServicesView.vue'),
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('@/views/projects/ProjectsView.vue'),
        },
        {
            path: '/hobby',
            name: 'hobby',
            component: () => import('@/views/hobby/HobbyView.vue'),
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('@/views/blog/BlogView.vue'),
        },
        {
            path: '/article/:slug',
            name: 'article',
            component: () => import('@/views/article/ArticleView.vue'),
            props: true,
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('@/views/contact/ContactView.vue'),
        },
        {
            path: '/marketers',
            name: 'marketers',
            component: () => import('@/views/marketers/MarketersView.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0, behavior: 'instant' };
    },
});

export default router;
