//import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from "uuid";
import { defineStore } from 'pinia';

import { fetchWrapper, router } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`; ///JSON/API`;
const AppKEY =  `${import.meta.env.VITE_APPKey}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        loginToken: localStorage.getItem('loginTok'),    // learning note: JS wants to JSONize things - so the original example was {"data": "encoded token... and I had to find a way to make it just the encoded token - so later we could present that to the server (in the header) for validation
        loginName: localStorage.getItem('loginTokName'), // added this just to avoid parsing the token - for a serious app - there'd be more back and forth with an API about profile etc...
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            // I chose get for simplicity - post required a class etc..
            username = username.toLowerCase();
            const lToken = await fetchWrapper.get(`${baseUrl}/authenikait/?username=${username}&password=${password}`);

            // sanity check - if it failed in an odd way - we set variables appropriately, remove it from localstorage and push the user to a login
            if (!lToken) {
                this.loginToken = null;
                this.loginName = null;
                localStorage.removeItem('loginTok');
                router.push('/crud/login');
                 return null; 
                }
                else {
                    // success!
                    this.loginName = username;
                }
            
            //update pinia state
            this.loginToken = lToken.data;
            this.loginName = username;
            localStorage.setItem('loginTok', lToken.data);
            localStorage.setItem('loginTokName', this.loginName);
            //router.push('/');

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/crud/');
            //router.go(1);
        },
        logout() {
            // cleaning up our variables
            this.loginToken = null;
            this.loginName = null;
            localStorage.removeItem('loginTok');
            localStorage.removeItem('loginTokName');
            router.push('/crud/');
            // Note : when it logged out - the code has the router (typically) automatically route the user to login...
        }
    }
});
