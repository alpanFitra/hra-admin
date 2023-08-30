import { defineStore } from 'pinia';

interface BlogDetail {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const useBlogDetail = defineStore({
  id: 'detail-blog',
  state: (): BlogDetail => ({
    id: '',
    title: '',
    category: '',
    description: '',
  }),
  getters: {
    getDetailBlog(): BlogDetail {
      return {
        id: this.id,
        title: this.title,
        category: this.category,
        description: this.description,
      };
    },
  },
  actions: {
    setDetailBlog(
      id: string,
      title: string,
      category: string,
      description: string,

    ): void {
      this.id = id;
      this.title = title;
      this.category = category;
      this.description = description;
    },
  },
});
