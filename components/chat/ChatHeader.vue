<template>
  <header class="flex items-center justify-between p-4 bg-background border-b-4 border-double border-border shadow-md z-20 relative animate-slide-up">
    <div class="flex items-center space-x-3">
      <Icon name="mdi:hammer-sickle" class="h-6 w-6 text-primary animate-pulse" />
      <h1 class="text-xl font-serif font-bold tracking-widest uppercase text-primary">
        Lenin GPT
      </h1>
    </div>

    <div class="flex items-center space-x-2">
      <Button variant="ghost" size="icon" title="Configurações" class="hover:bg-muted text-foreground" @click="handleSettingsClick">
        <Icon name="mdi:cog" class="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        :title="isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
        class="hover:bg-muted text-foreground"
        @click="toggleTheme"
      >
        <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" class="hover:bg-muted text-foreground" @click="handleAboutClick">
        <Icon name="mdi:information-outline" class="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" as-child class="ml-2">
        <a href="https://www.github.com/gaqno" target="_blank">
          <img :src="user.avatar_url" alt="GitHub" class="h-8 w-8 rounded-sm border border-muted filter grayscale hover:grayscale-0 transition-all">
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
  (e: "show-settings"): void;
}

defineProps<IChatHeaderProps>();
const emit = defineEmits<IChatHeaderEmits>();

const { isDark, toggleTheme } = useTheme();

const handleSettingsClick = () => {
  emit("show-settings");
};

const handleAboutClick = () => {
  emit("show-about");
};
</script>
