<template>
  <ToastProvider v-bind="props">
    <slot />
    <Toaster class="z-[120]" />
  </ToastProvider>
</template>

<script setup lang="ts">
import type { ToastProviderProps } from "reka-ui";
import { ToastProvider } from "reka-ui";
import { Toaster } from "~/components/ui/toast";

const props = defineProps<ToastProviderProps>();
</script>
