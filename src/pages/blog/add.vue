<script setup lang="ts">
import Main from '@/views/wizard/blog/Main.vue'
import type { BlogData } from '@/views/wizard/blog/types'

const checkoutSteps = [
  {
    title: 'General',
    icon: 'custom-address',
  },
]

const blogData = ref<BlogData>({
  title: '',
  description: '',
  category: {
    text: 'Choose Category',
    value: 0,
  },
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

        </VWindow>
      </VCardText>
    </VCard>
  </div>
</template>
