]<template>
  <NuxtLayout>
    <div>
      <LoadingComponent v-if="app.loading" />
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAppStore } from "./store/app";
import "./global.css";

const app = useAppStore();
useHead({ title: "Lenin GPT" });

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
