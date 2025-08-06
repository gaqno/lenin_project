<template>
  <div class="border-t border-border/50 bg-card/90 backdrop-blur-sm p-4 shadow-lg h-[8em]">
    <div class="flex items-center space-x-2 h-full">
      <div class="flex-1">
        <Textarea v-model="question" placeholder="Pergunte-me algo..."
          class="min-h-[48px] resize-none bg-background/70 border-border/50 text-foreground placeholder:text-muted-foreground/70 font-medium"
          rows="1" @keyup.enter.prevent="handleSubmit" @input="autoResize" />
      </div>

      <div class="flex space-x-2">
        <Button :disabled="isLoading || !question.trim()" @click="handleSubmit"
          class="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
          <Icon name="mdi:send" class="h-4 w-4" />
        </Button>

        <Button variant="outline" @click="clearMessages"
          class="border-border/50 hover:bg-muted/50 text-foreground shadow-md">
          <Icon name="mdi:trash-can-outline" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IChatInputProps {
  isLoading: boolean;
}

interface IChatInputEmits {
  (e: "submit", question: string): void;
  (e: "clear"): void;
}

defineProps<IChatInputProps>();
const emit = defineEmits<IChatInputEmits>();

const question = ref("");

const handleSubmit = () => {
  if (question.value.trim() === "") {
    return;
  }

  const questionText = question.value;
  question.value = "";

  const textarea = document.querySelector("textarea");
  if (textarea) {
    textarea.style.height = "auto";
  }

  emit("submit", questionText);
};

const clearMessages = () => {
  emit("clear");
};

const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
};
</script>
