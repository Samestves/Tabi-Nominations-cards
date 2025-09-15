"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// X (Twitter) icon
const XIcon = ({ className = "w-4 h-4 text-zinc-400" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1227"
    fill="currentColor"
    className={className}
  >
    <path d="M714.163 519.284 1160.89 0H1056.18L670.432 450.887 361.796 0H0l468.205 681.822L0 1226.62h104.712l406.06-473.302 325.282 473.302h361.796L714.163 519.284Zm-144.23 168.25-47.08-67.162-374.06-533.259h161.03l301.8 430.33 47.08 67.162 394.8 562.034h-161.03l-322.54-459.105Z" />
  </svg>
);

// Arrow icon
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
      clipRule="evenodd"
    />
  </svg>
);

export default function EligibilityChecker({
  onCheck,
}: {
  onCheck: (username: string, eligible: boolean | null) => void;
}) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [eligible, setEligible] = useState<null | boolean>(null);
  const [confettiKey, setConfettiKey] = useState(0);

  const launchConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#ff4d4d", "#ff7f7f", "#ff9999", "#ffb3b3"];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });
      confetti({
        particleCount: 6,
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

  const normalizeUsername = (input: string) => {
    let name = input.trim().toLowerCase();
    if (name.startsWith("@")) name = name.slice(1);
    name = name
      .replace(/^https?:\/\/(x|twitter)\.com\//, "") // soporta twitter.com y x.com
      .replace(/\?.*$/, ""); // elimina query strings tipo ?s=21
    return name;
  };

  const checkEligibility = async () => {
    if (!username.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/winners.json");
      const data = await res.json();
      const cleanedInput = normalizeUsername(username);
      const matchedName = data.winners.find(
        (name: string) => name.toLowerCase() === cleanedInput
      );

      const isEligible = !!matchedName;
      setEligible(isEligible);
      onCheck(matchedName || username, isEligible);

      if (isEligible) setConfettiKey((k) => k + 1);

      // 🔹 Solo en móvil cerramos teclado
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        inputRef.current?.blur();
      }
    } catch (err) {
      console.error("Error checking eligibility:", err);
      setEligible(false);
      onCheck(username, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eligible) launchConfetti();
  }, [eligible, confettiKey]);

  return (
    <motion.div
      className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative w-full rounded-full">
        <div className="relative flex items-center rounded-full backdrop-blur-xl bg-zinc-950/70 overflow-hidden border border-red-500/20">
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value);
              if (value.trim() === "") {
                setEligible(null);
                onCheck("", null);
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && checkEligibility()}
            className="w-full flex-1 pl-4 pr-3 py-3 bg-transparent text-white focus:outline-none font-medium tracking-wide"
          />

          {/* Placeholder adaptativo móvil */}
          {username.length === 0 && (
            <span className="absolute left-4 text-zinc-500 pointer-events-none flex items-center gap-1 font-light select-none text-xs sm:text-sm">
              Enter your <XIcon className="w-4 h-4 text-zinc-500" /> username
            </span>
          )}

          <motion.button
            onClick={checkEligibility}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            className="relative min-w-[100px] px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold 
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-1.5 group"
          >
            <span className="relative z-10">{loading ? "..." : "Check"}</span>
            {!loading && (
              <div className="transform transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
