<script setup>
import { RouterLink, RouterView } from 'vue-router';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <div class="app-container bg-light">
        <nav v-show="authStore.loginToken" class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <RouterLink to="/crud/" class="nav-item nav-link">Home</RouterLink>
                <RouterLink to="/crud/about" class="nav-item nav-link">About</RouterLink>
                <RouterLink to="/crud/logout" class="nav-item nav-link">Logout</RouterLink>
            </div>
        </nav>
        <nav v-show="!authStore.loginToken" class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <RouterLink to="/crud/" class="nav-item nav-link">Home</RouterLink>
                <RouterLink to="/crud/about" class="nav-item nav-link">About</RouterLink>
                <RouterLink to="/crud/login" class="nav-item nav-link">Login</RouterLink>
            </div>
        </nav>
        <div class="container pt-2 pb-4">
            <RouterView />
        </div>
    </div>
    <div class="container pt-4 pb-4">
        <!-- something you wouldn't USUALLY expose to users 
            (although they could find it with enough digging
            but handy for debugging or a demo app like this! -->
        <a v-bind:title="'loginName:'+authStore.loginName">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
        <a v-bind:title="'loginToken:'+authStore.loginToken">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
    </div>
</template>

<style>
@import '@/assets/base.css';
</style>