// Global audio manager
const globalAudioElements = ref<Set<HTMLAudioElement>>(new Set());
const currentPlayingAudio = ref<HTMLAudioElement | null>(null);

export const useAudioManager = () => {
  const registerAudio = (audioElement: HTMLAudioElement) => {
    globalAudioElements.value.add(audioElement);
  };

  const unregisterAudio = (audioElement: HTMLAudioElement) => {
    globalAudioElements.value.delete(audioElement);
    if (currentPlayingAudio.value === audioElement) {
      currentPlayingAudio.value = null;
    }
  };

  const pauseAllOtherAudios = (currentAudio: HTMLAudioElement) => {
    globalAudioElements.value.forEach((audio) => {
      if (audio !== currentAudio && !audio.paused) {
        audio.pause();
      }
    });
    currentPlayingAudio.value = currentAudio;
  };

  const pauseAllAudios = () => {
    globalAudioElements.value.forEach((audio) => {
      if (!audio.paused) {
        audio.pause();
      }
    });
    currentPlayingAudio.value = null;
  };

  const getCurrentPlayingAudio = () => currentPlayingAudio.value;

  return {
    registerAudio,
    unregisterAudio,
    pauseAllOtherAudios,
    pauseAllAudios,
    getCurrentPlayingAudio,
  };
};
