
import {
  AvailableModels,
  AvailableChatModels,
  ListModelsResponse,
  RetrieveModelResponse,
} from "./types/types.ts";

export class OpenAIModels {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async list(): Promise<ListModelsResponse> {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
  
  async retrieve(modelId: AvailableModels | AvailableChatModels): Promise<RetrieveModelResponse> {
    const response = await fetch(`https://api.openai.com/v1/models/${modelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
}