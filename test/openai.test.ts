import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

describe("useChatCompletion", () => {
  it("should have the ai-provider service file", () => {
    const servicePath = path.join(__dirname, "../service/ai-provider.ts");
    expect(fs.existsSync(servicePath)).toBe(true);
  });


  it("should have the correct file structure in ai-provider", () => {
    const servicePath = path.join(__dirname, "../service/ai-provider.ts");
    const content = fs.readFileSync(servicePath, "utf-8");

    expect(content).toContain("useChatCompletion");
    expect(content).toContain("export { useChatCompletion }");
    expect(content).toContain("fetch");
    expect(content).toContain("/ai/chat");
    expect(content).toContain("NUXT_PUBLIC_API_URL");
    expect(content).toContain("http://localhost:3001");
  });
});
