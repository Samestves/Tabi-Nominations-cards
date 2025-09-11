"use client";

import { useState } from "react";

export default function ConnectInput() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<null | boolean>(null); // null = no chequeado, true = elegible, false = no elegible
  const [loading, setLoading] = useState(false);

  const checkEligibility = async () => {
    if (!username) return;

    setLoading(true);
    setResult(null);

    try {
      // Simulación de API o validación
      // Aquí puedes reemplazar con fetch a tu backend
      await new Promise((res) => setTimeout(res, 800));

      // Ejemplo aleatorio de elegibilidad
      const eligible = username.toLowerCase().includes("tabi");
      setResult(eligible);
    } catch (error) {
      console.error(error);
      setResult(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkEligibility();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter your X username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-5 py-3 rounded-full bg-black/30 border border-red-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400 transition"
        />

        <button
          onClick={checkEligibility}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-red-600 rounded-full text-white font-semibold hover:bg-red-500 transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result !== null && (
        <div
          className={`mt-2 font-medium ${
            result ? "text-green-400" : "text-red-400"
          }`}
        >
          {result
            ? `${username} is eligible! ✅`
            : `${username} is not eligible ❌`}
        </div>
      )}
    </div>
  );
}
