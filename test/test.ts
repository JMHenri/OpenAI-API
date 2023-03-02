import { apiKey } from "../config";

const prompt = "What is the meaning of life?";

const response = await fetch(
  `https://api.openai.com/v1/completions`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    }),
  }
);

const json = await response.json();
console.log(json.choices[0].text);


