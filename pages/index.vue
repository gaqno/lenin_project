<template>
  <!-- <ToastProvider> -->
  <main class="flex flex-col h-screen bg-background relative">
    <!-- Header -->
    <ChatHeader :user="client.user" @show-about="showAboutDialog = true" @show-settings="handleShowSettings" />

    <div class="flex flex-1 relative">
      <!-- Main Content -->
      <section class="flex-1 flex flex-col min-h-0 relative z-10">
        <!-- Chat Container with Overflow - Fixed height to leave space for input -->
        <div
          class="flex-1 overflow-y-auto p-4 relative max-h-[calc(100vh-14rem)] bg-[url('https://images.unsplash.com/photo-1599913609289-be5c5c5e9d5b?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
          <!-- Overlay for better text readability -->
          <div class="absolute inset-0 backdrop-blur-sm" />

          <!-- Content with relative positioning to appear above overlay -->
          <div class="relative z-10">
            <!-- Welcome Card -->
            <WelcomeCard :is-loading="loadingMessage" @tip-click="handleTips" />

            <!-- Chat Messages -->
            <div ref="chatContainer" class="space-y-4">
              <TransitionGroup enter-active-class="transition ease-out duration-300 transform"
                enter-from-class="translate-y-4 opacity-0" enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition ease-in duration-300 transform"
                leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-4 opacity-0">
                <ChatMessage v-for="(message, index) in responseStream" :key="`response_${index}`" :message="message"
                  :autoplay-enabled="audioStore.autoplayAudio" />
              </TransitionGroup>
            </div>

            <!-- Loading Spinner at bottom of chat -->
            <div v-if="loadingMessage" class="flex justify-center items-center py-8 mt-4">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <span class="ml-2 text-sm text-muted-foreground">Processando...</span>
            </div>
          </div>
        </div>

        <!-- Fixed Input Area at Bottom - Outside the scroll container -->
        <ChatInput :is-loading="loadingMessage" @submit="ask" @clear="clearMessages" />
      </section>
    </div>

    <!-- About Dialog -->
    <Dialog v-model:open="showAboutDialog">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <div class="flex items-center space-x-3">
            <div>
              <DialogTitle class="pb-4">
                LeninGPT
              </DialogTitle>
              <DialogDescription>
                Uma IA inspirada em Vladimir Ilyich Lenin, oferecendo insights sobre socialismo, história e filosofia
                marxista.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div class="space-y-4">
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <Icon name="mdi:brain" class="h-5 w-5 text-primary" />
              <span class="text-sm font-medium">Tecnologia</span>
            </div>
            <p class="text-sm text-muted-foreground ml-7">
              Desenvolvido com Nuxt 3, OpenAI GPT-4, ElevenLabs e Supabase. Interface moderna com Tailwind CSS e
              Shadcn/ui.
            </p>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <Icon name="mdi:shield-check" class="h-5 w-5 text-green-600" />
              <span class="text-sm font-medium">Privacidade</span>
            </div>
            <p class="text-sm text-muted-foreground ml-7">
              Suas perguntas são registradas para análise e melhorias. Dados anonimizados e seguros.
            </p>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <Icon name="mdi:heart" class="h-5 w-5 text-red-500" />
              <span class="text-sm font-medium">Apoie o Projeto</span>
            </div>
            <div class="ml-7 space-y-2">
              <a href="https://www.buymeacoffee.com/gaqno" target="_blank"
                class="flex items-center space-x-2 text-sm text-amber-600 hover:text-amber-700 hover:underline">
                <Icon name="mdi:coffee" class="h-4 w-4" />
                <span>Buy Me a Coffee</span>
              </a>
              <a href="https://link.mercadopago.com.br/gaqnodevelopment" target="_blank"
                class="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 hover:underline">
                <Icon name="mdi:credit-card" class="h-4 w-4" />
                <span>Mercado Pago</span>
              </a>
              <a href="https://www.github.com/gaqno" target="_blank"
                class="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-700 hover:underline">
                <Icon name="mdi:github" class="h-4 w-4" />
                <span>GitHub do Desenvolvedor</span>
              </a>
            </div>
          </div>

          <div class="pt-2 border-t">
            <p class="text-xs text-muted-foreground text-center">
              Versão 1.0.0 • Desenvolvido com ❤️ por @gaqno
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Settings Dialog -->
    <Dialog v-model:open="showSettingsDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Configure suas preferências de áudio e interface.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <AudioSettings />
        </div>
      </DialogContent>
    </Dialog>

    <!-- Command Palette -->
    <ChatCommand :is-open="showCommandPalette" @clear-chat="clearMessages" @show-updates="handleShowUpdates"
      @show-settings="handleShowSettings" @quick-tip="handleQuickTip" @show-about="showAboutDialog = true"
      @open-github="handleOpenGitHub" @close="showCommandPalette = false" />
  </main>
  <!-- </ToastProvider> -->
</template>

<script setup lang="ts">
// Imports
import { useAppStore } from "~/store/app";
import { useClientStore } from "~/store/client";
import { useAudioStore } from "~/store/audio";
import type { User } from "~/types";
import { useChatCompletion } from "~/service/openai";
import { postElevenLabsTextToSpeech } from "~/service/elevenlabs";
import type { IChatMessage } from "~/components/chat/ChatMessage.vue";
import { useToast } from "~/composables/useToast";

