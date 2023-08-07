<script setup lang="ts">
import axios from '@axios';
import { defineEmits, defineProps, ref, watch } from 'vue';
import type { CourseData } from './types';

interface Props {
  currentStep?: number
  courseData: CourseData
}

interface Emit {
  (e: 'update:currentStep', value: number): void
  (e: 'update:course-data', value: CourseData): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const learning_material = ref([{
  kkni: '',
  title: '',
  description: '',
}]);
const totalForm = ref(0);

const addForm = () => {
  totalForm.value += 1;
  learning_material.value.push({
    kkni: '',
    title: '',
    description: '',
  });
};

const removeForm = (index: number) => {
  totalForm.value -= 1;
  learning_material.value.splice(index, 1);
};

const updateLearningMaterial = () => {
  emit('update:course-data', {
    ...props.courseData,
    learning_material: learning_material.value,
  });
};

const submitForm = async () => {
  // create const datas type array to store data from learning_material
  const datas = [] as any;

  // loop learning_material.value
  learning_material.value.map((item) => {
    // push data to datas
    datas.push({
      courseId: props.courseData.id,
      kkni: item.kkni,
      kkni_title: item.title,
      description: item.description,
    });
  });

  const response = await axios.post('/courses/learning-material/create', datas);
};

const nextStep = () => {
  updateLearningMaterial();
  submitForm();
  emit('update:currentStep', props.currentStep! + 1);
};

const prevStep = () => {
  updateLearningMaterial();
  emit('update:currentStep', props.currentStep! - 1);
};

watch(() => props.currentStep, updateLearningMaterial);
</script>

<template>
  <VForm @submit.prevent="submitForm" class="px-5 pt-5">
    <VRow v-for="item, index in learning_material" :key="index">
      <VCol cols="12">
        <VBtn variant="tonal" disabled>
          Form Number {{ index + 1 }}
        </VBtn>
      </VCol>
      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="item.kkni" label="KKNI" placeholder="KKNI" />
      </VCol>

      <VCol md="6" sm="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="item.title" label="KKNI Title"
          placeholder="KKNI Title" />
      </VCol>

      <VCol cols="12">
        <AppTextarea label="Description" v-model="item.description" placeholder="Description">
        </AppTextarea>
      </VCol>

      <VCol cols="12">
        <div v-if="index <= 0">
          <button type="button" class="add-button mb-3" @click="addForm">
            Add Form
          </button>
          <span class="px-4">|</span>
          <button type="button" class="add-button mb-3" disabled @click="removeForm(index)">
            Delete Form
          </button>
          <hr>
        </div>
        <div v-else>
          <button type="button" class="add-button mb-3" @click="addForm">
            Add Form
          </button>
          <span class="px-4">|</span>
          <button type="button" class="add-button mb-3" @click="removeForm(index)">
            Delete Form
          </button>
          <hr>
        </div>
      </VCol>
    </VRow>
    <div class="mt-5 text-end">
      <VBtn type="button" @click="prevStep" class="me-2">Back</VBtn>
      <VBtn type="button" @click="nextStep">Next</VBtn>
    </div>
  </VForm>
</template>
