import { OpenAISubClass } from "./openai.ts";

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

type DeleteFileResponse = {
  id: string;
  object: string;
  deleted: boolean;
}

type RetrieveFileResponse = {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
}

export class OpenAIFiles extends OpenAISubClass {

  // Returns a list of files that belong to the user's organization.
  async list(): Promise<ListFilesResponse> {
    const response = await fetch("https://api.openai.com/v1/files", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Upload a file that contains document(s) to be used across various endpoints/features.
  async upload(file: UploadFileRequest): Promise<UploadFileResponse> {
    throw new Error(`Cannot upload file. Library does not support it at this time.`);
    
    // TODO:
    // This is not a proper file upload. Need multipart here.
    
    // const response = await fetch("https://api.openai.com/v1/files", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${this.apiKey}`,
    //   },
    //   body: JSON.stringify(file),
    // });
    // return response.json();
  }

  // Delete a file.
  async delete(fileId: string): Promise<DeleteFileResponse> {
    const response = await fetch(`https://api.openai.com/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Returns information about a specific file.
  async info(fileId: string): Promise<RetrieveFileResponse> {
    const response = await fetch(`https://api.openai.com/v1/files/${fileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }

  // Returns the contents of the specified file
  async contents(fileId: string): Promise<Blob> {
    const response = await fetch(`https://api.openai.com/v1/files/${fileId}/content`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response.json();
  }
}