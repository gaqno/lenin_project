<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import "./global.css";

useHead({ title: "Lenin GPT" });

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
