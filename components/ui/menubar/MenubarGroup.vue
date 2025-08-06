<template>
  <MenubarGroup v-bind="props">
    <slot></slot>
  </MenubarGroup>
</template>

<script setup lang="ts">
import type { MenubarGroupProps } from "reka-ui";
import { MenubarGroup } from "reka-ui";

const props = defineProps<MenubarGroupProps>();
</script>
