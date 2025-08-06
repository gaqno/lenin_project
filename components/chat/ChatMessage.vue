<template>
  <Card :class="messageClass">
    <CardContent class="p-4">
      <div class="flex items-start space-x-3">
        <Icon :name="getMessageIcon(message.role)" :class="getMessageIconClass(message.role)" />
        <div class="flex-1 min-w-0">
          <p v-if="message.role !== 'audio'" class="text-sm break-words leading-relaxed font-medium"
            :class="getTextClass(message.role)">
            {{ message.data }}
          </p>

          <!-- Audio Player -->
          <AudioPlayer v-if="message.role === 'audio'" :audio-url="message.data" :autoplay="true" class="mt-3" />

          <!-- Loading Bar -->
          <div v-if="message.role === 'loading'" class="mt-2">
            <div class="h-2 bg-muted/40 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import AudioPlayer from '~/components/ui/AudioPlayer.vue';

export interface IChatMessage {
  data: string;
  role: string;
}

interface IChatMessageProps {
  message: IChatMessage;
}

const props = defineProps<IChatMessageProps>();

const messageClass = computed(() => {
  switch (props.message.role) {
    case "user":
      return "bg-white/80 border-primary/30 backdrop-blur-sm shadow-md dark:bg-primary/20";
    case "sys":
      return "bg-card/80 border-border/40 backdrop-blur-sm shadow-md";
    case "warn":
      return "bg-red-50/80 border-red-200/50 backdrop-blur-sm shadow-md dark:bg-destructive/20 dark:border-destructive/30";
    case "loading":
      return "bg-muted/30 border-muted/40 backdrop-blur-sm shadow-md";
    case "audio":
      return "bg-green-50/80 border-green-200/50 backdrop-blur-sm shadow-md dark:bg-success/20 dark:border-success/30";
    default:
      return "bg-card/80 border-border/40 backdrop-blur-sm shadow-md";
  }
});

const getMessageIcon = (role: string): string => {
  switch (role) {
    case "user":
      return "mdi:account";
    case "sys":
      return "mdi:bookshelf";
    case "warn":
      return "mdi:alert-circle";
    case "loading":
      return "mdi:loading";
    case "audio":
      return "mdi:volume-high";
    default:
      return "mdi:message";
  }
};

const getMessageIconClass = (role: string): string => {
  switch (role) {
    case "user":
      return "h-5 w-5 text-primary";
    case "sys":
      return "h-5 w-5 text-destructive";
    case "warn":
      return "h-5 w-5 text-warning";
    case "loading":
      return "h-5 w-5 text-muted-foreground animate-spin";
    case "audio":
      return "h-5 w-5 text-success";
    default:
      return "h-5 w-5 text-muted-foreground";
  }
};

const getTextClass = (role: string): string => {
  switch (role) {
    case "user":
      return "text-primary dark:text-secondary-foreground";
    case "sys":
      return "text-foreground";
    case "warn":
      return "text-red-700 dark:text-destructive-foreground";
    case "loading":
      return "text-muted-foreground";
    case "audio":
      return "text-green-700 dark:text-success-foreground";
    default:
      return "text-foreground";
  }
};
</script>
