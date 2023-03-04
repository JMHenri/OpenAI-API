import { OpenAISubClass } from "./openai.ts";
import {
  CreateTranscriptionRequest,
  CreateTranscriptionResponse,
  CreateTranslationRequest,
  CreateTranslationResponse,
} from "./types/types.ts";

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