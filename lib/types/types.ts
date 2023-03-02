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

type AvailableModels = {
  model: "ada" | "babbage" | "curie" | "davinci"
}


type AvailableChatModels = {
  model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301"
}

type Data = {
  url: string;
}


// Models
type Model = {
  id: string;
  object: string;
  owned_by: string;
  permission: string[];
}

type ListModelsResponse = {
  data: Model[];
  object: string;
}

// Completions

type Choice = {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}

type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

type CompletionRequest = {
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

type CompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
}

// Edits

type EditRequest = {
  model: string;
  input: string;
  instruction: string;
  n: number;
  temperature: number;
  top_p: number;
}  

type EditResponse = {
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

type ImageEditResponse = {
  created: number;
  data: {
    url: string;
  }[];
}

type ImageResponse = {
  created: number;
  data: Data[];
}

//Embeddings
type EmbeddingRequest = {
  model: string,
  input: string | string[],
  user: string,
}

type EmbeddingsResponse = {
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
type ListFileResponse = {
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


//Moderations




export type {
  AvailableModels,
  Model, 
  CompletionRequest, 
  CompletionResponse, 
  EditRequest, 
  EditResponse, 
  ModerationRequest, 
  ModerationResponse, 
  ImageRequest,
  ImageEditRequest,
  ImageEditResponse,
  ImageResponse,
  FileResponse
};