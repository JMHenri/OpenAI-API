
import {
  ImageRequest,
  ImageEditRequest,
  ImageVariationRequest,
  ImageResponse,
} from "./types/types.ts";

export class OpenAIImage {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // Given a prompt and/or an input image, the model will generate a new image.
  async create(request: ImageRequest): Promise<ImageResponse> {
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

  // Creates an edited or extended image given an original image and a prompt.
  async edit(request: ImageEditRequest): Promise<ImageResponse> {
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

  // Creates a variation of a given image.
  async variation(request: ImageVariationRequest): Promise<ImageResponse> {
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
}