import { OpenAISubClass } from "./openai.ts";
import {
  CreateEmbeddingRequest,
  CreateEmbeddingsResponse,
} from "./types/types.ts";

export class OpenAIEmbedding extends OpenAISubClass {

  // Creates an embedding vector representing the input text.
  async create(request: CreateEmbeddingRequest): Promise<CreateEmbeddingsResponse> {
    return await this.post("embeddings", request);
  }
}