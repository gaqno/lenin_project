<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="space-y-0.5">
        <Label>Autoplay de Áudio</Label>
        <p class="text-sm text-muted-foreground">
          Reproduzir áudio automaticamente quando disponível
        </p>
      </div>
      <Switch :checked="autoplay" @update:checked="$emit('update:autoplay', $event)" />
    </div>

    <div class="flex items-center justify-between">
      <div class="space-y-0.5">
        <Label>Volume Padrão</Label>
        <p class="text-sm text-muted-foreground">
          Volume inicial para novos áudios
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-sm">{{ Math.round(defaultVolume * 100) }}%</span>
        <input type="range" :min="0" :max="1" :step="0.1" :value="defaultVolume" @input="updateDefaultVolume"
          class="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="space-y-0.5">
        <Label>Velocidade Padrão</Label>
        <p class="text-sm text-muted-foreground">
          Velocidade inicial de reprodução
        </p>
      </div>
      <Select :model-value="defaultSpeed" @update:model-value="updateDefaultSpeed">
        <SelectTrigger class="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.5">0.5x</SelectItem>
          <SelectItem value="0.75">0.75x</SelectItem>
          <SelectItem value="1">1x</SelectItem>
          <SelectItem value="1.25">1.25x</SelectItem>
          <SelectItem value="1.5">1.5x</SelectItem>
          <SelectItem value="2">2x</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IAudioSettingsProps {
  autoplay: boolean;
  defaultVolume: number;
  defaultSpeed: number;
}

interface IAudioSettingsEmits {
  (e: "update:autoplay", value: boolean): void;
  (e: "update:defaultVolume", value: number): void;
  (e: "update:defaultSpeed", value: number): void;
}

const props = defineProps<IAudioSettingsProps>();
const emit = defineEmits<IAudioSettingsEmits>();

const updateDefaultVolume = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const volume = parseFloat(target.value);
  emit("update:defaultVolume", volume);
};

const updateDefaultSpeed = (value: any) => {
  if (value && typeof value === 'string') {
    emit("update:defaultSpeed", parseFloat(value));
  }
};
</script>