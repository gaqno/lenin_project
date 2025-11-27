<template>
  <Card :class="[messageClass, 'animate-slide-up']">
    <CardContent class="p-4">
      <div class="flex items-start space-x-3">
        <!-- Avatar for system messages -->
        <div
          v-if="message.role === 'sys'"
          class="flex-shrink-0 animate-fade-in [animation-delay:300ms]"
        >
          <img
            src="/lenin_profile.jpg"
            alt="Lenin"
            class="h-10 w-10 rounded-sm border border-muted/50 object-cover sepia-[0.3] shadow-sm"
          />
        </div>

        <!-- Icon for other message types -->
        <Icon
          v-else
          :name="getMessageIcon(message.role)"
          :class="getMessageIconClass(message.role)"
        />

        <div class="flex-1 min-w-0">
          <p
            v-if="message.role !== 'audio'"
            class="text-sm break-words leading-relaxed font-medium animate-fade-in [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]"
            :class="getTextClass(message.role)"
          >
            {{ message.data }}
          </p>

          <!-- Audio Player -->
          <AudioPlayer
            v-if="message.role === 'audio'"
            :audio-url="message.data"
            :autoplay="autoplayEnabled"
            class="mt-3 animate-fade-in"
          />

          <!-- Loading Bar -->
          <div v-if="message.role === 'loading'" class="mt-2">
            <div class="h-2 bg-muted/40 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import AudioPlayer from "~/components/ui/AudioPlayer.vue";

export interface IChatMessage {
  data: string;
  role: string;
}

interface IChatMessageProps {
  message: IChatMessage;
  autoplayEnabled?: boolean;
}

const props = withDefaults(defineProps<IChatMessageProps>(), {
  autoplayEnabled: false,
});

const messageClass = computed(() => {
  switch (props.message.role) {
    case "user":
      return "bg-secondary/30 border-b-2 border-dashed border-primary/20 backdrop-blur-sm shadow-sm mr-8";
    case "sys":
      return "bg-card/95 border-l-4 border-double border-primary/60 backdrop-blur-sm shadow-md ml-2";
    case "warn":
      return "bg-card/95 border-l-4 border-double border-primary/60 backdrop-blur-sm shadow-md ml-2";
    case "loading":
      return "bg-card/95 border-l-4 border-double border-primary/60 backdrop-blur-sm shadow-md ml-2";
    case "audio":
    return "bg-card/95 border-l-4 border-double border-primary/60 backdrop-blur-sm shadow-md ml-2";
    default:
      return "bg-card/95 border-l-4 border-double border-primary/60 backdrop-blur-sm shadow-md ml-2";
  }
});

const getMessageIcon = (role: string): string => {
  switch (role) {
    case "user":
      return "mdi:account-tie"; // More formal
    case "sys":
      return "mdi:fountain-pen-tip"; // Writer/Thinker
    case "warn":
      return "mdi:alert-decagram";
    case "loading":
      return "mdi:loading";
    case "audio":
      return "mdi:radio"; // Old radio
    default:
      return "mdi:message-text";
  }
};

const getMessageIconClass = (role: string): string => {
  switch (role) {
    case "user":
      return "h-6 w-6 text-primary/80";
    case "sys":
      return "h-6 w-6 text-primary";
    case "warn":
      return "h-6 w-6 text-destructive";
    case "loading":
      return "h-6 w-6 text-muted-foreground animate-spin";
    case "audio":
      return "h-6 w-6 text-success";
    default:
      return "h-6 w-6 text-muted-foreground";
  }
};

const getTextClass = (role: string): string => {
  switch (role) {
    case "user":
      return "text-foreground font-serif italic";
    case "sys":
      return "text-foreground font-serif text-lg leading-7";
    case "warn":
      return "text-destructive font-bold";
    case "loading":
      return "text-muted-foreground";
    case "audio":
      return "text-success";
    default:
      return "text-foreground";
  }
};
</script>
