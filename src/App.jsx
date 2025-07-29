import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [item, setItem] = useState("");
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);

const fetchPrice = async () => {
  setLoading(true);
  const res = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item }),
  });
  const data = await res.json();
  setPriceData({ name: item, average: "-", range: "-", tips: data.answer });
  setLoading(false);
};

    };
    setTimeout(() => {
      setPriceData(dummy);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">GTA 5 RP Оценка Предметов</h1>
      <div className="w-full max-w-md space-y-2">
        <input
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          placeholder="Введите название предмета"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button
          onClick={fetchPrice}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
        >
          {loading ? "Загрузка..." : "Оценить"}
        </button>
      </div>

      {priceData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 w-full max-w-md"
        >
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">Результат: {priceData.name}</h2>
            <p><strong>Средняя цена:</strong> {priceData.average}</p>
            <p><strong>Диапазон цен:</strong> {priceData.range}</p>
            <p className="mt-2 text-sm text-gray-400">{priceData.tips}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
