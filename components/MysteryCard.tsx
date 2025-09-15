// components/MysteryCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MysteryCard() {
  return (
    <div className="relative w-80 h-[26rem] flex items-center justify-center">
      {/* Halo mínimo alrededor */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-3xl"
          style={{
            width: "300px",
            height: "410px",
            border: "1px solid rgba(209,16,43,0.25)",
            filter: "blur(8px)",
          }}
          animate={{
            scale: [1, 1.07, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* La carta flotando */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        whileHover={{ scale: 1.08 }}
        className="relative w-72 h-96 rounded-3xl backdrop-blur-2xl bg-black/40 border border-red-700/30 shadow-[0_0_35px_rgba(209,16,43,0.8)] overflow-hidden"
        role="img"
        aria-label="Mystery card"
      >
        {/* Glow exterior difuso */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: "0 0 50px 12px rgba(209,16,43,0.4)",
            pointerEvents: "none",
          }}
        />

        {/* Gradiente interior sutil */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(209,16,43,0.15), transparent 70%)",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Shine diagonal */}
        <motion.div
          aria-hidden
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 60, opacity: [0, 0.15, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: "-30%",
            top: "-20%",
            width: "160%",
            height: "140%",
            transform: "rotate(-20deg)",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.15), rgba(255,255,255,0))",
            pointerEvents: "none",
          }}
        />

        {/* Signo misterioso */}
        <motion.span
          className="relative z-10 flex items-center justify-center text-center select-none"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          <span
            className="text-[5.5rem] font-extrabold"
            style={{
              color: "rgba(255,110,120,0.95)",
              textShadow:
                "0 0 30px rgba(209,16,43,0.9), 0 0 60px rgba(209,16,43,0.7)",
            }}
          >
            ?
          </span>
        </motion.span>
      </motion.div>
    </div>
  );
}
