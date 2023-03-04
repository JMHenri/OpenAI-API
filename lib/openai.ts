import { OpenAIAudio } from "./openai.audio.ts";
import { OpenAIChat } from "./openai.chat.ts";
import { OpenAIEmbedding } from "./openai.embedding.ts";
import { OpenAIFiles } from "./openai.files.ts";
import { OpenAIFineTune } from "./openai.fineTune.ts";
import { OpenAIImage } from "./openai.image.ts";
import { OpenAIModels } from "./openai.models.ts";
import { OpenAIModeration } from "./openai.moderation.ts";
import { OpenAIText } from "./openai.text.ts";

export class OpenAI {
  public readonly image: OpenAIImage;
  public readonly audio: OpenAIAudio;
  public readonly files: OpenAIFiles;
  public readonly fineTune: OpenAIFineTune;
  public readonly models: OpenAIModels;
  public readonly text: OpenAIText;
  public readonly chat: OpenAIChat;
  public readonly embedding: OpenAIEmbedding;
  public readonly moderation: OpenAIModeration;
  
  // Authentication
  constructor(apiKey: string) {
    this.image = new OpenAIImage(apiKey);
    this.audio = new OpenAIAudio(apiKey);
    this.files = new OpenAIFiles(apiKey);
    this.fineTune = new OpenAIFineTune(apiKey);
    this.models = new OpenAIModels(apiKey);
    this.text = new OpenAIText(apiKey);
    this.chat = new OpenAIChat(apiKey);
    this.embedding = new OpenAIEmbedding(apiKey);
    this.moderation = new OpenAIModeration(apiKey);
  }
}

export class OpenAISubClass {
  protected apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async post<T>(url: string, request: unknown): Promise<T> {
    const response = await fetch(`https://api.openai.com/v1/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }
  
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`https://api.openai.com/v1/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
}