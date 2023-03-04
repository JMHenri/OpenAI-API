import { OpenAISubClass } from "./openai.ts";
import {
  ModerationRequest,
  ModerationResponse,
} from "./types/types.ts";

export class OpenAIModeration extends OpenAISubClass {

  // Classifies if text violates OpenAI's Content Policy
  async check(request: ModerationRequest): Promise<ModerationResponse> {
    return await this.post("moderations", request);
  }
}