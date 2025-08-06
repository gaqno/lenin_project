<template>
  <header class="flex items-center justify-between p-4 bg-card">
    <div class="flex items-center space-x-2">
      <h1 class="text-lg font-semibold">
        Lenin GPT
      </h1>
    </div>

    <div class="flex items-center space-x-2">
      <Button variant="ghost" size="icon" @click="toggleTheme"
        :title="isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'">
        <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" @click="showAboutDialog = true">
        <Icon name="mdi:information-outline" class="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" as-child>
        <a href="https://www.github.com/gaqno" target="_blank">
          <img :src="user.avatar_url" alt="GitHub" class="h-8 w-8 rounded-full">
        </a>
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { User } from "~/types";

interface IChatHeaderProps {
  user: User;
}

interface IChatHeaderEmits {
  (e: "show-about"): void;
}

defineProps<IChatHeaderProps>();
const emit = defineEmits<IChatHeaderEmits>();

const showAboutDialog = ref(false);
const { isDark, toggleTheme } = useTheme();

watch(showAboutDialog, (newValue) => {
  if (newValue) {
    emit("show-about");
  }
});
</script>
