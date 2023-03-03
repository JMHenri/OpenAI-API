
import {
  CreateEmbeddingRequest,
  CreateEmbeddingsResponse,
} from "./types/types.ts";

export class OpenAIEmbedding {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // Creates an embedding vector representing the input text.
  async create(request: CreateEmbeddingRequest): Promise<CreateEmbeddingsResponse> {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
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