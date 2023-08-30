<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import axios from '../../plugins/axios';
import { useCategoryDetail } from '../../store/categoryDetail';

const headers = [
  { title: 'NO', sortable: false, key: 'no' },
  { title: 'NAME', key: 'title' },
  { title: 'ACTION', key: 'action' },
]

interface CategoryData {
  no: number;
  id: number;
  title: string;
  action: string;
}
const data = ref<CategoryData[]>([])

const isFormAddVisible = ref(false)
const formTitle = ref('Add Category')
const categoryName = ref('')
const categorySlug = ref('')
const isSubmit = ref(false)
const isUpdate = ref(false)

const getCategories = async () => {
  try {
    const response = await axios.get('/categories', {
      params: {
        page: 1,
        itemsPerPage: 5
      }
    })
    response.data.forEach((item: any, index: number) => {
      data.value.push({
        no: index + 1,
        id: item.id,
        title: item.name,
        action: item.slug
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
    name: categoryName.value
  }

  try {
    const response = await axios.post('/categories/create', payload)
    if (response) {
      window.location.href = '/category/list'
    }
    // console.log(response)
  } catch (error) {
    console.log(error)
  } finally {
    isSubmit.value = false
  }
}

const updateForm: any = async () => {
  isFormAddVisible.value = false
  isSubmit.value = true

  const payload = {
    name: categoryName.value
  }

  try {
    const response = await axios.patch(`/categories/update/${categorySlug.value}`, payload)
    if (response) {
      window.location.href = '/category/list'
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
    const response = await axios.patch('/categories/delete/' + param.columns.action)
    if (response) {
      window.location.href = '/category/list'
    }
  } catch (error) {
    console.log(error);
  }
}

const showDetail = async (item: any) => {
  const store = useCategoryDetail();
  await store.setDetailCategory(item.value, item.title);

  isFormAddVisible.value = true;

  // change form title
  formTitle.value = 'Edit Category';

  // passing data to form
  categoryName.value = item.title;

  isUpdate.value = true
  categorySlug.value = item.columns.action
};

onMounted(() => {
  getCategories()
})
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="py-5 d-flex justify-content-between w-100">
        <div>Categories</div>
        <div>
          <VDialog v-model="isFormAddVisible" max-width="600">
            <!-- Dialog Activator -->
            <template #activator="{ props }">
              <VBtn v-bind="props">
                ADD CATEGORY
              </VBtn>
            </template>

            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isFormAddVisible = !isFormAddVisible" />

            <!-- Dialog Content -->
            <VCard :title="formTitle">
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <AppTextField v-model="categoryName" label="Title" />
                  </VCol>
                </VRow>
              </VCardText>

              <VCardText class="d-flex justify-end flex-wrap gap-3">
                <VBtn variant="tonal" color="secondary" @click="isFormAddVisible = false">
                  Close
                </VBtn>
                <VBtn @click="submitForm" v-show="!isUpdate">
                  Save
                </VBtn>
                <VBtn @click="updateForm" v-show="isUpdate">
                  Save
                </VBtn>
              </VCardText>
            </VCard>
          </VDialog>
          <VDialog v-model="isSubmit" width="300" persistent>
            <VCard color="primary" width="300">
              <VCardText class="pt-3">
                Submitting..
                <VProgressLinear indeterminate class="mb-0" />
              </VCardText>
            </VCard>
          </VDialog>
        </div>
      </VCardTitle>
      <VDataTable :headers="headers" :items="data" :items-per-page="5" class="px-4 pb-3">
        <template #item.action="{ item }">
          <VBtn color="primary" class="m-2 mr-2" @click="showDetail(item)">
            EDIT
          </VBtn>
          <VBtn color="error" @click="deleteCol(item)">
            DELETE
          </VBtn>
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
