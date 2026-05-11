import { NextResponse } from "next/server";

export async function GET() {

  const botToken =
    process.env.TELEGRAM_BOT_TOKEN;

  const chatId =
    process.env.TELEGRAM_CHAT_ID;

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        chat_id: chatId,
        text:
          "✅ Telegram API route working successfully!",
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}