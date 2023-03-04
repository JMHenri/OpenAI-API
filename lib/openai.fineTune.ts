import { AvailableModels } from "./openai.models.ts";
import { OpenAISubClass } from "./openai.ts";

type CreateFineTuneRequest = {
  training_file: string;
  validation_file?: string;
  model?: string;
  n_epochs?: number;
  batch_size?: number;
  learning_rate_multiplier?: number;
  prompt_loss_weight?: number;
  compute_classification_metrics?: boolean;
  classification_n_classes?: number;
  classification_positive_class?: string;
  classification_betas?: number[];
  suffix?: string;
}

type CreateFineTuneResponse = {
  object: "fine-tune";
  id: string;
  hyperparams: {
    n_epochs: number;
    batch_size: number | null;
    prompt_loss_weight: number;
    learning_rate_multiplier: number | null;
  },
  organization_id: string;
  model: string;
  training_files: {
    object: "file",
    id: string,
    purpose: "fine-tune",
    filename: string,
    bytes: number,
    created_at: number,
    status: "processed",
    status_details: any | null
  }[];
  validation_files: any[];
  result_files: any[];
  created_at: number;
  updated_at: number;
  status: "pending" | "running" | "completed" | "failed";
  fine_tuned_model: AvailableModels | null;
  events: {
    object: "fine-tune-event",
    level: "info" | "warning" | "error",
    message: string,
    created_at: number
  }[]
}

type ListFineTunesResponse = {
  object: "list";
  data: {
    id: string;
    object: "fine-tune";
    model: string;
    created_at: number;
    fine_tuned_model: AvailableModels | null;
    hyperparams: any;
    organization_id: string;
    result_files: any[];
    status: "pending" | "running" | "completed" | "failed";
    validation_files: any[];
    training_files: any[];
    updated_at: number;
  }[];
}

type RetrieveFineTuneResponse = {
  id: string;
  object: "fine-tune";
  model: string;
  created_at: number;
  events: {
    object: "fine-tune-event",
    created_at: number,
    level: "info" | "warning" | "error",
    message: string
  }[];
  fine_tuned_model: AvailableModels | null;
  hyperparams: any;
  organization_id: string;
  result_files: any[];
  status: "pending" | "running" | "completed" | "failed";
  validation_files: any[];
  training_files: any[];
  updated_at: number;
}

type CancelFineTuneResponse = {
  id: string;
  object: "fine-tune";
  model: string;
  created_at: number;
  events: {
    object: "fine-tune-event",
    created_at: number,
    level: "info" | "warning" | "error",
    message: string
  }[];
  fine_tuned_model: AvailableModels | null;
  hyperparams: any;
  organization_id: string;
  result_files: any[];
  status: "cancelled";
  validation_files: any[];
  training_files: any[];
  updated_at: number;
}

type FineTuneEvent = {
  object: "fine-tune-event";
  created_at: number;
  level: "info" | "warning" | "error";
  message: string;
}

type ListFineTuneEventsResponse = {
  object: "list";
  data: FineTuneEvent[];
}

type DeleteFineTuneResponse = {
  id: string;
  object: string;
  deleted: boolean;
}

export class OpenAIFineTune extends OpenAISubClass {

  // Creates a job that fine-tunes a specified model from a given dataset.
  // Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.
  async create(fileId: string, model: AvailableModels): Promise<CreateFineTuneResponse> {
    return await this.post<CreateFineTuneResponse>("fine-tunes", {
      training_file: fileId,
      model: model
    });
  }

  // List your organization's fine-tuning jobs
  async list(): Promise<ListFineTunesResponse> {
    return await this.get<ListFineTunesResponse>("fine-tunes");
  }

  // Gets info about the fine-tune job.
  async info(fineTuneId: string): Promise<RetrieveFineTuneResponse> {
    return await this.get<RetrieveFineTuneResponse>(`fine-tunes/${fineTuneId}`);
  }

  // Immediately cancel a fine-tune job.
  async cancel(fineTuneId: string): Promise<CancelFineTuneResponse> {
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
  async listEvents(fineTuneId: string): Promise<ListFineTuneEventsResponse> {
    return await this.get<ListFineTuneEventsResponse>(`fine-tunes/${fineTuneId}/events`);
  }

  // Delete a fine-tuned model. You must have the Owner role in your organization.
  async delete(fineTuneId: string): Promise<DeleteFineTuneResponse> {
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