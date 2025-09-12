import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home/HomeView.vue'),
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('../views/projects/ProjectsView.vue'),
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('../views/blog/BlogView.vue'),
        },
    ],
});

export default router;
