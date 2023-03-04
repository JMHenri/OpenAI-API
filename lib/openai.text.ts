import { OpenAISubClass } from "./openai.ts";

export type Choice = {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}

export type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

type CreateCompletionRequest = {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  logprobs: null;
  stop: string;
}

type CreateCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
}

// Text Edits
type CreateEditRequest = {
  model: string;
  input: string;
  instruction: string;
  n: number;
  temperature: number;
  top_p: number;
}  

type CreateEditResponse = {
  object: string;
  created: number;
  choices: EditChoice[];
  usage: Usage;
}

type EditChoice = {
  text: string;
  index: number;
}

export class OpenAIText extends OpenAISubClass {

  // Given a prompt, the model will return one or more predicted completions.
  // Can also return the probabilities of alternative tokens at each position.
  async complete(request: CreateCompletionRequest): Promise<CreateCompletionResponse> {
    return await this.post<CreateCompletionResponse>("completions", request);
  }

  // Creates a new edit for the provided input, instruction, and parameters.
  async edit(request: CreateEditRequest): Promise<CreateEditResponse> {
    return await this.post<CreateEditResponse>("edits", request);
  }
}