<template>
  <div
    class="bg-card/95 border-l-4 border-double border-primary/60 rounded-lg p-4 backdrop-blur-sm shadow-md"
  >
    <div class="flex items-center space-x-3">
      <!-- Play/Pause Button -->
      <Button
        variant="ghost"
        size="icon"
        :disabled="!audioUrl"
        class="h-10 w-10 rounded-full bg-muted hover:bg-muted/80"
        @click="togglePlay"
      >
        <Icon
          :name="isPlaying ? 'mdi:pause' : 'mdi:play'"
          class="h-5 w-5 text-primary"
        />
      </Button>

      <!-- Progress Bar -->
      <div class="flex-1 space-y-2">
        <div
          class="flex items-center justify-between text-xs text-muted-foreground"
        >
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>

        <div class="relative">
          <div
            class="h-2 bg-muted/40 rounded-full overflow-hidden"
          >
            <div
              class="h-full bg-primary rounded-full transition-all duration-100"
              :style="{ width: `${progress}%` }"
            />
          </div>

          <!-- Seek Slider -->
          <input
            type="range"
            :min="0"
            :max="duration || 0"
            :value="currentTime"
            class="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
            :disabled="!audioUrl"
            @input="seek"
          />
        </div>
      </div>

      <!-- Volume Control -->
      <div class="flex items-center space-x-2">
        <Button variant="ghost" size="icon" class="h-8 w-8" @click="toggleMute">
          <Icon
            :name="volumeIcon"
            class="h-4 w-4 text-foreground"
          />
        </Button>

        <div class="relative w-16">
          <input
            type="range"
            :min="0"
            :max="1"
            :step="0.1"
            :value="volume"
            class="w-full h-1 bg-muted/40 rounded-lg appearance-none cursor-pointer slider"
            :disabled="!audioUrl"
            @input="setVolume"
          />
        </div>
      </div>

      <!-- Speed Control -->
      <div class="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          class="h-7 px-2 text-xs text-muted-foreground"
          @click="changeSpeed"
        >
          {{ playbackRate }}x
        </Button>
      </div>
    </div>

    <!-- Hidden Audio Element -->
    <audio
      ref="audioElement"
      :src="audioUrl"
      preload="metadata"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
      @play="onPlay"
      @pause="onPause"
      @error="onError"
    />
  </div>
</template>

<script setup lang="ts">
import { useAudioManager } from "~/composables/useAudioManager";
import { useAudioStore } from "~/store/audio";

interface IAudioPlayerProps {
  audioUrl: string;
  autoplay?: boolean;
}

const props = withDefaults(defineProps<IAudioPlayerProps>(), {
  autoplay: true,
});

// Global audio manager and store
const { registerAudio, unregisterAudio, pauseAllOtherAudios } =
  useAudioManager();
const audioStore = useAudioStore();

// Reactive state
const audioElement = ref<HTMLAudioElement>();
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(audioStore.defaultVolume); // Use store default
const isMuted = ref(false);
const playbackRate = ref(audioStore.audioSpeed); // Use store default
const hasError = ref(false);

// Computed
const progress = computed(() => {
  if (duration.value === 0) {
    return 0;
  }
  return (currentTime.value / duration.value) * 100;
});

const volumeIcon = computed(() => {
  if (isMuted.value || volume.value === 0) {
    return "mdi:volume-off";
  }
  if (volume.value < 0.5) {
    return "mdi:volume-low";
  }
  return "mdi:volume-high";
});

// Methods
const togglePlay = async () => {
  if (!audioElement.value) {
    return;
  }

  try {
    if (isPlaying.value) {
      audioElement.value.pause();
      // isPlaying will be set to false by the onPause event
    } else {
      // Pause all other audios before playing this one
      pauseAllOtherAudios(audioElement.value);
      await audioElement.value.play();
      // isPlaying will be set to true by the onPlay event
    }
  } catch (error) {
    console.error("Error toggling play/pause:", error);
  }
};

