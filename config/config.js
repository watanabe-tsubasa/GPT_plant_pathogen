import * as dotenv from "dotenv";
dotenv.config();

// line
const lineConfig = {
  channelSecret: process.env.CHANNEL_SECRET || '作成したBOTのチャネルシークレット',
  channelAccessToken: process.env.CHANEL_ACCESS_TOKEN || '作成したBOTのチャネルアクセストークン'
};

export { lineConfig }