<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import {
  ScrollAreaCorner,
  ScrollAreaRoot,

  ScrollAreaViewport,
} from "reka-ui";
import ScrollBar from "./ScrollBar.vue";
import { cn } from "@/lib/utils";

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = reactiveOmit(props, "class");
</script>
