import axios from "axios";

export interface IDTOElevenLabs {
  headers?: string[];
  params?: Record<string, string | number | boolean>;
  payload: {
    model_id: string;
    text: string;
    voice_settings: Record<string, string | number | boolean>;
  };
}

const callApi = async (
  method: string,
  endpoint: string,
  data?: Partial<IDTOElevenLabs>,
) => {
  const { public: ENV } = await useRuntimeConfig();
  axios.defaults.baseURL = ENV.ELEVENLABS_BASE_URL;
  
  try {
    const response = await axios({
      method,
      url:
        axios.defaults.baseURL +
        endpoint +
        (data?.params ? "?" + new URLSearchParams(data.params as Record<string, string>).toString() : ""),
      data: data?.payload,
      responseType: "arraybuffer",
      headers: {
        Accept: data?.headers ? data.headers : "application/json",
        "Content-Type": "application/json",
        "xi-api-key": ENV.ELEVENLABS_TOKEN,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      let errorMessage = 'Falha ao gerar áudio. Tente novamente.';
      
      if (statusCode === 429) {
        errorMessage = 'Muitas requisições de áudio. Por favor, aguarde alguns momentos.';
      } else if (statusCode === 401) {
        errorMessage = 'Erro de autenticação no serviço de áudio.';
      } else if (statusCode === 500) {
        errorMessage = 'Erro interno no serviço de áudio. Tente novamente mais tarde.';
      }
      
      const apiError = new Error(errorMessage) as Error & { statusCode?: number };
      apiError.statusCode = statusCode;
      throw apiError;
    }
    throw error;
  }
};

export const getElevenLabsVoices = (params?: Record<string, string | number | boolean>) => {
  return callApi("GET", "/v1/voices", { params });
};

export const postElevenLabsTextToSpeech = async (body: IDTOElevenLabs) => {
  const { public: ENV } = await useRuntimeConfig();
  const voiceId = ENV.ELEVENLABS_VOICE_ID;
  if (!voiceId) {
    throw new Error("ELEVENLABS_VOICE_ID is not defined in runtime config.");
  }
  return callApi("POST", `/v1/text-to-speech/${voiceId}`, {
    params: body.params,
    payload: {
      ...body.payload,
      voice_settings: {
        ...body.payload.voice_settings,
      },
    },
    headers: body.headers,
  });
};
