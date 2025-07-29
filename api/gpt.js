export default async function handler(req, res) {
  const { item } = req.body;

 const prompt = `
Оцени стоимость предмета "${item}" для сервера GTA 5 RP Redwood.

Ответь строго в JSON формате:

{
  "average_price": "пример: 50000$",
  "price_range": "пример: 45000$ - 55000$",
  "tips": "краткие советы по продаже"
}

Если не знаешь цену — поставь "-"
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
  const text = data.choices?.[0]?.message?.content;

if (!text || text.trim() === "{}") {
  return res.status(200).json({
    average_price: "-",
    price_range: "-",
    tips: "Нет данных по этому предмету.",
  });
}


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
