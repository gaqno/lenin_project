import { useUserMetrics } from "~/composables/useUserMetrics";
import { LENIN_CONTEXT } from "./lenin-context";

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

const useChatCompletion = async (question: string) => {
  const { setMetricsHeaders } = useUserMetrics();
  const headers = setMetricsHeaders();
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<OpenAIResponse>("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${config.public.OPENAI_API_KEY}`,
        'content-type': 'application/json',
        'x-user-timezone': headers.get('x-user-timezone') || '',
        'x-user-language': headers.get('x-user-language') || '',
      },
      body: {
        model: "gpt-4o",
        temperature: 0.5,
        max_tokens: 150,
        user: "Lenin",
        messages: [
          {
            role: "user",
            content: `${LENIN_CONTEXT}

Pergunta: ${question}
Resposta:`
          }
        ]
      },
    });

    // Return in the expected format for the application
    return {
      message: {
        content: response.choices[0].message.content,
        role: response.choices[0].message.role
      }
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Falha ao processar sua pergunta. Tente novamente.');
  }
};

export { useChatCompletion };
