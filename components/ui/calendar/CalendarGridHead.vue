<template>
  <CalendarGridHead v-bind="props">
    <slot></slot>
  </CalendarGridHead>
</template>

<script lang="ts" setup>
import type { CalendarGridHeadProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { CalendarGridHead } from "reka-ui";

const props = defineProps<CalendarGridHeadProps & { class?: HTMLAttributes["class"] }>();
</script>
