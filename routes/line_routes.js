import { Router } from "express";
import line from "@line/bot-sdk";
import { handleEvent } from "../handle_event/handle_event.js";
import { lineConfig } from "../config/config.js";

const lineRouter = Router();

lineRouter.post('/webhook', line.middleware(lineConfig), (req, res) => {
  if (req.body.events.length === 0) {
    res.send('Hello LINE BOT! (HTTP POST)');
    console.log('検証イベントを受信しました！');
    return;
  } else {
    console.log('受信しました:', req.body.events);
  }
  Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result));
});

export { lineRouter };