<template>
  <HoverCardRoot v-bind="forwarded">
    <slot />
  </HoverCardRoot>
</template>

<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from "reka-ui";
import { HoverCardRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps<HoverCardRootProps>();
const emits = defineEmits<HoverCardRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
