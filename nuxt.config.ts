import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-delay-hydration",
    "nuxt-swiper",
    "shadcn-nuxt",
  ],
  components: true,
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  pinia: {
    // Pinia configuration
  },
  tailwindcss: {
    cssPath: "~/global.css",
  },
  runtimeConfig: {
    public: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      OPENAI_CONTEXT: process.env.OPENAI_CONTEXT,
      ELEVENLABS_TOKEN: process.env.ELEVENLABS_TOKEN,
      ELEVENLABS_VOICE_ID: process.env.ELEVENLABS_VOICE_ID,
      ELEVENLABS_BASE_URL: process.env.ELEVENLABS_BASE_URL,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
  },
});
