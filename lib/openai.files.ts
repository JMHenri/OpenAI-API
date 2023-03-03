
import {
  ListFilesResponse,
  UploadFileRequest,
  UploadFileResponse,
  DeleteFileResponse,
  RetrieveFileResponse,
} from "./types/types.ts";

export class OpenAIFiles {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
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
  async retrieve(fileId: string): Promise<RetrieveFileResponse> {
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