// Component imports
import ChatHeader from "~/components/chat/ChatHeader.vue";
// import ChatSidebar from "~/components/chat/ChatSidebar.vue";
import WelcomeCard from "~/components/chat/WelcomeCard.vue";
import ChatMessage from "~/components/chat/ChatMessage.vue";
import ChatInput from "~/components/chat/ChatInput.vue";
import ChatCommand from "~/components/chat/ChatCommand.vue";
import AudioSettings from "~/components/ui/AudioSettings.vue";

// UI Components
import Dialog from "~/components/ui/dialog/Dialog.vue";
import DialogContent from "~/components/ui/dialog/DialogContent.vue";
import DialogHeader from "~/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "~/components/ui/dialog/DialogTitle.vue";
import DialogDescription from "~/components/ui/dialog/DialogDescription.vue";

// Stores
const app = useAppStore();
const client = useClientStore();
const audioStore = useAudioStore();
const { showSuccess, showError, showInfo } = useToast();

// Reactive state
const loadingMessage = ref(false);
const loadingAudio = ref(false);
const chatContainer = ref<HTMLDivElement>();
const responseStream = ref<IChatMessage[]>([]);
const showAboutDialog = ref(false);
const showSettingsDialog = ref(false);
const showCommandPalette = ref(false);

// Detect mobile
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// Methods
const fetchGit = () => {
  app.setLoading(true);
  return new Promise((resolve, reject) => {
    fetch("https://api.github.com/users/gaqno", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((data) => {
        client.$patch({
          user: {
            ...data as User,
          },
        });
        app.setLoading(false);
        resolve(data);
      })
      .catch(err => reject(err));
  });
};

const ask = (questionText: string) => {
  responseStream.value.push({ data: questionText, role: "user" });

  // Set loading states
  loadingMessage.value = true;
  app.setLoading(true);

  if (audioStore.notificationsEnabled) {
    showInfo("Pergunta enviada", "Processando sua pergunta...");
  }

  useChatCompletion(questionText)
    .then((data: any) => {
      const { message } = data;
      loadingMessage.value = false;
      loadingAudio.value = true;
      responseStream.value.push({ data: message.content, role: "sys" });
      responseStream.value.push({ data: "mdi:loading", role: "loading" });
      app.setLoading(false);

      if (audioStore.generateAudio) {
        postElevenLabsTextToSpeech({
          headers: ["audio/mpeg"],
          params: {
            optimize_streaming_latency: 0,
            output_format: "mp3_44100_128",
          },
          payload: {
            text: data.message.content || "",
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0,
              similarity_boost: 0,
              style: 0,
              use_speaker_boost: true,
            },
          },
        })
          .then((audio) => {
            responseStream.value.pop();
            const audioBlob = new Blob([audio], { type: "audio/mpeg" });
            const audioUrl = URL.createObjectURL(audioBlob);
            responseStream.value.push({ data: audioUrl, role: "audio" });
            loadingAudio.value = false;

            if (audioStore.notificationsEnabled) {
              showSuccess("Resposta completa", "Áudio gerado com sucesso!");
            }
          })
          .catch((_err) => {
            loadingAudio.value = false;
            responseStream.value.pop();
            responseStream.value.push({
              data: "Aparentemente a maquina do estado capitalista nos limitou ao dar voz a razão.. Transcrição por áudio mal-sucedida",
              role: "warn",
            });

            if (audioStore.notificationsEnabled) {
              showError("Erro no áudio", "Falha ao gerar áudio da resposta");
            }
          });
      } else {
        responseStream.value.pop();
        loadingAudio.value = false;
        if (audioStore.notificationsEnabled) {
          showSuccess("Resposta completa", "Resposta processada com sucesso!");
        }
      }
    })
    .catch((_err) => {
      if (audioStore.notificationsEnabled) {
        showError("Erro", "Falha ao processar sua pergunta");
      }
    });
};

const handleTips = (text: string) => {
  ask(text);
};

const handleQuickTip = (tip: string) => {
  ask(tip);
};

const handleShowUpdates = () => {
  showInfo("Atualizações", "Versão mais recente do Lenin GPT");
};

const handleShowSettings = () => {
  showSettingsDialog.value = true;
};

const handleOpenGitHub = () => {
  window.open("https://www.github.com/gaqno", "_blank");
};

const clearMessages = () => {
  responseStream.value = [];

  if (audioStore.notificationsEnabled) {
    showInfo("Mensagens limpas", "Todas as mensagens foram removidas");
  }
};

// Keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  // Cmd/Ctrl + K to open command palette
  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    event.preventDefault();
    showCommandPalette.value = true;
  }

  // Cmd/Ctrl + L to clear chat
  if ((event.metaKey || event.ctrlKey) && event.key === "l") {
    event.preventDefault();
    clearMessages();
  }
};

// Watchers
watchEffect(() => {
  if (responseStream.value && responseStream.value.length > 0) {
    nextTick(() => {
      // Scroll the chat container to bottom
      const chatContainer = document.querySelector(".overflow-y-auto");
      if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }
});

// Lifecycle
onMounted(() => {
  document.title = "LeninGPT";
  document.addEventListener("keydown", handleKeydown);

  // Apply dark mode by default
  const { isDark } = useTheme();
  if (!isDark.value) {
    // Toggle to dark mode if not already dark
    const { toggleTheme } = useTheme();
    toggleTheme();
  }

  // Enable autoplay by adding a click listener to the document
  const enableAutoplay = () => {
    // This enables autoplay for future audio elements
    document.removeEventListener("click", enableAutoplay);
    document.removeEventListener("touchstart", enableAutoplay);
  };

  document.addEventListener("click", enableAutoplay);
  document.addEventListener("touchstart", enableAutoplay);

  Promise.all([
    fetchGit(),
  ]);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>
