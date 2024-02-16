
<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore, useFunnySongsStore } from '@/stores';
import { router } from '@/helpers';

const authStore = useAuthStore();
const { loginToken: authToken, loginName: loginName } = storeToRefs(authStore);

const funnySongsStore = useFunnySongsStore();
const { theSongs } = storeToRefs(funnySongsStore);
funnySongsStore.getMany();

</script>

<template>
    <div>
        <h1><img src="/favicon.ico"> CRUD Demo</h1>
        <h3 style="font-variant: small-caps"><b>C</b>reate <b>R</b>ead <b>U</b>pdate <b>D</b>elete</h3>
        <div>(typically referred to as CRUD &#9786;)</div>
        <div class="uzer-blurb">
            User: [{{ loginName }}]
            <span @click="router.push('/crud/edit/0')" class="btn btn-primary btn-add">+</span>
        </div>

        <div v-if="theSongs">
            <div>
                A database of silly song names from a CRUD-capable API to demonstrate create, read, update and delete
                functionality.
            </div>
            <div style="padding-bottom:12px">
                [ {{ theSongs.length }}] records retrieved:
            </div>

            <div v-if="theSongs.length" style="border-top: 2px solid darkgray; padding-top:2px">
                <div v-for="thisSong in theSongs" :key="thisSong.id" class="song-blurb">
                    <RouterLink :to="'/crud/edit/' + thisSong.Id">View/Edit</RouterLink>
                    &nbsp;<b>{{ thisSong.Title }}</b>
                    &nbsp;<i><a v-bind:title="thisSong.ImportedOn">{{ thisSong.Composer }}</a></i>
                    <!-- <hr/> -->
                </div>
            </div>
            <div v-if="theSongs.loading" class="spinner-border spinner-border-sm"></div>
            <div v-if="theSongs.error" class="text-danger">Error loading data: {{ theSongs.error }}</div>
        </div>
        <div v-if="!theSongs">
            <!-- if the API it returning 401 appropriately - the fetch-wrapper will catch it and you'll never see this message -->
            Ooops! something failed. <br />
            <a href="/crud/logout">You should probably refresh your data.</a>
        </div>
        <div v-if="theSongs" style="padding-top:12px;">
            <span class="btn btn-primary btn-more"><a class="btn-more" href="/crud/">Another Five Random Titles</a></span>
        </div>        
    </div>
</template>
