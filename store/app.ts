export const useAppStore = defineStore("app", {
  state: () => ({
    darkMode: true,
    loading: false,
    language: "pt",
    provider: "gemini" as "openai" | "gemini",
    sidemenu: false,
    modal: {
      show: false,
      title: "",
      content: "",
    },
    toast: {
      show: false,
      title: "",
      content: "",
    },
  }),
  getters: {},
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    toggleSidemenu() {
      this.sidemenu = !this.sidemenu;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setModal(modal: { show: boolean; title: string; content: string }) {
      this.modal = modal;
    },
    toggleLanguage() {
      const langs = ["pt", "en", "cn"];
      const index = langs.indexOf(this.language);
      this.language = langs[(index + 1) % langs.length];
    },
    setProvider(provider: "openai" | "gemini") {
      this.provider = provider;
    },
  },
});
