<script setup lang="ts">
import axios from '@axios';
import { ref } from 'vue';
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

const course = ref(props.courseData)

const submitCourse = async () => {
  const formData = new FormData()
  formData.append('status', '1')
  const response = await axios.patch('/courses/course/update/staf-hr', formData)

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
      <pre>{{ course }}</pre>
    </div>
    <div class="text-center">
      <VBtn @click="submitCourse">Gaskeun</VBtn>
    </div>
  </section>
</template>
