<template>
  <MenubarMenu v-bind="props">
    <slot></slot>
  </MenubarMenu>
</template>

<script setup lang="ts">
import type { MenubarMenuProps } from "reka-ui";
import { MenubarMenu } from "reka-ui";

const props = defineProps<MenubarMenuProps>();
</script>
