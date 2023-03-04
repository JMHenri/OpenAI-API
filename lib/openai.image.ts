import { OpenAISubClass } from "./openai.ts";

type Data = {
  url: string;
}

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

export class OpenAIImage extends OpenAISubClass {

  // Given a prompt and/or an input image, the model will generate a new image.
  async create(request: ImageRequest): Promise<ImageResponse> {
    return await this.post<ImageResponse>("images/generations", request);
  }

  // Creates an edited or extended image given an original image and a prompt.
  async edit(request: ImageEditRequest): Promise<ImageResponse> {
    return await this.post<ImageResponse>("images/edits", request);
  }

  // Creates a variation of a given image.
  async variation(request: ImageVariationRequest): Promise<ImageResponse> {
    return await this.post<ImageResponse>("images/variations", request);
  }
}