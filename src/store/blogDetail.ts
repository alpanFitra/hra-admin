import { defineStore } from 'pinia';

interface BlogDetail {
  id: string;
  title: string;
  category: string;
}

export const useBlogDetail = defineStore({
  id: 'detail-blog',
  state: (): BlogDetail => ({
    id: '',
    title: '',
    category: '',
  }),
  getters: {
    getDetailBlog(): BlogDetail {
      return {
        id: this.id,
        title: this.title,
        category: this.category,
      };
    },
  },
  actions: {
    setDetailBlog(
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
