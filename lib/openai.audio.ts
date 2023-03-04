import { OpenAISubClass } from "./openai.ts";

type CreateTranscriptionRequest = {
  file: string;
  model: string;
  prompt?: string;
  response_format?: string;
  temperature?: number;
  language?: string;
}

type CreateTranscriptionResponse = {
  text: string;
}

type CreateTranslationRequest = {
  file: string;
  model: string;
  prompt?: string;
  response_format?: string;
  temperature?: number;
}

type CreateTranslationResponse = {
  text: string;
}

export class OpenAIAudio extends OpenAISubClass {

  // Transcribes audio into the input language. (Audio to Text)
  async transcription(request: CreateTranscriptionRequest): Promise<CreateTranscriptionResponse> {
    return await this.post("audio/transcriptions", request);
  }

  // Translates audio into into English.
  async translation(request: CreateTranslationRequest): Promise<CreateTranslationResponse> {
    return await this.post("audio/translations", request);
  }
}