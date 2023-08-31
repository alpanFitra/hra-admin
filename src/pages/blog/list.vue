<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import axios from '../../plugins/axios';
import { useBlogDetail } from '../../store/blogDetail';

const headers = [
  { title: 'NO', sortable: false, key: 'no' },
  { title: 'TITLE', key: 'title' },
  { title: 'CATEGORY', key: 'category' },
  { title: 'DESCRIPTION', key: 'description' },
  { title: 'ACTION', key: 'action' },
]

interface BlogData {
  no: number;
  id: number;
  title: string;
  category: string;
  description: string;
  action: string;
}

const blog = ref([
  { no: 0, title: '', category: '', action: '' },
])

const data = ref<BlogData[]>([])

const isFormAddVisible = ref(false)
const formTitle = ref('Add Blog')
const blogName = ref('')
const blogCategory = ref('')
const blogSlug = ref('')
const blogDescription = ref('')
const isSubmit = ref(false)
const isUpdate = ref(false)

const categories = [
  {
    text: 'Category 1',
    value: 1,
  },
]

const getBlog = async () => {
  try {
    const response = await axios.get('/blog', {
      params: {
        page: 1,
        itemsPerPage: 5
      }
    })
    response.data.forEach((item: any, index: number) => {
      data.value.push({
        no: index + 1,
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        action: item.slug
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const updateForm: any = async () => {
  isFormAddVisible.value = false
  isSubmit.value = true

  const payload = {
    title: blogName.value,
    category: blogCategory.value,
    description: blogDescription.value
  }

  try {
    const response = await axios.patch(`/blog/update/${blogSlug.value}`, payload)
    if (response) {
      window.location.href = '/blog/list'
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
    // console.log(param.columns.action)
    const response = await axios.patch('/blog/delete/' + param.columns.action)
    if(response){
      window.location.href = '/blog/list'
    }
  } catch (error) {
    console.log(error);
  }

}

const showDetail = async (item: any) => {
  const store = useBlogDetail();
  await store.setDetailBlog(item.value, item.title, item.category, item.description);

  isFormAddVisible.value = true;

  // change form title
  formTitle.value = 'Edit Blog';

  // passing data to form
  blogName.value = item.title;
  blogCategory.value = item.category;
  blogDescription.value = item.description;

  isUpdate.value = true
  blogSlug.value = item.columns.action
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
                    <AppSelect v-model="blogCategory" :items="categories" item-title="text" item-value="value" label="Categories"
          persistent-hint return-object single-line />
                    <AppTextarea v-model="blogDescription" label="Description" />
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
      <VDataTable :headers="headers" :items="data" :items-per-page="5" class="px-4 pb-3">
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
