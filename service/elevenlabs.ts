import { getApiUrl } from "~/lib/api-config";

export interface IDTOElevenLabs {
  headers?: string[];
  params?: Record<string, string | number | boolean>;
  payload: {
    model_id: string;
    text: string;
    voice_settings: Record<string, string | number | boolean>;
  };
}

export const postElevenLabsTextToSpeech = async (
  body: IDTOElevenLabs,
): Promise<ArrayBuffer> => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/elevenlabs/text-to-speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Erro ao gerar áudio" }));
    const error = new Error(errorData.message || "Erro ao gerar áudio") as Error & { statusCode?: number };
    error.statusCode = response.status;
    throw error;
  }

  return response.arrayBuffer();
};


