import { Conversation } from "../db/schema.js";
import { makeCompletion } from "../gpt/gpt.js";
import { handleReplyMessage } from "./handle_replymessage.js";

const handleEvent = async (e) => {
    if (e.type !== 'message' || e.message.type !== 'text') {
    return Promise.resolve(null);
    }

    const maxResponse = 2 // response回数

    const userId = e.source.userId;
    const sendMessage = {
        role: "user",
        content: e.message.text
    };
    
    // メッセージが送られたら、MongoDBからuserID別に保存された会話ログを取得
    const res = await Conversation.findOne({userId: userId})
    const responseCount = (res)?res.messageLog.length / 2: 0;
    let userMessage = [];
    if (res) {
        userMessage.push(...res.messageLog);
    }
    userMessage.push(sendMessage);
     
    // 会話ログのリストに今回のテキストをpushして、chatGPTのAPIを叩く
    const completion = await makeCompletion(userMessage, responseCount, maxResponse);

    // chatGPTのリプライを判定。JSONが含まれている場合は結果としてリプライ、含まれていなければテキストとしてリプライ
    console.log(completion.data.choices);
    const gptMessage = completion.data.choices[0].message;

    // 送信した会話と、返ってきた会話をMongoDBに記録
    if (res) {
        await Conversation.findOneAndUpdate(
            {userId: userId},
            {messageLog: [...res.messageLog, sendMessage, gptMessage]},
            {new: true}
        )
    } else {
        await Conversation.create(
            {
                userId: userId,                    
                messageLog: [sendMessage, gptMessage]
            },
        )
    }
    handleReplyMessage(e.replyToken, userId, responseCount, maxResponse, gptMessage.content);
};

export { handleEvent };