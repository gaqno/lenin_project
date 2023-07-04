import { describe, expect, it, vi } from "vitest";
import { useChatCompletion } from "../service/openai";

vi.mock("#imports", () => {
  return {
    useRuntimeConfig () {
      return {
        public: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY,
          OPENAI_CONTEXT: process.env.OPENAI_CONTEXT,
        },
      };
    },
  };
});

describe("useChatCompletion", () => {
  it("should return a response from OpenAI API", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(response).toBeTruthy();
  });

  it("should return a response that is not empty", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(response).not.toBe("");
  });

  it("should return a response that is a string", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(typeof response).toBe("string");
  });

  it("should return a response that is different from the input question", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(response).not.toBe(question);
  });
});
