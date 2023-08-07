<script setup lang="ts">
import Benefit from '@/views/wizard/course/Benefit.vue'
import ConfirmationContent from '@/views/wizard/course/Confirmation.vue'
import Feature from '@/views/wizard/course/Feature.vue'
import Main from '@/views/wizard/course/Main.vue'
import Material from '@/views/wizard/course/Material.vue'
import Question from '@/views/wizard/course/Question.vue'
import type { CourseData } from '@/views/wizard/course/types'

const checkoutSteps = [
  {
    title: 'General',
    icon: 'custom-address',
  },
  {
    title: 'Material',
    icon: 'custom-address',
  },
  {
    title: 'Benefit',
    icon: 'custom-address',
  },
  {
    title: 'Feature',
    icon: 'custom-address',
  },
  {
    title: 'Question',
    icon: 'custom-address',
  },
  {
    title: 'Confirmation',
    icon: 'custom-trending',
  },
]

const courseData = ref<CourseData>({
  title: '',
  subtitle: '',
  category: {
    text: 'Choose Category',
    value: 0,
  },
  competency_unit: '',
  price: 0,
  discount: 0,
  description: '',
  hero_img: '',
  thumbnail: '',
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
            <Main v-model:current-step="currentStep" v-model:course-data="courseData" />
          </VWindowItem>

          <VWindowItem>
            <Material v-model:current-step="currentStep" v-model:course-data="courseData" />
          </VWindowItem>

          <VWindowItem>
            <Benefit v-model:current-step="currentStep" v-model:course-data="courseData" />
          </VWindowItem>

          <VWindowItem>
            <Feature v-model:current-step="currentStep" v-model:course-data="courseData" />
          </VWindowItem>

          <VWindowItem>
            <Question v-model:current-step="currentStep" v-model:course-data="courseData" />
          </VWindowItem>

          <VWindowItem>
            <ConfirmationContent v-model:course-data="courseData" />
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
  </div>
</template>
