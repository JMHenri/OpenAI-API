# OpenAI Deno Library
This library exports OpenAI API calls through the OpenAI class.

## Usage
To use this library, you must instantiate the OpenAI class and provide it with your API key:
```
import { OpenAI } from "https://deno.land/x/openai_api/mod.ts";

const openai = new OpenAI("your-api-key-here");
```

Once instantiated, you can make OpenAI API calls through the corresponding method. For example, to use the GPT-3 API to generate text, you would call the openai.text.complete() method:

```
const prompt = "Once upon a time";
const completions = await openai.text.complete({
  model: "davinci",
  prompt,
  maxTokens: 50,
  n: 1,
});

console.log(completions.choices[0].text);
```

This would generate a short text completion based on the prompt "Once upon a time" using the Davinci engine.

## APIs Available
The following APIs are currently available:

**Audio**:
- openai.audio.transcription(): Transcribe audio to input language. (Audio to Text)
- openai.audio.translation(): Translates audio into into English.

**Chat**:
- openai.chat.complete(): Return a chat completion response.

**Embeddings**:
- openai.embedding.create(): Create embedding vector representing the input text.

**Files**:
- openai.files.list(): Return files that belong to user's organization.
- openai.files.upload(): Upload file to be used for OpenAI features.
- openai.files.delete(): Delete file.
- openai.files.info(): Retrieve information about a file.
- openai.files.contents(): Retrieve contents of a file.

**Fine-Tuning**:
- openai.fineTune.create(): Creates a job to fine-tunes a specified model.
- openai.fineTune.delete(): Deletes a fine-tune model.
- openai.fineTune.list(): Lists fine-tuned models.
- openai.fineTune.info(): Gets info about the fine-tune job.
- openai.fineTune.cancel(): Cancels a fine-tune job.
- openai.fineTune.listEvents(): Get fine-grained status updates for a fine-tune job.

**Image**:
- openai.image.create(): Generate a new image.
- openai.image.edit(): Creates an edited or extended image with an original image and prompt.
- openai.image.variation(): Creates a variation of a given image.

**Models**:
- openai.models.list(): Lists currently available models, provides basic info.
- openai.models.retrieve(): Retrieves a model instance, provides basic info.

**Moderation**:
- openai.moderation.check(): Classifies if text violates OpenAI's Content Policy

**Text**:
- openai.text.complete(): Model returns one or more predicted completions based on prompt.
- openai.text.edit(): Creates a new edit for the provided input, instruction, and parameters.

## API Reference
For a list of API calls that are available, you can also refer to the [OpenAI](https://platform.openai.com/docs/api-reference/introduction) API documentation

## License
This library is licensed under the MIT License.
