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
  (e: 'update:blog-data', value: BlogData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const blog = ref(<BlogData>{
  title: '',
  description: '',
  category: {
    text: 'Choose Category',
    value: 0,
  },
});

const categories = [
  {
    text: 'Category 1',
    value: 1,
  },
]

const editorOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  },
  placeholder: 'Write your course description here...',
  theme: 'snow',
}

const updateDescription = (value: any) => {
  blog.value.description = value.target.innerHTML
}

const submitForm = async () => {
  try {
    // formData.append('status', 'published')

    const response = await axios.post('/blog/create', {
      title: blog.value.title,
      categoryId: 1,
      description: blog.value.description,
      status: 'published'
    })
    // set course data id
    blog.value.id = response.data.blogId
    if (response) {
      window.location.href = '/blog/list'
    }
  } catch (error) {
    console.error("Error uploading blog:", error);
  }
}

const updateBlogData = () => {
  emit('update:blog-data', blog.value)
}

const nextStep = () => {
  submitForm()
  updateBlogData()
  emit('update:currentStep', 1)
}

watch(() => blog.value, () => {
  updateBlogData()
})
</script>

<template>
  <VForm class="px-5 py-5">
    <VRow>
      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="blog.title" label="Title" placeholder="Name" />
      </VCol>

      <VCol md="6" sm="12">
        <AppSelect v-model="blog.category" :items="categories" item-title="text" item-value="value" label="Categories"
          persistent-hint return-object single-line />
      </VCol>

      <VCol cols="12">
        <label for="description">Description</label>
        <QuillEditor @input="updateDescription" :options="editorOptions" style="height: auto" />
      </VCol>

      <VCol cols="12 text-end">
        <VBtn type="button" @click="nextStep">simpan</VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
