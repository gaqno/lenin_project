<template>
  <aside class="absolute inset-0 z-30 md:relative md:z-auto">
    <Transition
      :appear="isOpen"
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in duration-300 transform"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div v-if="isOpen" class="h-full w-80 max-w-[90vw] bg-card border-r shadow-lg">
        <div class="p-4 border-b">
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">
              Menu
            </h2>
            <Button variant="ghost" size="icon" class="md:hidden" @click="closeSidebar">
              <Icon name="mdi:close" class="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <Button variant="ghost" class="w-full justify-start" @click="clearConversation">
            <Icon name="mdi:delete-empty-outline" class="mr-2 h-4 w-4" />
            Limpar conversa
          </Button>
          <Button variant="ghost" class="w-full justify-start" @click="pushUpdates">
            <Icon name="mdi:update" class="mr-2 h-4 w-4" />
            Atualizações
          </Button>
        </div>
      </div>
    </Transition>

    <Transition
      :appear="isOpen"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute inset-0 bg-background/80 backdrop-blur-sm md:hidden z-20"
        @click="closeSidebar"
      />
    </Transition>
  </aside>
</template>

<script setup lang="ts">
interface IChatSidebarProps {
  isOpen: boolean;
}

interface IChatSidebarEmits {
  (e: "clear-conversation"): void;
  (e: "push-updates"): void;
  (e: "close"): void;
}

defineProps<IChatSidebarProps>();
const emit = defineEmits<IChatSidebarEmits>();

const clearConversation = () => {
  emit("clear-conversation");
};

const pushUpdates = () => {
  emit("push-updates");
};

const closeSidebar = () => {
  emit("close");
};
</script>
