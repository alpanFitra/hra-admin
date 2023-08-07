<script setup lang="ts">
import data from '@/views/demos/forms/tables/data-table/datatable';
import { VDataTable } from 'vuetify/labs/VDataTable';

const headers = [
  { title: 'ID', sortable: false, key: 'id' },
  { title: 'NAME', key: 'full_name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'start_date' },
  { title: 'EXPERIENCE', key: 'experience' },
  { title: 'AGE', key: 'age' },
]
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="py-5 d-flex justify-content-between w-100">
        <div>Blogs</div>
        <div>
          <VBtn :to="{ name: 'blog-add' }" color="primary">ADD NEW</VBtn>
        </div>
      </VCardTitle>
      <VDataTable :headers="headers" :items="data" :items-per-page="5" class="px-4 pb-3" />
    </VCard>
  </div>
</template>

<style lang="scss">
.justify-content-between {
  justify-content: space-between;
}
</style>
