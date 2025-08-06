import { useUserMetrics } from "~/composables/useUserMetrics";

const useChatCompletion = async (question: string) => {
  const { setMetricsHeaders } = useUserMetrics();
  const headers = setMetricsHeaders();

  const response = await $fetch("/api/chat", {
    method: "POST",
    body: {
      question,
    },
    headers: {
      'x-user-timezone': headers.get('x-user-timezone') || '',
      'x-user-language': headers.get('x-user-language') || '',
    },
  });

  return response;
};

export { useChatCompletion };
