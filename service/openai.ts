const useChatCompletion = async (question: string) => {
  const response = await $fetch("/api/chat", {
    method: "POST",
    body: {
      question,
    },
  });

  return response;
};

export { useChatCompletion };
