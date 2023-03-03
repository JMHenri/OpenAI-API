
import {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from "./types/types.ts";

export class OpenAIChat {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // Given a chat conversation, the model will return a chat completion response.
  async complete(request: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
    const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
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