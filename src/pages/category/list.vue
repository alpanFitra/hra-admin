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
const isSubmit = ref(false)

const getCategories = async () => {
  try {
    const response = await axios.get('/category/all', {
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
    name: categoryName.value
  }

  try {
    const response = await axios.post('/category/create', payload)
    // console.log(response)
  } catch (error) {
    console.log(error)
  } finally {
    isSubmit.value = false
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
                <VBtn @click="submitForm">
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
          <VBtn color="primary" @click="showDetail(item)">
            Edit
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
