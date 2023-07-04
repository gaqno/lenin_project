import { inject } from "@vercel/analytics";

const vercelPlugin = defineNuxtPlugin((context) => {
  inject(context);
});

export default vercelPlugin;