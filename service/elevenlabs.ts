import axios from "axios";

interface DTOElevenLabs {
  headers: string[];
  params: {
    [key: string]: string | number | boolean;
  }
  payload: {
    model_id: string;
    text: string;
    voice_settings: {
      [key: string]: string | number | boolean;
    }
  }
}

const callApi = async (
  method: string,
  endpoint: string,
  data?: any,
) => {
  const { public: ENV } = await useRuntimeConfig();
  axios.defaults.baseURL = ENV.ELEVENLABS_BASE_URL;
  return axios({
    method,
    url: axios.defaults.baseURL + endpoint + (data?.params ? "?" + new URLSearchParams(data.params).toString() : ""),
    data: data.payload,
    responseType: "arraybuffer",
    headers: {
      Accept: [data.headers ? data.headers : "application/json"],
      "Content-Type": "application/json",
      "xi-api-key": ENV.ELEVENLABS_TOKEN,
    },
  })
    .then((response: any) => (response.data));
};

export const getElevenLabsVoices = (params: any) => {
  return callApi("GET", "/v1/voices", { params });
};

export const postElevenLabsTextToSpeech = (body: DTOElevenLabs) => {
  return callApi("POST", "/v1/text-to-speech/AYKEwFoWrGPsngfIiI5M", {
    params: body.params,
    payload: {
      ...body.payload,
      voice_settings: {
        ...body.payload.voice_settings,
        speaker: "en-US-EmilyV3Neural",
      },
    },
    headers: body.headers,
  });
};
