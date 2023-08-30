<script setup lang="ts">
import axios from '@axios';
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useCourseDetail } from '../../store/courseDetail';

const courses = ref([
  { no: 0, title: '', category: '', action: '' },
])

const isFormAddVisible = ref(false)
const formTitle = ref('Edit Course')
const courseName = ref('')
const courseCategory = ref('')
const courseSlug = ref('')
const isSubmit = ref(false)
const isUpdate = ref(false)

const getCourses = async () => {
  const res = await axios.get('/course', {
    params: {
      page: 1,
      itemsPerPage: 5,
    }
  });

  // map res.data.courseData to courses.value with format like headers
  courses.value = res.data.map((course: any, index: number) => ({
    no: index + 1,
    title: course.title,
    category: course.category,
    action: course.slug,
  }));
}

getCourses();

const updateForm: any = async () => {
  isFormAddVisible.value = false
  isSubmit.value = true

  const payload = {
    title: courseName.value
  }

  try {
    const response = await axios.patch(`/course/update/${courseSlug.value}`, payload)
    if (response) {
      window.location.href = '/course/list'
    }
    // console.log(response)
  } catch (error) {
    console.log(error)
  } finally {
    isSubmit.value = false
    isUpdate.value = false
  }
}

const deleteCol: any = async (param: any) => {
  try {
    const response = await axios.patch('/course/delete/' + param.columns.action)
    if(response){
      window.location.href = '/course/list'
    }
  } catch (error) {
    console.log(error);
  }
}

const showDetail = async (course: any) => {
  const store = useCourseDetail();
  await store.setDetailCourse(course.value, course.title, course.category);

  isFormAddVisible.value = true;

  // passing data to form
  courseName.value = course.title;
  courseCategory.value = course.category;

  
  isUpdate.value = true
  courseSlug.value = course.columns.action
};

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

          <VDialog v-model="isFormAddVisible" max-width="600">
            <!-- Dialog Activator -->
            <template #activator="{ props }">
              <VBtn :to="{ name: 'course-add' }" color="primary">ADD NEW</VBtn>
            </template>

            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isFormAddVisible = !isFormAddVisible" />

            <!-- Dialog Content -->
            <VCard :title="formTitle">
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <AppTextField v-model="courseName" label="Title" />
                    <AppTextField v-model="courseCategory" label="Category" />
                  </VCol>
                </VRow>
              </VCardText>

              <VCardText class="d-flex justify-end flex-wrap gap-3">
                <VBtn variant="tonal" color="secondary" @click="isFormAddVisible = false">
                  Close
                </VBtn>
                <VBtn @click="updateForm" v-show="isUpdate">
                  Save
                </VBtn>
              </VCardText>
            </VCard>
          </VDialog>

        </div>
      </VCardTitle>
      <VDataTable :headers="headers" :items="courses" :items-per-page="5" class="px-4 pb-3">
        <template #item.action="{ item }">
          <VBtn color="primary" class="me-2" @click="showDetail(item)">EDIT</VBtn>
          <VBtn color="error" @click="deleteCol(item)">DELETE</VBtn>
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
