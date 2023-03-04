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
- **openai.audio.transcription(request)**: Transcribe audio to input language. (Audio to Text)
- **openai.audio.translation(request)**: Translates audio into into English.

**Chat**:
- **openai.chat.complete(request)**: Return a chat completion response.

**Embeddings**:
- **openai.embedding.create(request)**: Create embedding vector representing the input text.

**Files**:
- **openai.files.list()**: Return files that belong to user's organization.
- **openai.files.upload(file)**: Upload file to be used for OpenAI features.
- **openai.files.delete(fileId)**: Delete file.
- **openai.files.info(fileId)**: Retrieve information about a file.
- **openai.files.contents(fileId)**: Retrieve contents of a file.

**Fine-Tuning**:
- **openai.fineTune.list()**: Lists fine-tuned models.
- **openai.fineTune.create(fileId, model)**: Creates a job to fine-tunes a specified model.
- **openai.fineTune.delete(fineTuneId)**: Deletes a fine-tune model.
- **openai.fineTune.info(fineTuneId)**: Gets info about the fine-tune job.
- **openai.fineTune.cancel(fineTuneId)**: Cancels a fine-tune job.
- **openai.fineTune.listEvents(fineTuneId)**: Get fine-grained status updates for a fine-tune job.

**Image**:
- **openai.image.create(request)**: Generate a new image.
- **openai.image.edit(request)**: Creates an edited or extended image with an original image and prompt.
- **openai.image.variation(request)**: Creates a variation of a given image.

**Models**:
- **openai.models.list()**: Lists currently available models, provides basic info.
- **openai.models.retrieve(modelId)**: Retrieves a model instance, provides basic info.

**Moderation**:
- **openai.moderation.check(request)**: Classifies if text violates OpenAI's Content Policy

**Text**:
- **openai.text.complete(request)**: Model returns one or more predicted completions based on prompt.
- **openai.text.edit(request)**: Creates a new edit for the provided input, instruction, and parameters.

## API Reference
For a list of API calls that are available, you can also refer to the [OpenAI](https://platform.openai.com/docs/api-reference/introduction) API documentation

## License
This library is licensed under the MIT License.
