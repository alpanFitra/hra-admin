<script setup lang="ts">
import axios from '@axios';
import { defineEmits, defineProps, ref, watch } from 'vue';
import { CourseData } from './types';

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

const questions = ref([{
  question: '',
}]);
const totalForm = ref(0);

const addForm = () => {
  totalForm.value++;
  questions.value.push({
    question: '',
  });
};

const removeForm = (index: number) => {
  totalForm.value--;
  questions.value.splice(index, 1);
};

const updateQuestion = () => {
  emit('update:course-data', {
    ...props.courseData,
    question: questions.value,
  });
};

const submitForm = async () => {
  // create const datas type array to store data from learning_material
  const datas = [] as any;

  // loop learning_material.value
  questions.value.map((item) => {
    // push data to datas
    datas.push({
      courseId: props.courseData.id,
      question: item.question,
    });
  });

  const response = await axios.post('/courses/question/create', datas);
};

const nextStep = () => {
  updateQuestion();
  submitForm();
  emit('update:currentStep', props.currentStep! + 1);
};

const prevStep = () => {
  updateQuestion();
  emit('update:currentStep', props.currentStep! - 1);
};

watch(() => props.currentStep, updateQuestion);
</script>

<template>
  <VForm @submit.prevent="submitForm" class="px-5 pt-5">
    <VRow v-for="item, index in questions" :key="index">
      <VCol cols="12">
        <VBtn variant="tonal" disabled>
          Form Number {{ index + 1 }}
        </VBtn>
      </VCol>
      <VCol cols="12">
        <AppTextField prepend-inner-icon="tabler-certificate" v-model="item.question" label="Question"
          placeholder="Type question here.." />
      </VCol>

      <VCol cols="12">
        <div v-if="index <= 0">
          <button type="button" class="add-button mb-3" @click="addForm">
            Add Form
          </button> |
          <button type="button" class="add-button mb-3" disabled @click="removeForm(index)">
            Delete Form
          </button>
          <hr>
        </div>
        <div v-else>
          <button type="button" class="add-button mb-3" @click="addForm">
            Add Form
          </button> |
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
