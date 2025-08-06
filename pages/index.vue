<template>
  <!-- <ToastProvider> -->
  <main class="flex flex-col h-screen bg-background relative">
    <!-- Header -->
    <ChatHeader :user="client.user" @show-about="showAboutDialog = true" />

    <div class="flex flex-1 relative">
      <!-- Main Content -->
      <section class="flex-1 flex flex-col min-h-0 relative z-10">
        <!-- Chat Container with Overflow - Fixed height to leave space for input -->
        <div
          class="flex-1 overflow-y-auto p-4 relative max-h-[calc(100vh-12.5rem)] bg-[url('https://images.unsplash.com/photo-1599913609289-be5c5c5e9d5b?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
          <!-- Overlay for better text readability -->
          <div class="absolute inset-0 backdrop-blur-sm" />

          <!-- Content with relative positioning to appear above overlay -->
          <div class="relative z-10">
            <!-- Welcome Card -->
            <WelcomeCard :is-loading="loadingMessage || loadingAudio" @tip-click="handleTips" />

            <!-- Chat Messages -->
            <div ref="chatContainer" class="space-y-4">
              <TransitionGroup enter-active-class="transition ease-out duration-300 transform"
                enter-from-class="translate-y-4 opacity-0" enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition ease-in duration-300 transform"
                leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-4 opacity-0">
                <ChatMessage v-for="(message, index) in responseStream" :key="`response_${index}`" :message="message" />
              </TransitionGroup>
            </div>

            <!-- Loading Spinner at bottom of chat -->
            <div v-if="loadingMessage || loadingAudio" class="flex justify-center items-center py-8 mt-4">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <span class="ml-2 text-sm text-muted-foreground">Processando...</span>
            </div>
          </div>
        </div>

        <!-- Fixed Input Area at Bottom - Outside the scroll container -->
        <ChatInput :is-loading="loadingMessage || loadingAudio" @submit="ask" @clear="clearMessages" />
      </section>
    </div>

    <!-- About Dialog -->
    <Dialog :open="showAboutDialog" @update:open="showAboutDialog = false">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sobre Lenin GPT</DialogTitle>
          <DialogDescription>
            Uma IA inspirada nos pensamentos revolucionários de Vladimir Lenin.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold mb-2">
              Funcionalidades:
            </h3>
            <ul class="space-y-1 text-sm text-muted-foreground">
              <li>• Chat inteligente com IA</li>
              <li>• Respostas em áudio</li>
              <li>• Modo escuro/claro</li>
              <li>• Interface responsiva</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2">
              Desenvolvido por:
            </h3>
            <p class="text-sm text-muted-foreground">
              Gaqno - Revolução Digital
            </p>
          </div>
          <div class="flex space-x-2">
            <Button variant="outline" size="sm" as-child>
              <a href="https://www.github.com/gaqno" target="_blank" rel="noopener noreferrer">
                <Icon name="mdi:github" class="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" as-child>
              <a href="https://www.buymeacoffee.com/gaqno" target="_blank" rel="noopener noreferrer">
                <Icon name="mdi:coffee" class="h-4 w-4 mr-2" />
                Buy Me a Coffee
              </a>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button @click="showAboutDialog = false">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </main>
  <!-- </ToastProvider> -->
</template>

<script setup lang="ts">
// Imports
import { useAppStore } from "~/store/app";
import { useClientStore } from "~/store/client";
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

// Stores
const app = useAppStore();
const client = useClientStore();
const { showSuccess, showError, showInfo } = useToast();

// Reactive state
const loadingMessage = ref(false);
const loadingAudio = ref(false);
const chatContainer = ref<HTMLDivElement>();
const responseStream = ref<IChatMessage[]>([]);
const showAboutDialog = ref(false);
const showCommandPalette = ref(false);

// Settings state
const settings = ref({
  darkMode: false,
  audioEnabled: true,
  notificationsEnabled: true,
  audioSpeed: 1.0,
  language: "pt",
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
  // Track the question
  const { $trackQuestion } = useNuxtApp();
  $trackQuestion(questionText);

  responseStream.value.push({ data: questionText, role: "user" });

  // Set loading states
  loadingMessage.value = true;
  app.setLoading(true);

  if (settings.value.notificationsEnabled) {
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

      if (settings.value.audioEnabled) {
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

            if (settings.value.notificationsEnabled) {
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

            if (settings.value.notificationsEnabled) {
              showError("Erro no áudio", "Falha ao gerar áudio da resposta");
            }
          });
      } else {
        responseStream.value.pop();
        if (settings.value.notificationsEnabled) {
          showSuccess("Resposta completa", "Resposta processada com sucesso!");
        }
      }
    })
    .catch((_err) => {
      if (settings.value.notificationsEnabled) {
        showError("Erro", "Falha ao processar sua pergunta");
      }
    });
};

const handleTips = (text: string) => {
  ask(text);
};

const clearMessages = () => {
  responseStream.value = [];

  if (settings.value.notificationsEnabled) {
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

  Promise.all([
    fetchGit(),
  ]);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>
