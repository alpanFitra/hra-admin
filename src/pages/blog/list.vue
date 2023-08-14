<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from '../../plugins/axios';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useBlogDetail } from '../../store/blogDetail';

const headers = [
  { title: 'NO', sortable: false, key: 'no' },
  { title: 'TITLE', key: 'title' },
  { title: 'CATEGORY', key: 'category' },
  { title: 'ACTION', key: 'action' },
]

interface BlogData {
  no: number;
  id: number;
  title: string;
  action: string;
}
const data = ref<BlogData[]>([])

const isFormAddVisible = ref(false)
const formTitle = ref('Add Blog')
const blogCategory = ref('')
const blogName = ref('')
const isSubmit = ref(false)

const getBlog = async () => {
  try {
    const response = await axios.get('blogs/blog/all/', {
      params: {
        page: 1,
        itemsPerPage: 5
      }
    })
    response.data.categories.forEach((item: any, index: number) => {
      data.value.push({
        no: index + 1,
        id: item.id,
        title: item.name,
        action: item
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const submitForm: any = async () => {
  isFormAddVisible.value = false
  isSubmit.value = true

  const payload = {
    name: blogName.value
  }

  try {
    const response = await axios.post('/blogs/blog/create', payload)
    // console.log(response)
  } catch (error) {
    console.log(error)
  } finally {
    isSubmit.value = false
  }
}

const showDetail = async (item: any) => {
  const store = useBlogDetail();
  await store.setDetailBlog(item.value, item.title,item.category);

  isFormAddVisible.value = true;

  // change form title
  formTitle.value = 'Edit Blog';

  // passing data to form
  blogName.value = item.title;
  blogCategory.value = item.category;
};

onMounted(() => {
  getBlog()
})
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="py-4 d-flex justify-content-between">
        <div>Blog</div>
        <div>

          <VDialog v-model="isFormAddVisible" max-width="600">
            <!-- Dialog Activator -->
            <template #activator="{ props }">
              <VBtn :to="{ name: 'blog-add' }" color="primary">ADD NEW</VBtn>
            </template>

            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isFormAddVisible = !isFormAddVisible" />

            <!-- Dialog Content -->
            <VCard :title="formTitle">
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <AppTextField v-model="blogName" label="Title" />
                    <AppTextField v-model="blogCategory" label="Category" />
                  </VCol>
                </VRow>
              </VCardText>

              <VCardText class="d-flex justify-end flex-wrap gap-3">
                <VBtn variant="tonal" color="secondary" @click="isFormAddVisible = false">
                  Close
                </VBtn>
                <VBtn @click="submitForm">
                  Save
                </VBtn>
              </VCardText>
            </VCard>
          </VDialog>

        </div>
      </VCardTitle>
      <VDataTable :headers="headers" :items="data" :items-per-page="5" class="px-4 pb-3">
        <template #item.action="{ item }">
          <VBtn color="primary" class="me-2" @click="showDetail(item)">EDIT</VBtn>
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
