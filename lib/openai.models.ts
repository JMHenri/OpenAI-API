import { OpenAISubClass } from "./openai.ts";
import {
  AvailableModels,
  AvailableChatModels,
  ListModelsResponse,
  RetrieveModelResponse,
} from "./types/types.ts";

export class OpenAIModels extends OpenAISubClass {

  // Lists the currently available models, and provides basic information about each one such as the owner and availability.
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
  
  // Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
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