import { defineStore } from 'pinia';

interface CourseDetail {
  id: string;
  title: string;
  category: string;
}

export const useCourseDetail = defineStore({
  id: 'detail-course',
  state: (): CourseDetail => ({
    id: '',
    title: '',
    category: '',
  }),
  getters: {
    getDetailCourse(): CourseDetail {
      return {
        id: this.id,
        title: this.title,
        category: this.category,
      };
    },
  },
  actions: {
    setDetailCourse(
      id: string,
      title: string,
      category: string,
      
    ): void {
      this.id = id;
      this.title = title;
      this.category = category;
    },
  },
});
