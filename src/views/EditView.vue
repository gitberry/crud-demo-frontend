<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore, useFunnySongsStore } from '@/stores';
import { router } from '@/helpers';

const authStore = useAuthStore();
const { loginToken: authToken, loginName: loginName } = storeToRefs(authStore);

const funnySongsStore = useFunnySongsStore();
const { oneSongg } = storeToRefs(funnySongsStore);
const route = useRoute()
const id = route.params.Id;
console.log("the ID:", id);
funnySongsStore.getOne(id, "");

function onSubmity(values, { setErrors }) {
    funnySongsStore.update(oneSongg)
        .catch(error => setErrors({ apiError: error }));
    router.push('/crud/');
}

function act(givenAction) {
    funnySongsStore.actOn(id, givenAction)
        .catch(something => {
            console.log("act CATCH", id, givenAction, something);
            error => setErrors({ apiError: something });
        });
}
</script>

<template>
    <div>
        <h2>
            <span class="form-group">
                <RouterLink to="/crud/" class="btn btn-primary btn-edit-back">&#11164; Back&nbsp;</RouterLink>
            </span>
            <span class="edit-title">EDIT</span>
        </h2>
        <div class="edit-title-header">
            {{ oneSongg.Title }}
        </div>
        <Form @submit="onSubmity" :validation-schema="vschema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
                <label>Title</label>
                <Field :disabled="!oneSongg.IsActive" name="Title" v-model=oneSongg.Title type="text" class="form-control"
                    :class="{ 'is-invalid': errors.Title }" />
            </div>
            <div class="form-group">
                <label>Composer</label>
                <Field :disabled="!oneSongg.IsActive" name="Composer" v-model=oneSongg.Composer type="text"
                    class="form-control" :class="{ 'is-invalid': errors.Composer }" />
            </div>
            <div class="form-group">
                <label>Publisher</label>
                <Field :disabled="!oneSongg.IsActive" name="Publisher" v-model=oneSongg.Publisher type="text"
                    class="form-control" :class="{ 'is-invalid': errors.Publisher }" />
            </div>
            <!-- careful logic to display update/create and Delete/Un-Delete buttons at appropriate times -->
            <div style="display: flex; justify-content: space-between;">
                <button v-if="!oneSongg.Id == 0 && oneSongg.IsActive" class="btn btn-primary" :disabled="isSubmitting"
                    style="width:35%">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Update
                </button>
                <button v-if="oneSongg.Id == 0" class="btn btn-primary" :disabled="isSubmitting" style="width:35%">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Create New
                </button>
                &nbsp;
                <span v-if="oneSongg.IsActive && oneSongg.Id > 0" @click="act('delete')"
                    class="btn btn-primary btn-item-delete">Delete</span>
                <span v-if="!oneSongg.IsActive && oneSongg.Id > 0" @click="act('undelete')"
                    class="btn btn-primary btn-item-undelete">Re-Activate</span>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
        </Form>
        <div v-if="oneSongg.loading" class="spinner-border spinner-border-sm"></div>
        <div v-if="oneSongg.error" class="text-danger">Error retrieving data for {{ id }}</div>

        <div v-if="oneSongg.Id" class="meta-footer">
            <big><big>&#9432;</big></big> Created {{ oneSongg.CreatedOn }} UTC by {{ oneSongg.CreatedBy }} <br />
            Modified {{ oneSongg.ModifiedOn }} UTC by {{ oneSongg.ModifiedBy }} <br />
            Data retrieved: {{ oneSongg.APIProvided }} UTC <br />
            <span v-if="oneSongg.IsActive" class="footer-record-active">Record #: {{ oneSongg.Id }} (active)</span>
            <span v-if="!oneSongg.IsActive" class="footer-record-inactive">Record #: {{ oneSongg.Id }} (inactive)
            </span>
        </div>

    </div>
</template>
