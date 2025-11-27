<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>

<script setup lang="ts">
import type { ToastRootEmits } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { ToastRoot, useForwardPropsEmits } from "reka-ui";
import type { ToastProps } from ".";
import { toastVariants } from ".";
import { cn } from "@/lib/utils";

const props = defineProps<ToastProps>();

const emits = defineEmits<ToastRootEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
