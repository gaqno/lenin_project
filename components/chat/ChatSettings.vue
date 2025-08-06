<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon">
        <Icon name="mdi:cog" class="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent class="z-[60]">
      <SheetHeader>
        <SheetTitle>Configurações</SheetTitle>
        <SheetDescription>
          Personalize sua experiência com LeninGPT
        </SheetDescription>
      </SheetHeader>
      <div class="space-y-6 py-4">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label>Modo Escuro</Label>
              <p class="text-sm text-muted-foreground">
                Alternar entre tema claro e escuro
              </p>
            </div>
            <Switch :checked="darkModeComputed" @update:checked="toggleDarkMode" />
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label>Resposta de Áudio</Label>
              <p class="text-sm text-muted-foreground">
                Habilitar respostas em áudio
              </p>
            </div>
            <Switch :checked="audioEnabledComputed" @update:checked="toggleAudio" />
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label>Notificações</Label>
              <p class="text-sm text-muted-foreground">
                Receber notificações de novas mensagens
              </p>
            </div>
            <Switch :checked="notificationsEnabledComputed" @update:checked="toggleNotifications" />
          </div>
        </div>

        <Separator />

        <div class="space-y-4">
          <Label>Velocidade do Áudio</Label>
          <div class="flex items-center space-x-2">
            <Button variant="outline" size="sm" @click="updateAudioSpeed(Math.max(0.5, audioSpeedComputed - 0.1))">
              -
            </Button>
            <span class="flex-1 text-center">
              {{ audioSpeedComputed }}x
            </span>
            <Button variant="outline" size="sm" @click="updateAudioSpeed(Math.min(2, audioSpeedComputed + 0.1))">
              +
            </Button>
          </div>
          <p class="text-sm text-muted-foreground">
            Velocidade: {{ audioSpeedComputed }}x
          </p>
        </div>

        <Separator />

        <div class="space-y-4">
          <Label>Idioma</Label>
          <Select :model-value="languageComputed" @update:model-value="updateLanguage">
            <SelectTrigger>
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">
                Português
              </SelectItem>
              <SelectItem value="en">
                English
              </SelectItem>
              <SelectItem value="es">
                Español
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
interface IChatSettingsProps {
  darkMode: boolean;
  audioEnabled: boolean;
  notificationsEnabled: boolean;
  audioSpeed: number;
  language: string;
}

interface IChatSettingsEmits {
  (e: "update:darkMode", value: boolean): void;
  (e: "update:audioEnabled", value: boolean): void;
  (e: "update:notificationsEnabled", value: boolean): void;
  (e: "update:audioSpeed", value: number): void;
  (e: "update:language", value: string): void;
}

const props = defineProps<IChatSettingsProps>();
const emit = defineEmits<IChatSettingsEmits>();

// Computed properties for v-model compatibility
const darkModeComputed = computed({
  get: () => props.darkMode,
  set: (value: boolean) => emit("update:darkMode", value),
});

const audioEnabledComputed = computed({
  get: () => props.audioEnabled,
  set: (value: boolean) => emit("update:audioEnabled", value),
});

const notificationsEnabledComputed = computed({
  get: () => props.notificationsEnabled,
  set: (value: boolean) => emit("update:notificationsEnabled", value),
});

const audioSpeedComputed = computed({
  get: () => props.audioSpeed,
  set: (value: number) => emit("update:audioSpeed", value),
});

const languageComputed = computed({
  get: () => props.language,
  set: (value: string) => emit("update:language", value),
});

const toggleDarkMode = (value: boolean) => {
  emit("update:darkMode", value);
};

const toggleAudio = (value: boolean) => {
  emit("update:audioEnabled", value);
};

const toggleNotifications = (value: boolean) => {
  emit("update:notificationsEnabled", value);
};

const updateAudioSpeed = (value: number) => {
  emit("update:audioSpeed", value);
};

const updateLanguage = (value: string) => {
  emit("update:language", value);
};
</script>
