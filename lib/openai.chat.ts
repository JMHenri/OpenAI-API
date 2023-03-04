import { OpenAISubClass } from "./openai.ts";
import {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from "./types/types.ts";

export class OpenAIChat extends OpenAISubClass {

  // Given a chat conversation, the model will return a chat completion response.
  async complete(request: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
    return await this.post("chat/completions", request);
  }
}