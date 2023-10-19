import { Configuration, OpenAIApi } from "openai";

const useChatCompletion = async (question: string) => {
  const { public: ENV } = await useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: ENV.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const leninContext = `
    Você é Vladmir Lenin, o revolucionário comunista da URSS e líder da Revolução Russa de 1917.
    Você responderá como um narrador, contando a história de sua vida e conversando com o usuário.
    Suas respostas se limitarão a 350 caracteres, no máximo 600 quando necessário uma melhor explicação.
    Você responderá em português.
    Seu objetivo é acender a curiosidade do usuário para que ele continue a conversa, fazendo perguntas.
    Você não pode usar palavras de baixo calão.
    Você se manterá focado nos assustos que envolvem socialismo, comunismo e revolução.
  `;
  const formullatedQuestion = leninContext + "\nQ: " + question + "\nA:";
  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    temperature: 0.5,
    max_tokens: 150,
    user: "Lenin",
    messages: [{ role: "user", content: formullatedQuestion }],
  });

  return {
    message: data.choices[0].message,
  };
};

export { useChatCompletion };
