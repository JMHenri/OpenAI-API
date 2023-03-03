/*
This file is part of the OpenAI API Deno Client library.
  1. Authentication
2. Models
  2.1 ListModels
  2.2 RetrieveModel
3. Completions
  3.1 CreateCompletion
4. Chat
  4.1 CreateChatCompletion
5. Edits
  5.1 CreateEdit
6. Images
  6.1 CreateImage
  6.2 CreateImageEdit
  6.3 CreateImageVariation
7. Embeddings
  7.1 CreateEmbedding
8. Audio
  8.1 CreateTranscription
  8.2 CreateTranslation
9. Files
  9.1 ListFiles
  9.2 UploadFile
  9.3 DeleteFile
  9.4 RetrieveFile
  9.5 RetrieveFileContent
10. Fine-tunes
  10.1 CreateFineTune
  10.2 ListFineTunes
  10.3 Retrieve fine-tune
  10.4 CancelFineTune
  10.5 ListFineTuneEvents
  10.6 DeleteFineTuneModel
11. Moderations
  11.1 Create moderation
*/
import { OpenAIImage } from "./openai.image.ts";

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
  CreateEmbeddingRequest,
  CreateEmbeddingsResponse,
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
} from "./types/types.ts";


export class OpenAI {
  private apiKey: string;
  public readonly image: OpenAIImage;
  
  // Authentication
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.image = new OpenAIImage(apiKey);
  }
  
  // ------------------------------ //
  // ----- Standard Prompting ----- //
  // ------------------------------ //
  
  // Given a prompt, the model will return one or more predicted completions.
  // Can also return the probabilities of alternative tokens at each position.
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

  // Creates a new edit for the provided input, instruction, and parameters.
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

  // -------------------------- //
  // ----- Chat Prompting ----- //
  // -------------------------- //

  // Given a chat conversation, the model will return a chat completion response.
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

  // --------------------------- //
  // ----- File Management ----- //
  // --------------------------- //

  // Returns a list of files that belong to the user's organization.
  async listFiles(): Promise<ListFilesResponse> {
    const response = await fetch("https://api.openai.com/v1/files", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Upload a file that contains document(s) to be used across various endpoints/features.
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

  // Delete a file.
  async deleteFile(fileId: string): Promise<DeleteFileResponse> {
    const response = await fetch(`https://api.openai.com/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Returns information about a specific file.
  async retrieveFile(fileId: string): Promise<RetrieveFileResponse> {
    const response = await fetch(`https://api.openai.com/v1/files/${fileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Returns the contents of the specified file
  async retrieveFileContent(fileId: string): Promise<Blob> {
    const response = await fetch(`https://api.openai.com/v1/files/${fileId}/content`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // ---------------------- //
  // ----- Embeddings ----- //
  // ---------------------- //

  // Creates an embedding vector representing the input text.
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

  // ----------------------- //
  // ----- Fine-Tuning ----- //
  // ----------------------- //

  // Creates a job that fine-tunes a specified model from a given dataset.
  // Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.
  async createFineTune(fileId: string, model: AvailableModels): Promise<CreateFineTuneResponse> {
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

  // List your organization's fine-tuning jobs
  async listFineTunes(): Promise<ListFineTunesResponse> {
    const response = await fetch("https://api.openai.com/v1/fine-tunes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Gets info about the fine-tune job.
  async retrieveFineTune(fineTuneId): Promise<RetrieveFineTuneResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes/${fineTuneId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Immediately cancel a fine-tune job.
  async cancelFineTune(fineTuneId): Promise<CancelFineTuneResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes/${fineTuneId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Get fine-grained status updates for a fine-tune job.
  async listFineTuneEvents(fineTuneId): Promise<ListFineTuneEventsResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes/${fineTuneId}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Delete a fine-tuned model. You must have the Owner role in your organization.
  async deleteFineTuneModel(fineTuneId): Promise<DeleteFineTuneResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes/${fineTuneId}/model`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // -------------------- //
  // ----- Metadata ----- //
  // -------------------- //
  
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

  // ----------------------- //
  // ----- Moderations ----- //
  // ----------------------- //

  // Classifies if text violates OpenAI's Content Policy
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
}