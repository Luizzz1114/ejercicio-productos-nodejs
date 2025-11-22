import { defineStore } from 'pinia';

export const useBreadCrumbsStore = defineStore('breadCrumbs', {
  state: () => ({
    breadCrumbs: [],
  }),
  actions: {
    setBreadCrumbs(newBreadCrumbs) {
      this.breadCrumbs = newBreadCrumbs;
    }
  }
});