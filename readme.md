# OpenAI Deno Library
This is a Deno library that provides access to all of the OpenAI API calls. It exports every single OpenAI API call, which can be accessed by instantiating a class called OpenAI and providing your API key.

## Installation
To use this library in your project, you must have Deno installed on your system. If you do not have it installed, you can find instructions for installation here.

To install the OpenAI Deno library, simply run the following command:
```
deno install --import-map=import_map.json --allow-net --allow-env https://deno.land/x/openai_api/mod.ts
```

## Usage
To use this library in your project, you must first instantiate the OpenAI class and provide it with your API key:
```
import { OpenAI } from "https://deno.land/x/openai_api/mod.ts";

const openai = new OpenAI("your-api-key-here");
```

Once you have instantiated the OpenAI class, you can access any of the OpenAI API calls by calling the corresponding method on the class instance. For example, to use the GPT-3 API to generate text, you would call the openai.createCompletion() method:


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
For a full list of the API calls that are available in this library, please refer to the [OpenAI](https://platform.openai.com/docs/api-reference/introduction) API documentation

## License

This library is licensed under the MIT License.