import { OpenAIApi } from "openai";
import { gptConfig } from "../config/config.js";

const openai = new OpenAIApi(gptConfig);

const makeCompletion = async (userMessage, responseCount, maxResponse) => {
    const prompt = {
        role: "system", 
        content: '## あなたは植物病理学者です。' +
        '## 一般の人から家庭菜園で発生したトマトの病気について相談されますので、原因となる病原を特定してください。' +
        '## 一問一答を繰り返し、最も可能性が高い病原を示してください。' +
        'responseCount =' + maxResponse + 'のときに最も可能性が高い病原についてのJSONデータを生成してください。JSONのフォーマットは' +
        '    {\n' +
        '      "pathogen": "",\n' +
        '      "symptoms": "",\n' +
        '      "diagnosis": "",\n' +
        '      "prevention": "",\n' +
        '    }' +
        'こちらでお願いします。\n' +
        '\n' +
        'responseCount = ' + responseCount
    };

    userMessage.unshift(prompt);
    console.log(userMessage);
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: userMessage,
        temperature: 0.5,
        n: 1
    });
};

export { makeCompletion }