<template>
  <CommandDialog v-model:open="isOpenComputed" class="z-[80]">
    <CommandInput placeholder="Digite um comando..." />
    <CommandList>
      <CommandEmpty>Nenhum comando encontrado.</CommandEmpty>
      <CommandGroup heading="Ações">
        <CommandItem value="clear-chat" @select="handleClearChat">
          <Icon name="mdi:delete-empty-outline" class="mr-2 h-4 w-4" />
          <span>Limpar conversa</span>
        </CommandItem>
        <CommandItem value="show-updates" @select="handleShowUpdates">
          <Icon name="mdi:update" class="mr-2 h-4 w-4" />
          <span>Ver atualizações</span>
        </CommandItem>
        <CommandItem value="show-settings" @select="handleShowSettings">
          <Icon name="mdi:cog" class="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </CommandItem>
      </CommandGroup>
      <CommandGroup heading="Perguntas Rápidas">
        <CommandItem v-for="tip in quickTips" :key="tip" :value="tip" @select="handleQuickTip(tip)">
          <Icon name="mdi:lightbulb-outline" class="mr-2 h-4 w-4" />
          <span>{{ tip }}</span>
        </CommandItem>
      </CommandGroup>
      <CommandGroup heading="Navegação">
        <CommandItem value="about" @select="handleAbout">
          <Icon name="mdi:information-outline" class="mr-2 h-4 w-4" />
          <span>Sobre</span>
        </CommandItem>
        <CommandItem value="github" @select="handleGitHub">
          <Icon name="mdi:github" class="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<script setup lang="ts">
interface IChatCommandProps {
  isOpen: boolean;
}

interface IChatCommandEmits {
  (e: "clear-chat"): void;
  (e: "show-updates"): void;
  (e: "show-settings"): void;
  (e: "quick-tip", tip: string): void;
  (e: "show-about"): void;
  (e: "open-github"): void;
  (e: "close"): void;
}

const props = defineProps<IChatCommandProps>();
const emit = defineEmits<IChatCommandEmits>();

const isOpenComputed = computed({
  get: () => props.isOpen,
  set: (value: boolean) => {
    if (!value) {
      emit("close");
    }
  },
});

const quickTips = [
  "O que é socialismo?",
  "Quem é você, como era seu bairro?",
  "O socialismo deu certo?",
  "Por que ser socialista?",
  "Albert Einstein era um socialista?",
];

const handleClearChat = () => {
  emit("clear-chat");
  emit("close");
};

const handleShowUpdates = () => {
  emit("show-updates");
  emit("close");
};

const handleShowSettings = () => {
  emit("show-settings");
  emit("close");
};

const handleQuickTip = (tip: string) => {
  emit("quick-tip", tip);
  emit("close");
};

const handleAbout = () => {
  emit("show-about");
  emit("close");
};

const handleGitHub = () => {
  emit("open-github");
  emit("close");
};
</script>
