import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { HomeView, LoginView, AboutView, LogoutView, EditView } from '@/views';

export const router = createRouter({
    history: createWebHistory(import.meta.env.THA_SUBFOLDER),
    linkActiveClass: 'active',
    routes: [
        { path: '/crud/', component: HomeView },
        { path: '/crud/login', component: LoginView },
        { path: '/crud/about', component: AboutView },
        { path: '/crud/logout', component: LogoutView },
        { path: '/crud/edit/:Id', component: EditView },
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/crud/login','/crud/about','/crud/logout'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.loginToken) {
        auth.returnUrl = to.fullPath;
        return '/crud/login';
    }
});
