import line from "@line/bot-sdk";
import { lineConfig } from "../config/config.js";

const client = new line.Client(lineConfig);

const handleEvent = async (e) => {
  if (e.type !== 'message' || e.message.type !== 'text') {
    return Promise.resolve(null);
  }
  return client.replyMessage(e.replyToken, {
    type: 'text',
    text: e.message.text
  });
}

export { handleEvent };