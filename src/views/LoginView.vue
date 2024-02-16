<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
        .catch(error => setErrors({ apiError: error }));
}
const prepopulateUser = "zaphod";
const prepopulatePassword = "test";
</script>

<template>
    <div>
        <h1><img src="/favicon.ico"> CRUD Demo</h1>
        <p style="font-variant: small-caps;">Welcome to the <b>C</b>reate <b>R</b>ead <b>U</b>pdate <b>D</b>elete demonstration!</p>
        <p>For testing - users are: <b>happy, <span style="color:brown ">sad</span>, arthurdent, zaphod</b> - with a password of '<b>test</b>'.  
            All users can view and all (except <b><span style="color:brown">sad</span></b>) can update/delete entries in the silly song titles
            that were used for the demo. (Data reset daily.) </p>
        <p>Prepopulated with zaphod/test to make it a one-click logon.  When editing an item look at the info section 
            below the Update button to see whe and who modified that entry.</p>                  
        <h2>Login</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
                <label>Username</label>
                <Field name="username" :model-value="prepopulateUser" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />                
            </div>            
            <div class="form-group">
                <label>Password</label>
                <Field name="password" :model-value="prepopulatePassword" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>            
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Login
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
            <div v-if="errors.apiError=='417 - Expectation Failed'" class="alert alert-danger mt-3 mb-0">Are you trying to log in WHILE YOU'RE LOGGED IN????!!!</div>
            <!-- this is an edge case - and it persists the error values for some reason -->
        </Form>
        <div>
            <a href="/crud/about" class="nav-item nav-link">Info</a>                
        </div>
    </div>
</template>
