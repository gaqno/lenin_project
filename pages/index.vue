<template>
  <main class="flex flex-col">
    <span class="flex flex-row">
      <label
        for="my-drawer"
        class="ml-4 btn btn-ghost drawer-button my-2"
        @click.prevent="app.toggleSidemenu()"
      >
        <Icon name="mdi:bookshelf" size="2em" />
        <span class="ml-2">
          Lenin GPT
        </span>
      </label>
      <div class="drawer-side ml-auto">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu flex flex-row p-4 h-full ml-auto">
          <!-- Sidebar content here -->
          <li><a><Icon name="mdi:flag-outline-variant" size="1.5em" class="m-1" /></a></li>
          <li>
            <div class="avatar">
              <a href="https://www.github.com/gaqno" target="_blank" class="w-8 rounded">
                <img :src="client.user.avatar_url" alt="A">
              </a>
            </div>
          </li>
        </ul>
      </div>
    </span>

    <div class="flex">
      <aside>
        <Transition
          :appear="app.sidemenu"
          enter-active-class="transition ease-out duration-300 transform"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition ease-in duration-100 transform"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-100"
        >
          <div v-if="app.sidemenu" class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 h-full text-base-content">
              <!-- Sidebar content here -->
              <li>
                <a @click.prevent="clearConversation">
                  <Icon name="mdi:delete-empty-outline" />
                  <span class="whitespace-nowrap">
                    Limpar conversa
                  </span>
                </a>
              </li>
              <li>
                <a @click.prevent="pushUpdates">
                  <Icon name="mdi:update" />
                  <span>Atualizações</span>
                </a>
              </li>
            </ul>
          </div>
        </Transition>
      </aside>

      <section :class="[!app.sidemenu ? 'min-w-[95vw]' : 'min-w-[70vw]', 'mx-2 min-h-[86vh] flex flex-col justify-between px-4 text-black rounded-xl p-4 bg-[url(https://images.unsplash.com/photo-1599913609289-be5c5c5e9d5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80)]'] ">
        <article class="w-[50vw] w-full pt-auto bg-slate-800/80 rounded-xl p-4 sm:p-6 lg:p-8">
          <div class="flex mb-4 items-start sm:gap-8">
            <Icon name="mdi:star-four-points-small" class="text-6xl text-white" />
            <div class="w-full text-sm">
              <p class="text-white pr-6">
                Olá! Eu sou LeninGPT, um bot que tenta encarnar Vladimir Ilyich Ulianov.
              </p>
              <p class="text-white">
                Pergunte-me qualquer coisa!
              </p>

              <div class="mt-4 text-blue-400">
                <p :class="[loadingAudio || loadingMessage && 'cursor-progress', 'hover:underline hover:cursor-pointer']" @click.prevent="handleTips('O que é socialismo?')">
                  O que é socialismo?
                </p>
                <p :class="[loadingAudio || loadingMessage && 'cursor-progress', 'hover:underline hover:cursor-pointer']" @click.prevent="handleTips('Quem é você, como era seu bairro e onde morou?')">
                  Quem é você, como era seu bairro?
                </p>
                <p :class="[loadingAudio || loadingMessage && 'cursor-progress', 'hover:underline hover:cursor-pointer']" @click.prevent="handleTips('O socialismo deu certo?')">
                  O socialismo deu certo?
                </p>
                <p :class="[loadingAudio || loadingMessage && 'cursor-progress', 'hover:underline hover:cursor-pointer']" @click.prevent="handleTips('Por que ser socialista?')">
                  Por que ser socialista?
                </p>
                <p :class="[loadingAudio || loadingMessage && 'cursor-progress', 'hover:underline hover:cursor-pointer']" @click.prevent="handleTips('Albert Einstein era um socialista?')">
                  Albert Einstein era um socialista?
                </p>
              </div>
            </div>
          </div>
        </article>

        <div ref="chatContainer" class="overflow-y-auto overflow-x-hidden max-h-[50vh] scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mt-2 my-6">
          <TransitionGroup
            enter-active-class="transition ease-out duration-300 transform"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition ease-in duration-300 transform"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div
              v-for="res, ind in responseStream"
              :key="`response_${ind}`"
              class="flex mb-auto items-start items-center my-2 sm:gap-8 w-[50vw] w-full pt-auto bg-slate-800/50 rounded-xl p-4 sm:p-6 lg:p-8"
            >
              <Icon v-if="res.role === 'user'" name="mdi:star-four-points-small" class="text-6xl text-white" />
              <Icon v-if="res.role === 'warn'" name="mdi:headset" class="text-3xl text-white" />
              <Icon v-else-if="res.role === 'loading'" :name="res.data" class="text-3xl text-white" />
              <Icon v-else name="mdi:bookshelf" class="text-3xl mr-4  md:mr-0 text-white" />
              <div v-if="res.role === 'sys' || res.role === 'user' || res.role === 'warn'" class="w-full">
                <p class="text-white pr-6 text-xs md:text-base">
                  {{ res.data }}
                </p>
              </div>
              <audio v-if="res.role === 'audio'" autoPlay controls>
                <source v-if="res.data" :src="res.data" type="audio/mpeg">
              </audio>
              <div v-if="res.role === 'loading'" class="w-full flex flex-row gap-x-6">
                <progress class="progress w-full"></progress>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <article class="w-[20vw] w-full bg-slate-800/90 rounded-xl p-4 sm:p-6 lg:p-8">
          <div class="flex items-start sm:gap-8">
            <div class="w-full mt-auto">
              <textarea
                v-model="question"
                class="w-full text-sm h-12 bg-black/10 text-white mt-2 p-2 border-0 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Pergunte-me algo"
                @keyup.enter="ask"
              ></textarea>
            </div>

            <button class="btn btn-ghost mt-4" @click="ask">
              <Icon
                name="mdi:send-outline"
                :disabled="loadingMessage || !question"
                class="text-white"
                size="2em"
              />
            </button>
            <button class="btn btn-ghost mt-4" @click="responseStream = []">
              <Icon
                name="mdi:trash-can-outline"
                class="text-white"
                size="2em"
              />
            </button>
          </div>
        </article>
      </section>
    </div>
    <div class="bg-slate-900 mt-4">
      <footer class="grid grid-cols-6 mt-6 p-8 ">
        <span class="col-span-4 m-1 text-xs">
          <p>Essa aplicação foi feita com Vue3, TailwindCSS, Vite e OpenAI.</p>
          <p>Essa aplicação gera custos, se você gostou e quer ajudar a manter o projeto no ar, considere fazer uma doação.</p>
        </span>
        <a href="https://www.buymeacoffee.com/gaqno" target="_blank" class="col-span-2">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            height="60"
            class="mt-6 mx-auto"
            width="217"
          >
        </a>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useClientStore } from "~/store/client";
