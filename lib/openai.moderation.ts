import { OpenAISubClass } from "./openai.ts";

type ModerationRequest = {
  input: string;
}

type ModerationResponse = {
  id: string;
  model: string;
  results: Result[];
}

type Result = {
  categories: ModerationCategories;
  category_scores: ModerationCategoryScores;
  flagged: boolean;
}

type ModerationCategories = {
  hate: boolean;
  "hate/threatening": boolean;
  "self-harm": boolean;
  sexual: boolean;
  "sexual/minors": boolean;
  violence: boolean;
  "violence/graphic": boolean;
}

type ModerationCategoryScores = {
  hate: number;
  "hate/threatening": number;
  "self-harm": number;
  sexual: number;
  "sexual/minors": number;
  violence: number;
  "violence/graphic": number;
}

export class OpenAIModeration extends OpenAISubClass {

  // Classifies if text violates OpenAI's Content Policy
  async check(request: ModerationRequest): Promise<ModerationResponse> {
    return await this.post<ModerationResponse>("moderations", request);
  }
}