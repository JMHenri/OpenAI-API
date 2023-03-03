# OpenAI Deno Library
This library exports OpenAI API calls through the OpenAI class.

## Usage
To use this library, you must instantiate the OpenAI class and provide it with your API key:
```
import { OpenAI } from "https://deno.land/x/openai_api/mod.ts";

const openai = new OpenAI("your-api-key-here");
```

Once instantiated, you can make OpenAI API calls through the corresponding method. For example, to use the GPT-3 API to generate text, you would call the openai.createCompletion() method:

```
const prompt = "Once upon a time";
const completions = await openai.complete({
  model: "davinci",
  prompt,
  maxTokens: 50,
  n: 1,
});

console.log(completions.choices[0].text);
```

This would generate a short text completion based on the prompt "Once upon a time" using the Davinci engine.

## API Reference
For a list of API calls that are available, you can also refer to the [OpenAI](https://platform.openai.com/docs/api-reference/introduction) API documentation

## License
This library is licensed under the MIT License.