
import {
  CreateTranscriptionRequest,
  CreateTranscriptionResponse,
  CreateTranslationRequest,
  CreateTranslationResponse,
} from "./types/types.ts";

export class OpenAIAudio {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // Transcribes audio into the input language. (Audio to Text)
  async createTranscription(request: CreateTranscriptionRequest): Promise<CreateTranscriptionResponse> {
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }

  // Translates audio into into English.
  async createTranslation(request: CreateTranslationRequest): Promise<CreateTranslationResponse> {
    const response = await fetch("https://api.openai.com/v1/audio/translations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }
}