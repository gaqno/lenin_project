<template>
  <Card
    class="mb-4 bg-card/90 backdrop-blur-sm border-4 border-double border-border shadow-xl animate-fade-in"
  >
    <CardHeader>
      <div class="flex items-start space-x-4">
        <div class="flex-shrink-0 animate-stamp">
          <img
            src="/lenin_profile.jpg"
            alt="Lenin"
            class="h-28 w-28 rounded-sm border-2 border-muted object-cover sepia-[0.2]"
          />
        </div>
        <div
          class="flex-1 animate-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]"
        >
          <h2 class="text-xl font-serif tracking-wide text-foreground">
            Olá! Eu sou LeninGPT
          </h2>
          <p class="text-foreground/90 mt-2 font-sans leading-relaxed">
            Um bot que tenta encarnar Vladimir Ilyich Ulianov. Pergunte-me
            qualquer coisa!
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="grid gap-2">
        <Button
          v-for="(tip, index) in quickTips"
          :key="tip"
          variant="outline"
          class="justify-start text-left h-auto p-4 bg-background/40 hover:bg-accent hover:text-accent-foreground border-dashed border-border/60 text-foreground font-serif animate-paper-slide opacity-0 [animation-fill-mode:forwards]"
          :style="{ animationDelay: `${300 + index * 100}ms` }"
          :disabled="isLoading"
          @click="handleTipClick(tip)"
        >
          {{ tip }}
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface IWelcomeCardProps {
  isLoading: boolean;
}

interface IWelcomeCardEmits {
  (e: "tip-click", tip: string): void;
}

defineProps<IWelcomeCardProps>();
const emit = defineEmits<IWelcomeCardEmits>();

const quickTips = [
  "O que é socialismo?",
  "Quem é você, como era seu bairro?",
  "O socialismo deu certo?",
  "Por que ser socialista?",
  "Albert Einstein era um socialista?",
];

const handleTipClick = (tip: string) => {
  emit("tip-click", tip);
};
</script>
