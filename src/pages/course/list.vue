<script setup lang="ts">
import axios from '@axios';
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const courses = ref([
  { no: 0, title: '', category: '', action: '' },
])

const getCourses = async () => {
  const res = await axios.get('/courses/course/all', {
    params: {
      page: 1,
      itemsPerPage: 5,
    }
  });

  // map res.data.courseData to courses.value with format like headers
  courses.value = res.data.courseData.map((course: any, index: number) => ({
    no: index + 1,
    title: course.title,
    category: course.category,
    action: course.slug,
  }));
}

getCourses();

const headers = [
  { title: 'NO', sortable: false, key: 'no' },
  { title: 'TITLE', key: 'title' },
  { title: 'CATEGORY', key: 'category' },
  { title: 'ACTION', key: 'action' },
]
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="py-4 d-flex justify-content-between">
        <div>Courses</div>
        <div>
          <VBtn :to="{ name: 'course-add' }" color="primary">ADD NEW</VBtn>
        </div>
      </VCardTitle>
      <VDataTable :headers="headers" :items="courses" :items-per-page="5" class="px-4 pb-3">
        <template #item.action="{ item }">
          <VBtn :to="{}" color="primary" class="me-2">EDIT</VBtn>
          <VBtn color="error">DELETE</VBtn>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<style lang="scss">
.justify-content-between {
  justify-content: space-between;
}
</style>
