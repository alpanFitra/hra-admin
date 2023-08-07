import { defineStore } from 'pinia';

interface CategoryDetail {
  id: string;
  title: string;
}

export const useCategoryDetail = defineStore({
  id: 'detail-category',
  state: (): CategoryDetail => ({
    id: '',
    title: '',
  }),
  getters: {
    getDetailCategory(): CategoryDetail {
      return {
        id: this.id,
        title: this.title,
      };
    },
  },
  actions: {
    setDetailCategory(
      id: string,
      title: string,
    ): void {
      this.id = id;
      this.title = title;
    },
  },
});
