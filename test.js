import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-e3bH006RqIJewGofzKDFTQaV",
    apiKey: process.env.OPENAI_API_KEY || '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',
});
const openai = new OpenAIApi(configuration);
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
        role: "user", 
        content: "初めてのNode.jsからの会話です。"
    }],
    n:1,
  });

console.log(completion.data.choices[0].message);