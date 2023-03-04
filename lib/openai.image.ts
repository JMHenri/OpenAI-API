import { OpenAISubClass } from "./openai.ts";
import {
  ImageRequest,
  ImageEditRequest,
  ImageVariationRequest,
  ImageResponse,
} from "./types/types.ts";

export class OpenAIImage extends OpenAISubClass {

  // Given a prompt and/or an input image, the model will generate a new image.
  async create(request: ImageRequest): Promise<ImageResponse> {
    return await this.post("images/generations", request);
  }

  // Creates an edited or extended image given an original image and a prompt.
  async edit(request: ImageEditRequest): Promise<ImageResponse> {
    return await this.post("images/edits", request);
  }

  // Creates a variation of a given image.
  async variation(request: ImageVariationRequest): Promise<ImageResponse> {
    return await this.post("images/variations", request);
  }
}