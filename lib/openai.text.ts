
import {
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateEditRequest,
  CreateEditResponse,
} from "./types/types.ts";

export class OpenAIText {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // Given a prompt, the model will return one or more predicted completions.
  // Can also return the probabilities of alternative tokens at each position.
  async complete(request: CreateCompletionRequest): Promise<CreateCompletionResponse> {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }

  // Creates a new edit for the provided input, instruction, and parameters.
  async edit(request: CreateEditRequest): Promise<CreateEditResponse> {
    const response = await fetch("https://api.openai.com/v1/edits", {
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