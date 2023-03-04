import { OpenAISubClass } from "./openai.ts";

export type AvailableModels = "ada" | "babbage" | "curie" | "davinci";
export type AvailableChatModels = "gpt-3.5-turbo";

type Model = {
  id: string;
  object: string;
  owned_by: string;
  permission: string[];
}

type ListModelsResponse = {
  data: Model[];
  object: string;
}

type RetrieveModelResponse = {
  id: string;
  object: string;
  owned_by: string;
  permission: string[];
}

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