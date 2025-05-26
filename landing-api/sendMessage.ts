import axios from "axios";

import { CHANNEL_ID } from "../config";

const botTokenList = [
  "7582042115:AAFR4_YJOYJLvfVFn-vpkYYuW3y9o2id54c",
  "7331939426:AAEOkZ5OOjcUoJRqkABV_jFFaNpV6_40LgY",
  "7697602840:AAF1hnC0QY93czSC0qpoSYsDG1oO0uE0z8Y",
  "7698390089:AAE-4k35mZc8_XLgSai6-WN5e4dM6_qqhM8",
  "7897398749:AAHP9131AGQ8PsKARa1-PuBSkKkCI2ejsX0",
]
let currentBotIndex = 0;

export async function sendPumpFunTokenMintMessage(tx: string, creator: string, mintAddr: string, name: string, symbol: string) {
  const BOT_TOKEN = botTokenList[currentBotIndex];
  currentBotIndex = (currentBotIndex + 1) % botTokenList.length;

  const message: string = `🔥New Minted Token🔥\n\n` +
    `<a href= "https://pump.fun/coin/${mintAddr}">Check on Pump.fun</a>\n` +
    `🔰Token Information\n` +
    `⁘Ca: <code>${creator}</code>\n` +
    `⁘Name: <code>${name}</code>\n` +
    `⁘Symbol: $<code>${symbol}</code>\n\n`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const params = {
    chat_id: CHANNEL_ID,
    text: message,
    parse_mode: 'HTML', // Optional: You can use HTML for formatting
  };

  try {
    // Send message using axios
    const response = await axios.post(url, params);

    // Check if the message was sent successfully
    if (response.data.ok) {
      console.log('Message sent successfully!');
    } else {
      console.error('Error:', response.data.description);
    }
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}

export async function sendPumpFunMigrationMessage(tx: string) {
  const BOT_TOKEN = botTokenList[currentBotIndex];
  currentBotIndex = (currentBotIndex + 1) % botTokenList.length;

  const message: string = `🔥New Pump Fun Token Migration🔥\n\n` +
    `<a href= "https://solscan.io/tx/${tx}">Check on Solscan</a>\n`

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const params = {
    chat_id: CHANNEL_ID,
    text: message,
    parse_mode: 'HTML', // Optional: You can use HTML for formatting
  };

  try {
    // Send message using axios
    const response = await axios.post(url, params);

    // Check if the message was sent successfully
    if (response.data.ok) {
      console.log('Message sent successfully!');
    } else {
      console.error('Error:', response.data.description);
    }
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}