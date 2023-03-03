
import {
  AvailableModels,
  CreateFineTuneResponse,
  ListFineTunesResponse,
  RetrieveFineTuneResponse,
  CancelFineTuneResponse,
  ListFineTuneEventsResponse,
  DeleteFineTuneResponse,
} from "./types/types.ts";

export class OpenAIFineTune {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // Creates a job that fine-tunes a specified model from a given dataset.
  // Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.
  async create(fileId: string, model: AvailableModels): Promise<CreateFineTuneResponse> {
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
  async list(): Promise<ListFineTunesResponse> {
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
  async retrieve(fineTuneId): Promise<RetrieveFineTuneResponse> {
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
  async cancel(fineTuneId): Promise<CancelFineTuneResponse> {
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
  async listEvents(fineTuneId): Promise<ListFineTuneEventsResponse> {
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
  async delete(fineTuneId): Promise<DeleteFineTuneResponse> {
    const response = await fetch(`https://api.openai.com/v1/fine-tunes/${fineTuneId}/model`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
}