"use client";

import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

export default function EligibilityChecker({
  onCheck,
}: {
  onCheck: (username: string, eligible: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [eligible, setEligible] = useState<null | boolean>(null);

  const launchConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 segundos
    const colors = ["#ff4d4d", "#ff7f7f", "#ff9999", "#ffb3b3"];
    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const checkEligibility = async () => {
    if (!username) return;
    setLoading(true);

    try {
      const res = await fetch("/winners.json");
      const data = await res.json();

      const isEligible = data.winners.some(
        (name: string) => name.toLowerCase() === username.toLowerCase().trim()
      );

      setEligible(isEligible); // guardamos para lanzar confeti
      onCheck(username, isEligible);

      // 🔹 Cursor siempre al final
      if (inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
        inputRef.current.focus();
      }
    } catch (err) {
      console.error("Error checking eligibility:", err);
      setEligible(false);
      onCheck(username, false);
    } finally {
      setLoading(false);
    }
  };

  // Disparar confeti automáticamente si es elegible
  useEffect(() => {
    if (eligible) {
      launchConfetti();
    }
  }, [eligible]);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your X username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkEligibility()}
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
    </div>
  );
}
