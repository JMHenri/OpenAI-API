import { OpenAISubClass } from "./openai.ts";
import {
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateEditRequest,
  CreateEditResponse,
} from "./types/types.ts";

export class OpenAIText extends OpenAISubClass {

  // Given a prompt, the model will return one or more predicted completions.
  // Can also return the probabilities of alternative tokens at each position.
  async complete(request: CreateCompletionRequest): Promise<CreateCompletionResponse> {
    return await this.post("completions", request);
  }

  // Creates a new edit for the provided input, instruction, and parameters.
  async edit(request: CreateEditRequest): Promise<CreateEditResponse> {
    return await this.post("edits", request);
  }
}