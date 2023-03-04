import { OpenAISubClass } from "./openai.ts";
import { Choice, Usage } from "./openai.text.ts";

type CreateChatCompletionRequest = {
  model: string;
  messages: string[];
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  logprobs: null;
  stop: string;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  logit_bias: {};
  user: string;
}

type CreateChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  choices: Choice[];
  usage: Usage;
}

export class OpenAIChat extends OpenAISubClass {

  // Given a chat conversation, the model will return a chat completion response.
  async complete(request: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
    return await this.post<CreateChatCompletionResponse>("chat/completions", request);
  }
}