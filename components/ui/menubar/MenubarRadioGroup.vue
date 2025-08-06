<template>
  <MenubarRadioGroup v-bind="forwarded">
    <slot></slot>
  </MenubarRadioGroup>
</template>

<script setup lang="ts">
import type { MenubarRadioGroupEmits, MenubarRadioGroupProps } from "reka-ui";
import {
  MenubarRadioGroup,

  useForwardPropsEmits,
} from "reka-ui";

const props = defineProps<MenubarRadioGroupProps>();

const emits = defineEmits<MenubarRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
