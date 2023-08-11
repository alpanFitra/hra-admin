<script setup lang="ts">
import axios from '@axios';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { defineEmits, defineProps, ref, watch } from 'vue';
import type { BlogData } from './types';

interface Props {
  currentStep?: number
  blogData: BlogData
}
interface Emit {
  (e: 'update:currentStep', value: number): void
  (e: 'update:blog-data', value: blogData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const blog = ref(<BlogData>{
  id: 0,
  name: '',
  email: '',
  date: '',
  experience: '',
  age: '',
});
</script>

<template>
  <VForm class="px-5 py-5">
    <VRow>
      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="blog.name" label="Name"
          placeholder="Name" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="blog.email" label="Email"
          placeholder="Email" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-ankh" v-model="blog.date" label="Date"
          placeholder="Date" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-brand-cashapp" v-model="blog.experience" label="Experience"
          placeholder="Experience" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-brand-cashapp" v-model="blog.age" label="Age"
          placeholder="Age" />
      </VCol>

      <VCol cols="12 text-end">
        <VBtn type="button" @click="nextStep">Next</VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
