<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import "./global.css";

useHead({
  title: "Lenin GPT",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" },
    { name: "theme-color", content: "#c41e3a" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/lenin_profile.jpg" },
  ],
});

// Initialize theme with dark as default
const { initializeTheme } = useTheme();

onMounted(() => {
  initializeTheme();
});
</script>

<style>
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}

.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>
