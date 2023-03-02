/*
This file is part of the OpenAI API Deno Client library.
1. Authentication (done)
2. Models
2.1 List models
2.2 Retrieve a model
3. Completions
3.1 Create a completion
4. Chat
4.1 Create a chat completion
5. Edits
5.1 Create an edit
6. Images
6.1 Create an image
6.2 Create image edit
6.3 Create image variation
7. Embeddings
7.1 Create embeddings
8. Audio
8.1 Create transcription
8.2 Create translation
9. Files
9.1 List files
9.2 Upload file
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
  EmbeddingRequest,
  EmbeddingsResponse,
  CreateTranscriptionRequest,
  CreateTranscriptionResponse,
  CreateTranslationRequest,
  CreateTranslationResponse,
  ListFileResponse,
  UploadFileRequest,
  UploadFileResponse,
  DeleteFileRequest,
  DeleteFileResponse,
  RetrieveFileRequest,
  RetrieveFileResponse,
  RetrieveFileContentRequest,
  CreateFineTuneRequest,
  CreateFineTuneResponse
} from "./types/types";


export class OpenAI {
  private apiKey: string;
  
  //Authentication
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  //Models
  //List models
  async listModels(): Promise<Models> {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
  //Retrieve a model
  async retrieveModel(modelId: AvailableModels): Promise<Models> {
    const response = await fetch(`https://api.openai.com/v1/models/${modelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }



  //Completions
  async createCompletion(request: CompletionRequest): Promise<CompletionResponse> {
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


  //Chat
  async createChatCompletion(request: CompletionRequest): Promise<CompletionResponse> {
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

  //Edits
  //Create an edit
  async createEdit(request: EditRequest): Promise<EditResponse> {
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



  //Images
  //Create an image
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

  //Create image edit
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

  //Create image variation
  async createImageVariation(request: ImageVariationRequest): Promise<ImageResponse> {



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

  async getFineTune(fineTuneId): Promise<FineTuneResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes/${fineTuneId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  async getFineTunes(): Promise<FineTunes> {
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
  async uploadFile(fileData: Uint8Array, fileName: string): Promise<FileResponse> {
    const form = new FormData();
    form.append('purpose', 'fine-tune');
    form.append('file', new Blob([fileData]), fileName);

    const response = await fetch(`https://api.openai.com/v1/files`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: form
    });
    return response.json();
  }
}