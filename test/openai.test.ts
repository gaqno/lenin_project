import { describe, expect, it, vi } from "vitest";
import { useChatCompletion } from "../service/openai";

// Mock the OpenAI API
vi.mock("openai", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: "Mocked response from Lenin",
                  role: "assistant",
                },
              },
            ],
          }),
        },
      },
    })),
  };
});

// Mock the Nuxt composables
vi.mock("#imports", () => {
  return {
    useRuntimeConfig: vi.fn().mockResolvedValue({
      public: {
        OPENAI_API_KEY: "test-api-key",
        OPENAI_CONTEXT: "test-context",
      },
    }),
  };
});

describe("useChatCompletion", () => {
  it("should return a response from OpenAI API", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(response).toBeTruthy();
    expect(response.message).toBeDefined();
  });

  it("should return a response that is not empty", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(response.message?.content).not.toBe("");
  });

  it("should return a response that is a string", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(typeof response.message?.content).toBe("string");
  });

  it("should return a response that is different from the input question", async () => {
    const question = "What is the meaning of life?";
    const response = await useChatCompletion(question);
    expect(response.message?.content).not.toBe(question);
  });
});
