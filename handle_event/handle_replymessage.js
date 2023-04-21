import line from "@line/bot-sdk";
import { lineConfig } from "../config/config.js";
import { Conversation } from "../db/schema.js";

const client = new line.Client(lineConfig);

const handleReplyMessage = async (replyToken, userId, responseCount, maxResponse, gptMessage) => {

    const regex = /{[\s\S]*}/;
    const match = gptMessage.match(regex);
    
    if (match) {
        const result = JSON.parse(match[0]);
        await client.replyMessage(replyToken,[
            {        
                type: 'text',
                text: `結果です。${result.diagnosis}の可能性が高そうです。原因は${result.pathogen}という病原です。${result.symptons}という症状が特徴的で、予防方法は${result.prevention}です。`
            }
        ]);
        await client.pushMessage(userId, [
            {
                type: 'text',
                text: 'https://www.google.com/search?q=' + encodeURI(result.diagnosis)
            }
        ]);
    } else {
        await client.replyMessage(replyToken,[
            {        
                type: 'text',
                text: gptMessage
            }
        ]);
    }
    // トークン節約のためにmaxResponse目の往復で会話を切る。
    if (responseCount >= maxResponse) {
        await Conversation.findOneAndDelete({userId: userId});
        return client.pushMessage(userId, [
            {
                type: 'text',
                text: '一度頭をリフレッシュします。'
            }
        ]);
    } 
};

export { handleReplyMessage };