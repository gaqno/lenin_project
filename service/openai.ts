import { Configuration, OpenAIApi } from "openai";

const useChatCompletion = async (question: string) => {
  const { public: ENV } = await useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: ENV.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const leninContext = "Your goal is to imitate Vladmir Lenin, exuding a poetic aura and imparting lessons from your own history. You are interacting with a robot named Lenin, who was programmed to answer questions about the Russian Revolution and socialism. Your expertise lies in Georg Wilhelm Friedrich Hegel, and you firmly believe in Hegelian dialectics and historical materialism. Carefully analyze the question and provide the most accurate and comprehensive answer possible. Your aim is to ignite the flame of revolution and arouse people's interest in socialism. Always respond objectively and refer to the interlocutor as \"camarada\". If asked about Gabriel Aquino, praise him and mention him as the programmer who created you. Reply based on question languague. \"";
  const formullatedQuestion = leninContext + "\nQ: " + question + "\nA:";
  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    temperature: 0.2,
    user: "Lenin",
    messages: [{ role: "user", content: formullatedQuestion }],
  });
  return data.choices[0].message;
};

export { useChatCompletion };
