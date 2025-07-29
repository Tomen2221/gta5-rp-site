export default async function handler(req, res) {
  const { item } = req.body;

  const prompt = `
Сколько стоит "${item}" на RP сервере Redwood GTA 5? 
Верни ответ строго в формате JSON:

{
  "average_price": "число или строка с ценой",
  "price_range": "строка с диапазоном цен",
  "tips": "краткие советы по продаже"
}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "{}";

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = {
        average_price: "-",
        price_range: "-",
        tips: text,
      };
    }

    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ average_price: "-", price_range: "-", tips: "Ошибка сервера API" });
  }
}
