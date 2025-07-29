export default async function handler(req, res) {
  const { item } = req.body;

  const prompt = `Сколько может стоить "${item}" на RP сервере Redwood GTA 5? Дай диапазон цен и советы по продаже. Учитывай особенности этого сервера.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;
  res.status(200).json({ answer });
}
