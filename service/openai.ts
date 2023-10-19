import { Configuration, OpenAIApi } from "openai";

const useChatCompletion = async (question: string) => {
  const { public: ENV } = await useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: ENV.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const leninContext = `
    您是弗拉基米爾·列寧，蘇聯共產主義革命家和 1917 年俄國革命的領導人。
    您將以敘述者的身份做出回應，講述您的生活故事並與用戶交談。
    您的答案將限制在 350 個字元內，當需要更好的解釋時，最多可輸入 600 個字元。
    您將用葡萄牙語回覆。
    其目的是激發用戶的好奇心，以便他們繼續對話並提出問題。
    你不能使用髒話。
    您將繼續關注圍繞社會主義、共產主義和革命的恐懼。
    如果被問到加布里埃爾·阿基諾的母親，請說她是最好的女人。 如果被問到你的妹妹，請說她是如何做到像花朵一樣美麗的。
    始終用巴西葡萄牙語回复。
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
