<script setup lang="ts">
import axios from '@axios';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { defineEmits, defineProps, ref, watch } from 'vue';
import type { CourseData } from './types';

interface Props {
  currentStep?: number
  courseData: CourseData
}
interface Emit {
  (e: 'update:currentStep', value: number): void
  (e: 'update:course-data', value: CourseData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const course = ref(<CourseData>{
  id: 0,
  title: '',
  subtitle: '',
  category: {
    text: 'Choose Category',
    value: 0,
  },
  competency_unit: '',
  price: 0,
  discount: 0,
  description: '',
  hero_img: null,
  thumbnail: null,
  learning_material: [{
    kkni: '',
    title: '',
    description: '',
  }],
  benefit: [{
    benefit: '',
  }],
  feature: [{
    feature: '',
  }],
  question: [{
    question: '',
  }],
});

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
const categories = [
  {
    text: 'Category 1',
    value: 1,
  },
]
const thumbnail = ref<File | null>(null)
const hero_img = ref<File | null>(null)

const updateDescription = (value: any) => {
  course.value.description = value.target.innerHTML
}

const handleThumbnailChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    thumbnail.value = files[0];
  }
}

const handleHeroImgChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    hero_img.value = files[0];
  }
}

// format to formData for upload file
const formatToFormData = (data: any) => {
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    // if key == category, then we need to get the value    
    if (key === 'category') {
      formData.append('categoryId', data[key].value)
    } else if (key === 'thumbnail' || key === 'hero_img') {
      // Handle file inputs separately
      if (data[key] instanceof File) {
        formData.append(key, data[key])
      }
    } else {
      formData.append(key, data[key])
    }
  })
  return formData
}

const submitForm = async () => {
  try {
    const formData = formatToFormData(course.value)
    if (thumbnail.value) {
      formData.append('thumbnail', thumbnail.value)
    }
    if (hero_img.value) {
      formData.append('hero_img', hero_img.value)
    }
    formData.append('status', '1')

    const response = await axios.post('/courses/course/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // set course data id
    course.value.id = response.data.courseId
  } catch (error) {
    console.error("Error uploading course:", error);
  }
}

const updateCourseData = () => {
  emit('update:course-data', course.value)
}

const nextStep = () => {
  submitForm()
  updateCourseData()
  emit('update:currentStep', 1)
}

watch(() => course.value, () => {
  updateCourseData()
})
</script>

<template>
  <VForm class="px-5 py-5">
    <VRow>
      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="course.title" label="Title"
          placeholder="Course Title" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="course.subtitle" label="Subtitle"
          placeholder="Course Subtitle" />
      </VCol>

      <VCol md="6" sm="12">
        <AppSelect v-model="course.category" :items="categories" item-title="text" item-value="value" label="Categories"
          persistent-hint return-object single-line />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-ankh" v-model="course.competency_unit" label="Competency Unit"
          placeholder="Competency Unit" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-brand-cashapp" v-model="course.price" label="Price"
          placeholder="Price" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField type="number" prepend-inner-icon="tabler-brand-cashapp" v-model="course.discount"
          label="Discount (%)" placeholder="100" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField type="file" prepend-inner-icon="tabler-camera-up" @change="handleThumbnailChange"
          label="Thumbnail Course" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField type="file" prepend-inner-icon="tabler-camera-up" @change="handleHeroImgChange"
          label="Thumbnail Video" />
      </VCol>

      <VCol cols="12">
        <label for="description">Description</label>
        <QuillEditor @input="updateDescription" :options="editorOptions" style="height: auto" />
      </VCol>

      <VCol cols="12 text-end">
        <VBtn type="button" @click="nextStep">Next</VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
