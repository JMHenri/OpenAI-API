import { OpenAISubClass } from "./openai.ts";
import {
  ModerationRequest,
  ModerationResponse,
} from "./types/types.ts";

export class OpenAIModeration extends OpenAISubClass {

  // Classifies if text violates OpenAI's Content Policy
  async check(request: ModerationRequest): Promise<ModerationResponse> {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }
}