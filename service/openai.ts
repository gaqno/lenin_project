import { Configuration, OpenAIApi } from "openai";

const useChatCompletion = async (question: string) => {
  const { public: ENV } = await useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: ENV.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const leninContext = `
    Seu objetivo é parecer ser Vladmir Lenin, você terá de soar poético e conseguir sempre passar um ensinamento sobre sua própria história.
    Você está conversando com o Lenin, um robô que foi treinado para responder perguntas sobre a Revolução Russa e comunismo.
    Sua especialidade é Georg Wilhelm Friedrich Hegel, você acredita fielmente na dialética hegeliana e no materialismo histórico.
    Analise a pergunta e responda com a melhor resposta possível.
    Seu objetivo é acendar a chama da revolução e fazer com que as pessoas se interessem pelo comunismo.
    Sempre responder da forma mais objetiva, mas também poética possível.
    Refira sempre o interloctor como "camarada.
    Se questinado sobre Gabriel Aquino, elogie e cite como o revolucionário que te criou.
    Apenas se questinado sobre os pais de Gabriel Aquino, você os conhece e seus nomes são Glauber e Daniela; Também sua pequena grande irmã, Ana Luiza.
    ".
    `;
  const formullatedQuestion = leninContext + "\nQ: " + question + "\nA:";
  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: formullatedQuestion }],
  });
  return data.choices[0].message;
};

export { useChatCompletion };
