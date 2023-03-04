import { OpenAISubClass } from "./openai.ts";

type CreateEmbeddingRequest = {
  model: string,
  input: string | string[],
  user: string,
}

type CreateEmbeddingsResponse = {
  object: string;
  data: {
    object: string;
    embedding: number[];
    index: number;
  }[];
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

export class OpenAIEmbedding extends OpenAISubClass {

  // Creates an embedding vector representing the input text.
  async create(request: CreateEmbeddingRequest): Promise<CreateEmbeddingsResponse> {
    return await this.post<CreateEmbeddingsResponse>("embeddings", request);
  }
}