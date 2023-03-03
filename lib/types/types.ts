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

// General
// type AvailableModels = {
//   model: "ada" | "babbage" | "curie" | "davinci"
// }
//enum version
enum AvailableModels {
  ada = "ada",
  babbage = "babbage",
  curie = "curie",
  davinci = "davinci",
}


enum AvailableChatModels {
"gpt-3.5-turbo" = "gpt-3.5-turbo",
"gpt-3.5-turbo-0301" = "gpt-3.5-turbo-0301",
}

type Data = {
  url: string;
}

type Choice = {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}

type Model = {
  id: string;
  object: string;
  owned_by: string;
  permission: string[];
}

// Models
type ListModelsResponse = {
  data: Model[];
  object: string;
}

type RetrieveModelResponse = {
  id: string;
  object: string;
  owned_by: string;
  permission: string[];
}

// Completions
type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

type CreateCompletionRequest = {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  logprobs: null;
  stop: string;
}

type CreateCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
}


// Chat
type CreateChatCompletionRequest = {
  model: string;
  messages: string[];
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  logprobs: null;
  stop: string;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  logit_bias: {};
  user: string;
}

type CreateChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  choices: Choice[];
  usage: Usage;
}



// Edits
type CreateEditRequest = {
  model: string;
  input: string;
  instruction: string;
  n: number;
  temperature: number;
  top_p: number;
}  

type CreateEditResponse = {
  object: string;
  created: number;
  choices: EditChoice[];
  usage: Usage;
}

type EditChoice = {
  text: string;
  index: number;
}

// Moderation
type ModerationRequest = {
  input: string;
}

type ModerationResponse = {
  id: string;
  model: string;
  results: Result[];
}

type Result = {
  categories: Categories;
  category_scores: CategoryScores;
  flagged: boolean;
}

type Categories = {
  hate: boolean;
  "hate/threatening": boolean;
  "self-harm": boolean;
  sexual: boolean;
  "sexual/minors": boolean;
  violence: boolean;
  "violence/graphic": boolean;
}

type CategoryScores = {
  hate: number;
  "hate/threatening": number;
  "self-harm": number;
  sexual: number;
  "sexual/minors": number;
  violence: number;
  "violence/graphic": number;
}

// Image generation
type ImageRequest = {
  prompt: string;
  n: number;
  size: string;
  response_format: string;
}

type ImageEditRequest = {
  image: string;
  mask?: string;
  prompt: string;
  n?: number;
  size?: '256x256' | '512x512' | '1024x1024';
  response_format?: 'url' | 'b64_json';
  user?: string;
};

type ImageVariationRequest = {
  prompt: string;
  n?: number;
  size?: '256x256' | '512x512' | '1024x1024';
  response_format?: 'url' | 'b64_json';
  user?: string;
};

type ImageResponse = {
  created: number;
  data: Data[];
}

//Embeddings
type CreateEmbeddingRequest = {
  model: string,
  input: string | string[],
  user: string,
}

type CreateEmbeddingsResponse = {
  object: string;
  data: {
    object: string;
    embedding: number[];
    index: number;
  }[];
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

// Audio
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

// Files
type ListFilesResponse = {
  object: "file";
  id: string;
  purpose: "fine-tune" | "fine-tune-results" | "fine-tune-train" | "fine-tune-validate";
  filename: string;
  bytes: number;
  created_at: number;
  status: "uploaded" | "processed" | "failed";
  status_details: any | null;
}

type UploadFileRequest = {
  file: string;
  purpose: string;
}

type UploadFileResponse = {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
}

type DeleteFileRequest = {
  file_id: string;
}

type DeleteFileResponse = {
  id: string;
  object: string;
  deleted: boolean;
}

type RetrieveFileRequest = {
  file_id: string;
}

type RetrieveFileResponse = {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
}

type RetrieveFileContentRequest = {
  file_id: string;
}


//Fine-tunes
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
  fine_tuned_model: any | null;
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
    fine_tuned_model: any | null;
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
  fine_tuned_model: any | null;
  hyperparams: any;
  organization_id: string;
  result_files: any[];
  status: "pending" | "running" | "completed" | "failed";
  validation_files: any[];
  training_files: any[];
  updated_at: number;
}

type CancelFineTuneRequest = {
  fine_tune_id: string;
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
  fine_tuned_model: any | null;
  hyperparams: any;
  organization_id: string;
  result_files: any[];
  status: "cancelled";
  validation_files: any[];
  training_files: any[];
  updated_at: number;
}

type ListFineTuneEventsRequest = {
  stream?: boolean;
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

//Moderations
type CreateModerationRequest = {
  input: string;
  model?: string;
}

type CreateModerationResponse = {
  id: string;
  model: string;
  results: {
    categories: Categories;
    category_scores: CategoryScores;
    flagged: boolean;
  }[];
}


export type {
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
};