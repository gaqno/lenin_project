<template>
  <main class="flex flex-col">
    <!-- <div
      id="about-me"
      class="absolute bg-red-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden blur-3xl"
      :style="{
        opacity,
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }"
    /> -->
    <span class="flex flex-row">
      <label
        for="my-drawer"
        class="ml-4 btn btn-ghost drawer-button my-2"
        @click.prevent="app.toggleSidemenu()"
      >
        <Icon name="mdi:hammer-sickle" />
      </label>
      <div class="drawer-side ml-auto">
        <label for="my-drawer-3" class="drawer-overlay" />
        <ul class="menu flex flex-row p-4 h-full ml-auto">
          <!-- Sidebar content here -->
          <li><a><Icon name="mdi:flag-outline-variant" /></a></li>
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
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition ease-in duration-300 transform"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div v-if="app.sidemenu" class="drawer-side">
            <label for="my-drawer" class="drawer-overlay" />
            <ul class="menu p-4 h-full text-base-content">
              <!-- Sidebar content here -->
              <li>
                <a @click.prevent="clearConversation">
                  <Icon name="mdi:delete-empty-outline" />
                  <span class="whiterow-nowrap">
                    Limpar conversa
                  </span>
                </a>
              </li>
              <li>
                <a>
                  <Icon name="mdi:update" />
                  <span>Atualizações</span>
                </a>
              </li>
            </ul>
          </div>
        </Transition>
      </aside>

      <section :class="[!app.sidemenu ? 'min-w-[95vw]' : 'min-w-[80vw]', 'mx-2 md:mx-8 min-h-[86vh] flex flex-col justify-between px-4 text-black rounded-xl p-4 bg-[url(https://images.unsplash.com/photo-1599913609289-be5c5c5e9d5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80)]'] ">
        <article class="w-[50vw] w-full pt-auto bg-slate-800/50 rounded-xl p-4 sm:p-6 lg:p-8">
          <div class="flex mb-4 items-start sm:gap-8">
            <Icon name="mdi:star-four-points-small" class="text-6xl text-white" />
            <div class="w-full text-sm">
              <p class="text-white pr-6">
                Olá! Eu sou LeninGPT, um bot que tenta encarnar Vladmir Lenin.
              </p>
              <p class="text-white">
                Pergunte-me qualquer coisa!
              </p>
            </div>
          </div>
        </article>

        <div class="overflow-y-auto overflow-x-hidden max-h-[50vh] mb-auto mt-2">
          <article>
            <!-- eslint-disable-next-line vue/no-template-shadow -->
            <div
              v-for="(res, ind) in responseStream"
              :key="`response_${ind}`"
              data-aos="fade-up"
              class="flex items-start my-2 sm:gap-8 w-[50vw] w-full pt-auto bg-slate-800/50 rounded-xl p-4 sm:p-6 lg:p-8"
            >
              <Icon v-if="res.role === 'user'" name="mdi:star-four-points-small" class="text-6xl text-white" />
              <Icon v-else name="mdi:hammer-sickle" class="text-3xl mr-4  md:mr-0 text-white" />
              <div class="w-full">
                <p class="text-white pr-6">
                  {{ res.data }}
                </p>
              </div>
            </div>
          </article>
        </div>

        <article class="w-[20vw] w-full bg-slate-800/50 rounded-xl p-4 sm:p-6 lg:p-8">
          <div class="flex items-start sm:gap-8">
            <div class="w-full mt-auto">
              <textarea
                v-model="question"
                class="w-full text-sm h-12 bg-black/10 text-white mt-2 p-2 border-0 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Pergunte-me algo"
              />
            </div>

            <button class="btn btn-ghost mt-4" @click="ask">
              <Icon
                name="mdi:send-outline"
                :disabled="loadingSteam || !question"
                class="text-white"
                size="2em"
              />
            </button>
          </div>
        </article>
      </section>
    </div>
    <div class="mt-6 p-4">
      <footer clas="flex">
        <p>
          Essa aplicação foi feita com Vue3, TailwindCSS, Vite e OpenAI.
        </p>
        Essa aplicação gera custos, se você gostou e quer ajudar a manter o projeto no ar, considere fazer uma doação.

        <p>
          Faça uma doação para o projeto:
        </p>
        <a href="https://www.buymeacoffee.com/gaqno" target="_blank" class="">
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
import AOS from "aos";
import { useAppStore } from "~/store/app";
import { useClientStore } from "~/store/client";
import { User } from "~/types/git";
import "aos/dist/aos.css";
import { useChatCompletion } from "~/service/openai";

interface IResponse {
  data: string;
  role: string;
}

const app = useAppStore();
const client = useClientStore();
const loadingSteam = ref(false);
// const { x, y } = useMouse();
// const { width, height } = useWindowSize();
// const dx = computed(() => Math.abs(x.value - width.value / 2));
// const dy = computed(() => Math.abs(y.value - height.value / 2));
// const distance = computed(() => Math.sqrt(dx.value * dx.value + dy.value * dy.value));
// const size = computed(() => Math.min(300 - distance.value / 3, 150));
// const opacity = computed(() => Math.min(Math.max(size.value / 100, 0.7), 1));

const response = ref({});
const question = ref("");
const responseStream = ref([] as IResponse[]);

const ask = () => {
  if (!question.value) { return; }
  responseStream.value.push({ data: question.value, role: "user" } as never);
  loadingSteam.value = true;
  app.setLoading(true);
  useChatCompletion(question.value)
    .then((data: any) => {
      app.setLoading(false);
      question.value = "";
      loadingSteam.value = false;
      response.value = data;
      responseStream.value.push({ data: data.content, role: "sys" } as never);
    })
    .catch(err => console.warn(err));
};

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

const clearConversation = () => {
  responseStream.value = [];
  app.$patch({ sidemenu: false });
};

onMounted(() => {
  document.title = "LeninGPT";
  AOS.init({
    duration: 1200,
    once: true,
  });

  Promise.all([
    fetchGit(),
  ]);
});

</script>