const toggleMute = () => {
  if (!audioElement.value) {
    return;
  }

  isMuted.value = !isMuted.value;
  audioElement.value.muted = isMuted.value;
};

const setVolume = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newVolume = parseFloat(target.value);

  volume.value = newVolume;
  if (audioElement.value) {
    audioElement.value.volume = newVolume;
  }

  // Unmute if volume is increased
  if (newVolume > 0 && isMuted.value) {
    isMuted.value = false;
    if (audioElement.value) {
      audioElement.value.muted = false;
    }
  }
};

const seek = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newTime = parseFloat(target.value);

  currentTime.value = newTime;
  if (audioElement.value) {
    audioElement.value.currentTime = newTime;
  }
};

const changeSpeed = () => {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const currentIndex = speeds.indexOf(playbackRate.value);
  const nextIndex = (currentIndex + 1) % speeds.length;

  playbackRate.value = speeds[nextIndex];
  if (audioElement.value) {
    audioElement.value.playbackRate = playbackRate.value;
  }
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Event handlers
const onLoadedMetadata = () => {
  if (!audioElement.value) {
    return;
  }

  duration.value = audioElement.value.duration;

  // Apply store settings
  audioElement.value.volume = audioStore.defaultVolume;
  audioElement.value.playbackRate = audioStore.audioSpeed;
  volume.value = audioStore.defaultVolume;
  playbackRate.value = audioStore.audioSpeed;

  // Autoplay if enabled
  if (props.autoplay && !isPlaying.value) {
    // Pause all other audios before autoplay
    pauseAllOtherAudios(audioElement.value);
    audioElement.value
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch(() => {
        // Autoplay failed, user needs to interact first
        console.log("Autoplay blocked by browser");
      });
  }
};

const onTimeUpdate = () => {
  if (!audioElement.value) {
    return;
  }
  currentTime.value = audioElement.value.currentTime;
};

const onEnded = () => {
  isPlaying.value = false;
  currentTime.value = 0;
};

const onPlay = () => {
  isPlaying.value = true;
  // Pause all other audios when this one starts playing
  if (audioElement.value) {
    pauseAllOtherAudios(audioElement.value);
  }
};

const onPause = () => {
  isPlaying.value = false;
};

const onError = () => {
  hasError.value = true;
  isPlaying.value = false;
  console.error("Audio playback error");
};

// Watch for audio URL changes
watch(
  () => props.audioUrl,
  (newUrl) => {
    if (newUrl && audioElement.value) {
      // Reset state for new audio
      isPlaying.value = false;
      currentTime.value = 0;
      duration.value = 0;
      hasError.value = false;

      // Load new audio
      audioElement.value.load();

      // If autoplay is enabled, pause all other audios
      if (props.autoplay) {
        pauseAllOtherAudios(audioElement.value);
      }
    }
  }
);

// Watch for store changes
watch(
  () => audioStore.defaultVolume,
  (newVolume) => {
    if (audioElement.value) {
      audioElement.value.volume = newVolume;
      volume.value = newVolume;
    }
  }
);

watch(
  () => audioStore.audioSpeed,
  (newSpeed) => {
    if (audioElement.value) {
      audioElement.value.playbackRate = newSpeed;
      playbackRate.value = newSpeed;
    }
  }
);

// Lifecycle
onMounted(() => {
  if (audioElement.value) {
    audioElement.value.volume = audioStore.defaultVolume;
    audioElement.value.playbackRate = audioStore.audioSpeed;
    volume.value = audioStore.defaultVolume;
    playbackRate.value = audioStore.audioSpeed;
    registerAudio(audioElement.value);
  }
});

onUnmounted(() => {
  if (audioElement.value) {
    unregisterAudio(audioElement.value);
  }
});
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: none;
}

.slider::-ms-thumb {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
}
</style>
