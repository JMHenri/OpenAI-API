/*
This file is part of the OpenAI API Deno Client library.
  1. Authentication (done)
2. Models
  2.1 ListModels (done)
  2.2 RetrieveModel (done)
3. Completions
  3.1 CreateCompletion (done)
4. Chat
  4.1 CreateChatCompletion (done)
5. Edits
  5.1 CreateEdit (done)
6. Images
  6.1 CreateImage (done)
  6.2 CreateImageEdit (done)
  6.3 CreateImageVariation (done)
7. Embeddings
  7.1 CreateEmbedding (done)
8. Audio
  8.1 CreateTranscription (done)
  8.2 CreateTranslation (done)
9. Files
  9.1 ListFiles (done)
  9.2 UploadFile (done)
  9.3 Delete file
  9.4 Retrieve file
  9.5 Retrieve file content
10. Fine-tunes
  10.1 Create fine-tune
  10.2 List fine-tunes
  10.3 Retrieve fine-tune
  10.4 Cancel fine-tune
  10.5 List fine-tune events
  10.6 Delete fine-tune model
11. Moderations
  11.1 Create moderation
*/
import {
  AvailableModels,
  AvailableChatModels,
  Data,
  Choice,
  Model,
  ListModelsResponse,
  RetrieveModelResponse,
  Usage,
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateEditRequest,
  CreateEditResponse,
  EditChoice,
  ModerationRequest,
  ModerationResponse,
  Result,
  Categories,
  CategoryScores,
  ImageRequest,
  ImageEditRequest,
  ImageVariationRequest,
  ImageEditResponse,
  ImageResponse,
  CreateEmbeddingRequest,
  CreateEmbeddingsResponse,
  CreateTranscriptionRequest,
  CreateTranscriptionResponse,
  CreateTranslationRequest,
  CreateTranslationResponse,
  ListFilesResponse,
  UploadFileRequest,
  UploadFileResponse,
  DeleteFileRequest,
  DeleteFileResponse,
  RetrieveFileRequest,
  RetrieveFileResponse,
  RetrieveFileContentRequest,
  CreateFineTuneRequest,
  CreateFineTuneResponse,
  ListFineTunesResponse,
  RetrieveFineTuneResponse,
  CancelFineTuneRequest,
  CancelFineTuneResponse,
  ListFineTuneEventsRequest,
  ListFineTuneEventsResponse,
  DeleteFineTuneResponse,
  CreateModerationRequest,
  CreateModerationResponse,
} from "./types/types";


export class OpenAI {
  private apiKey: string;
  
  // Authentication
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Models
  // List models
  async listModels(): Promise<ListModelsResponse> {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
  // Retrieve a model
  async retrieveModel(modelId: AvailableModels | AvailableChatModels): Promise<RetrieveModelResponse> {
    const response = await fetch(`https://api.openai.com/v1/models/${modelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }



  // Completions
  async createCompletion(request: CreateCompletionRequest): Promise<CreateCompletionResponse> {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }


  // Chat
  async createChatCompletion(request: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
    const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }

  // Edits
  // Create an edit
  async createEdit(request: CreateEditRequest): Promise<CreateEditResponse> {
    const response = await fetch("https://api.openai.com/v1/edits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }



  // Images
  // Create an image
  async createImage(request: ImageRequest): Promise<ImageResponse> {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }

  // Create image edit
  async createImageEdit(request: ImageEditRequest): Promise<ImageResponse> {
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }

  // Create image variation
  async createImageVariation(request: ImageVariationRequest): Promise<ImageResponse> {
    const response = await fetch("https://api.openai.com/v1/images/variations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }


  // Embeddings
  async createEmbedding(request: CreateEmbeddingRequest): Promise<CreateEmbeddingsResponse> {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }


  // Audio
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

  // Files
  async listFiles(): Promise<ListFilesResponse> {
    const response = await fetch("https://api.openai.com/v1/files", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  async uploadFile(file: UploadFileRequest): Promise<UploadFileResponse> {
    const response = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(file),
    });
    return response.json();
  }









  

  // Fine-Tunes
  async retrieveFineTune(fineTuneId): Promise<GetFineTuneResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes/${fineTuneId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  async listFineTunes(): Promise<GetFinetun> {
    const response = await fetch("https://api.openai.com/v1/fine-tunes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  async createFineTune(fileId: string, model: AvailableModels): Promise<FineTuneResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        training_file: fileId,
        model: model
      })
    });
    return response.json();
  }

  // Moderations
  async createModeration(request: ModerationRequest): Promise<ModerationResponse> {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }
  async getModels(): Promise<Models> {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
}