import { User } from "~/types/git";
import { useChatCompletion } from "~/service/openai";
import { postElevenLabsTextToSpeech } from "~/service/elevenlabs";

interface IResponse {
  data: string;
  role: string;
}
const app = useAppStore();
const client = useClientStore();
const loadingMessage = ref(false);
const loadingAudio = ref(false);
const chatContainer = ref({} as HTMLDivElement);
const question = ref("");
const responseStream = ref([] as IResponse[]);
const updates = [
  {
    date: "02/07/23",
    problem: "Ao responder tréplica, ele perde o contexto",
    solution: "working",
  },
  {
    date: "19/10/23",
    problem: "feat: resposta de áudio",
    solution: "working",
  },
];

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

const ask = () => {
  if (question.value === "") { return; }
  const questionText = question.value;
  question.value = "";
  responseStream.value.push({ data: questionText, role: "user" } as never);
  app.setLoading(true);
  useChatCompletion(questionText)
    .then((data: any) => {
      const { message } = data;
      loadingMessage.value = false;
      loadingAudio.value = true;
      responseStream.value.push({ data: message.content, role: "sys" } as never);
      responseStream.value.push({ data: "iconoir:voice-circle", role: "loading" } as never);
      app.setLoading(false);
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
          responseStream.value.push({ data: audioUrl, role: "audio" } as never);
          loadingAudio.value = false;
        })
        .catch((err) => {
          console.warn(err);
          loadingAudio.value = false;
          responseStream.value.pop();
          responseStream.value.push({ data: "Aparentemente a maquina do estado capitalista nos limitou ao dar voz a razão.. Transcrição por áudio mal-sucedida", role: "warn" } as never);
        });
    })
    .catch(err => console.warn(err));
};

const handleTips = (text: string) => {
  question.value = text;
  ask();
};

const clearConversation = () => {
  responseStream.value = [];
  app.$patch({ sidemenu: false });
};

const pushUpdates = () => {
  app.$patch({ sidemenu: false });
  responseStream.value.push({ data: "ATUALIZAÇÕES", role: "sys" } as never);
  updates.forEach((update) => {
    responseStream.value.push({
      data: `
      Data: ${update.date} ~ 
      Problema: ${update.problem} ~
      Atualização: ${update.solution === "working" ? "CORRIGIDO" : "NÃO CORRIGIDO"}
      `,
      role: "sys",
    } as never);
  });
};

watchEffect(() => {
  if (responseStream.value && responseStream.value.length > 0) {
    chatContainer.value.scroll({
      top: chatContainer.value.scrollHeight + 1000,
      behavior: "smooth",
    });
  }
});

onMounted(() => {
  document.title = "LeninGPT";
  Promise.all([
    fetchGit(),
  ]);
});

</script>
