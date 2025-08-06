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
  return axios({
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
  }).then((response: any) => response.data);
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
