import { defineStore } from 'pinia';

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    token: '',
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    setToken(token: string): void {
      this.token = token;
    },
  },
});
