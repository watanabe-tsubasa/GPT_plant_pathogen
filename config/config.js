import { Configuration } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

// line
const lineConfig = {
  channelSecret: process.env.CHANNEL_SECRET || '作成したBOTのチャネルシークレット',
  channelAccessToken: process.env.CHANEL_ACCESS_TOKEN || '作成したBOTのチャネルアクセストークン'
};

// chatGPT
const gptConfig = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION || "調べてコピペ",
    apiKey: process.env.OPENAI_API_KEY || 'バレないようにコピペ',
});

export { lineConfig, gptConfig }