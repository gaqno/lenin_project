import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("useChatCompletion", () => {
  it("should have the service file", () => {
    const servicePath = path.join(__dirname, "../service/openai.ts");
    expect(fs.existsSync(servicePath)).toBe(true);
  });

  it("should have the correct file structure", () => {
    const servicePath = path.join(__dirname, "../service/openai.ts");
    const content = fs.readFileSync(servicePath, "utf-8");

    // Check for key elements in the file
    expect(content).toContain("useChatCompletion");
    expect(content).toContain("export { useChatCompletion }");
    expect(content).toContain("https://api.openai.com/v1/chat/completions");
    expect(content).toContain("Vladimir Ilyich Lenin");
  });
});
