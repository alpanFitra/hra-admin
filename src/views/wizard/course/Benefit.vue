<template>
  <v-form @submit.prevent="submitForm" class="px-5 pt-5">
    <v-row v-for="(item, index) in benefits" :key="index">
      <v-col cols="12">
        <v-btn variant="tonal" disabled>Form Number {{ index + 1 }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        <app-text-field prepend-inner-icon="tabler-certificate" v-model="item.benefit" label="Benefit"
          placeholder="Type benefit here.." />
      </v-col>
      <v-col cols="12">
        <div v-if="index <= 0">
          <button type="button" class="add-button mb-3" @click="addForm">
            Add Form
          </button>
          <span class="px-4">|</span>
          <button type="button" class="add-button mb-3" disabled @click="removeForm(index)">
            Delete Form
          </button>
          <hr />
        </div>
        <div v-else>
          <button type="button" class="add-button mb-3" @click="addForm">
            Add Form
          </button>
          <span class="px-4">|</span>
          <button type="button" class="add-button mb-3" @click="removeForm(index)">
            Delete Form
          </button>
          <hr />
        </div>
      </v-col>
    </v-row>
    <div class="mt-5 text-end">
      <v-btn type="button" @click="prevStep" class="me-2">Back</v-btn>
      <v-btn type="button" @click="nextStep">Next</v-btn>
    </div>
  </v-form>
</template>

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

const benefits = ref([{
  benefit: '',
}]);
const totalForm = ref(0);

const addForm = () => {
  totalForm.value += 1;
  benefits.value.push({
    benefit: '',
  });
};

const removeForm = (index: number) => {
  totalForm.value -= 1;
  benefits.value.splice(index, 1);
};

const updateBenefit = () => {
  emit('update:course-data', {
    ...props.courseData,
    benefit: benefits.value,
  });
};

const submitForm = async () => {
  // create const datas type array to store data from learning_material
  const datas = [] as any;

  // loop learning_material.value
  benefits.value.map((item) => {
    // push data to datas
    datas.push({
      courseId: props.courseData.id,
      benefit: item.benefit,
    });
  });

  const response = await axios.post('/courses/benefit/create', datas);
};

const nextStep = () => {
  updateBenefit();
  submitForm();
  emit('update:currentStep', props.currentStep ? props.currentStep + 1 : 1);
};

const prevStep = () => {
  emit('update:currentStep', props.currentStep ? props.currentStep - 1 : 0);
};

watch(() => props.currentStep, updateBenefit);
</script>
