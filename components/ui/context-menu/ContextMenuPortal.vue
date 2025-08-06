<template>
  <ContextMenuPortal v-bind="props">
    <slot />
  </ContextMenuPortal>
</template>

<script setup lang="ts">
import type { ContextMenuPortalProps } from "reka-ui";
import { ContextMenuPortal } from "reka-ui";

const props = defineProps<ContextMenuPortalProps>();
</script>
