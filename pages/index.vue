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
              <div class="w-8 rounded">
                <img :src="client.user.avatar_url" alt="Tailwind-CSS-Avatar-component">
              </div>
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
                <a>
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

      <section class="mx-10 min-w-[70vw] min-h-[86vh] flex flex-col justify-between px-4 text-black rounded-xl p-4 bg-[url(https://images.unsplash.com/photo-1599913609289-be5c5c5e9d5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80)] ">
        <article class="w-[50vw] w-full pt-auto bg-slate-800/50 rounded-xl p-4 sm:p-6 lg:p-8">
          <div class="flex items-start sm:gap-8">
            <Icon name="mdi:star-four-points-small" class="text-6xl text-white" />
            <div class="w-full text-sm">
              <p class="text-white pr-6">
                Olá! Eu sou LeninIA, um bot que responde perguntas sobre o Lenin e marxismo em geral.
              </p>
              <p class="text-white">
                Pergunte-me qualquer coisa!
              </p>
            </div>
            <a />
          </div>
        </article>

        <div class="overflow-y-auto max-h-[50vh] mb-auto">
          <article>
            <div
              v-for="response, ind in responseStream"
              :key="`response_${ind}`"
              class="flex items-start sm:gap-8 w-[50vw] my-3 w-full pt-auto bg-slate-800/50 rounded-xl p-4 sm:p-6 lg:p-8"
            >
              <Icon name="mdi:star-four-points-small" class="text-6xl text-white" />
              <div class="w-full">
                <p class="text-white pr-6">
                  {{ response.data }}
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
                class="w-full h-12 bg-black/10 text-white mt-2 p-2 border-0 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Pergunte-me algo"
              />
            </div>

            <button class="btn btn-ghost mt-4" @click="ask">
              <Icon
                name="mdi:send-outline"
                :disabled="loadingSteam"
                class="text-white"
                size="2em"
              />
            </button>
          </div>
        </article>
      </section>
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
  responseStream.value.push({ data: question.value, role: "user" } as never);
  loadingSteam.value = true;
  useChatCompletion(question.value)
    .then((data: any) => {
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

// const fetchBookbase = () => {
//   return new Promise((resolve, reject) => {
//     fetch("https://www.marxists.org/portugues/lenin/index.htm", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then(res => res.json())
//       .then(data => resolve(data))
//       .catch(err => reject(err));
//   });
// };

onMounted(() => {
  document.title = "LeninIA";
  AOS.init({ duration: 1200 });

  Promise.all([
    fetchGit(),
  ]);

  // fetchBookbase()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch(err => console.warn(err))
  //   .finally(() => app.setLoading(false));
});
</script>
