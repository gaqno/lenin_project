<template>
  <Card class="mb-4 bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
    <CardHeader>
      <div class="flex items-start space-x-4">
        <Icon name="mdi:star-four-points-small" class="h-8 w-8 text-primary" />
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-foreground">
            Olá! Eu sou LeninGPT
          </h2>
          <p class="text-foreground/90 mt-1 leading-relaxed">
            Um bot que tenta encarnar Vladimir Ilyich Ulianov. Pergunte-me qualquer coisa!
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="grid gap-2">
        <Button v-for="tip in quickTips" :key="tip" variant="outline"
          class="justify-start text-left h-auto p-4 bg-background/60 hover:bg-background/80 border-border/40 hover:border-border/60 text-foreground font-medium"
          :disabled="isLoading" @click="handleTipClick(tip)">
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
