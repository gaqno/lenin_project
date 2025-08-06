<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="generate-audio">Gerar Áudio</Label>
      <div class="flex items-center space-x-2">
        <Switch
          id="generate-audio"
          :model-value="audioStore.generateAudio"
          @update:model-value="audioStore.updateGenerateAudio"
        />
        <Label for="generate-audio" class="text-sm font-normal">
          Gerar áudio das respostas automaticamente
        </Label>
      </div>
    </div>

    <div v-if="audioStore.generateAudio" class="space-y-4">
      <div class="space-y-2">
        <Label for="autoplay-audio">Autoplay</Label>
        <div class="flex items-center space-x-2">
          <Switch
            id="autoplay-audio"
            :model-value="audioStore.autoplayAudio"
            @update:model-value="audioStore.updateAutoplayAudio"
          />
          <Label for="autoplay-audio" class="text-sm font-normal">
            Reproduzir áudio automaticamente
          </Label>
        </div>
      </div>

      <div class="space-y-2">
        <Label for="default-volume">Volume Padrão</Label>
        <div class="flex items-center space-x-2">
          <Slider
            id="default-volume"
            :model-value="[audioStore.defaultVolume]"
            :min="0"
            :max="1"
            :step="0.1"
            class="flex-1"
            @update:model-value="(value: number[] | undefined) => audioStore.updateDefaultVolume(value?.[0] || 0.8)"
          />
          <span class="text-sm text-muted-foreground w-12 text-right">
            {{ Math.round(audioStore.defaultVolume * 100) }}%
          </span>
        </div>
      </div>

      <div class="space-y-2">
        <Label for="audio-speed">Velocidade de Reprodução</Label>
        <div class="flex items-center space-x-2">
          <Slider
            id="audio-speed"
            :model-value="[audioStore.audioSpeed]"
            :min="0.5"
            :max="2"
            :step="0.1"
            class="flex-1"
            @update:model-value="(value: number[] | undefined) => audioStore.updateAudioSpeed(value?.[0] || 1.0)"
          />
          <span class="text-sm text-muted-foreground w-12 text-right">
            {{ audioStore.audioSpeed }}x
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudioStore } from "~/store/audio";
import Switch from "~/components/ui/switch/Switch.vue";
import Slider from "~/components/ui/slider/Slider.vue";
import Label from "~/components/ui/label/Label.vue";

const audioStore = useAudioStore();
</script>
