import { Router } from "express";

const router = Router();

router.post("/notify", async (req, res) => {
  const token = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatIdsRaw = process.env.VITE_TELEGRAM_CHAT_ID ?? "";

  if (!token) {
    res.status(500).json({ ok: false, error: "Bot token not configured" });
    return;
  }

  const chatIds = chatIdsRaw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (chatIds.length === 0) {
    res.status(500).json({ ok: false, error: "No chat IDs configured" });
    return;
  }

  const { text } = req.body as { text?: string };

  if (!text) {
    res.status(400).json({ ok: false, error: "Missing text field" });
    return;
  }

  try {
    const results = await Promise.all(
      chatIds.map((chatId) =>
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        }).then((r) => r.json()),
      ),
    );
    res.json({ ok: true, results });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

export default router;
