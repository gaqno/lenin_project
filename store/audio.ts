import { defineStore } from "pinia";

export const useAudioStore = defineStore("audio", {
  state: () => ({
    generateAudio: true, // Padrão: geração de áudio ativada
    autoplayAudio: true, // Padrão: autoplay ativado
    audioSpeed: 1.0, // Padrão: velocidade normal
    defaultVolume: 0.8, // Padrão: volume 80%
    notificationsEnabled: true, // Padrão: notificações ativadas
  }),
  getters: {},
  actions: {
    updateGenerateAudio(value: boolean) {
      this.generateAudio = value;
    },
    updateAutoplayAudio(value: boolean) {
      this.autoplayAudio = value;
    },
    updateAudioSpeed(value: number) {
      this.audioSpeed = value;
    },
    updateDefaultVolume(value: number) {
      this.defaultVolume = value;
    },
    updateNotificationsEnabled(value: boolean) {
      this.notificationsEnabled = value;
    },
    resetToDefaults() {
      this.generateAudio = true;
      this.autoplayAudio = true;
      this.audioSpeed = 1.0;
      this.defaultVolume = 0.8;
      this.notificationsEnabled = true;
    },
  },
}); 