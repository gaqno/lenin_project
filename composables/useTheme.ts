import { useAppStore } from "~/store/app";

export const useTheme = () => {
  const app = useAppStore();

  // Get theme from localStorage or default to dark
  const getInitialTheme = (): boolean => {
    if (process.client) {
      const saved = localStorage.getItem("theme");
      if (saved !== null) {
        return saved === "dark";
      }
    }
    return true; // Default to dark
  };

  // Initialize theme
  const initializeTheme = () => {
    if (process.client) {
      const isDark = getInitialTheme();
      app.darkMode = isDark;
      applyTheme(isDark);
    }
  };

  // Apply theme to document
  const applyTheme = (isDark: boolean) => {
    if (process.client) {
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    app.toggleDarkMode();
    applyTheme(app.darkMode);
  };

  // Set specific theme
  const setTheme = (isDark: boolean) => {
    app.darkMode = isDark;
    applyTheme(isDark);
  };

  return {
    isDark: computed(() => app.darkMode),
    toggleTheme,
    setTheme,
    initializeTheme,
  };
};
