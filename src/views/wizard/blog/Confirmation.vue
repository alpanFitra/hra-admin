<script setup lang="ts">
import axios from '@axios';
import { ref } from 'vue';
import type { BlogData } from './types';

interface Props {
  currentStep?: number
  blogData: BlogData
}
interface Emit {
  (e: 'update:currentStep', value: number): void
  (e: 'update:blog-data', value: BlogData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const blog = ref(props.blogData)

const submitBlog = async () => {
  const formData = new FormData()
  formData.append('status', '1')
  const response = await axios.patch('/blogs/blog/update/kenapa-transformasi-sdm-penting-bagi-kesuksesan-bisnis', formData)

  if (response) {
    window.location.href = '/'
  }
}
</script>

<template>
  <section class="text-base">
    <div class="text-center">
      <h5 class="text-h5 mb-3">
        Thank You! 😇
      </h5>
    </div>
    <div class="text-start">
      <pre>{{ blog }}</pre>
    </div>
    <div class="text-center">
      <VBtn @click="submitBlog">Simpan</VBtn>
    </div>
  </section>
</template>
