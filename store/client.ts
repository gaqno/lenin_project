import { User } from "~/types/git";

export const useClientStore = defineStore("client", {
  state: () => ({
    user: {} as User,
  }),
  getters: {},
  actions: {
    setUser (user: User) {
      this.user = user;
    },
    getUser () {
      return this.user;
    },
  },
});
