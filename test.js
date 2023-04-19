import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-e3bH006RqIJewGofzKDFTQaV",
    apiKey: process.env.OPENAI_API_KEY || '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',
});
const openai = new OpenAIApi(configuration);
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user", 
            content: '犬の種類について会話をした後に、適当な犬種についてのJSONデータを生成してください。JSONのフォーマットは' +
            '    {\n' +
            '      "name": "",\n' +
            '      "origin": "",\n' +
            '      "temperament": "",\n' +
            '      "size": "",\n' +
            '    }' +
            'こちらでお願いします。'
        },
    ],
    temperature: 0.5,
    n: 1,
  });

console.log(completion.data);
const content = completion.data.choices[0].message.content;
console.log(content);

const regex = /{[\s\S]*}/;
const match = content.match(regex);

let message;
if (match) {
    message = JSON.parse(match[0]);
} else {
    message = content;
}

console.log('会話全体を出力\n');
console.log(message);
console.log(`name_keyを出力:${message.name}\ntemperament_keyを出力:${message.temperament}`);