<script setup lang="ts">
import Main from '@/views/wizard/blog/Main.vue'
import type { BlogData } from '@/views/wizard/blog/types'

const checkoutSteps = [
  {
    title: 'General',
    icon: 'custom-address',
  },
  {
    title: 'Confirmation',
    icon: 'custom-trending',
  },
]

const blogData = ref<BlogData>({
  name: '',
  email: '',
  date: '',
  experience: '',
  age: '',
})

const currentStep = ref(0)
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <!-- 👉 Stepper -->
        <AppStepper v-model:current-step="currentStep" class="checkout-stepper" :items="checkoutSteps"
          :direction="$vuetify.display.smAndUp ? 'horizontal' : 'vertical'" />
      </VCardText>

      <VDivider />

      <VCardText>
        <!-- 👉 stepper content -->
        <VWindow v-model="currentStep" class="disable-tab-transition">
          <VWindowItem>
            <Main v-model:current-step="currentStep" v-model:course-data="blogData" />
          </VWindowItem>

          <VWindowItem>
            <ConfirmationContent v-model:course-data="blogData" />
          </VWindowItem>

        </VWindow>
      </VCardText>
    </VCard>
  </div>
</template>
