"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logot";
import Separator from "../components/Separatort";
import EligibilityChecker from "../components/EligibilityChecker";
import FAQ from "../components/FAQ";
import BackgroundGradient from "../components/BackgroundGradient";
import LightRaysComponent from "../components/LightRaysComponent";
import CenteredContainer from "../components/CenteredContainer";
import ProfileCard from "../components/ProfileCard";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroupTooltip,
} from "@/components/ui/avatar";
import TestLogin from "../components/TestLogin";
import winners from "../public/winners.json";
import { useSession } from "next-auth/react";

// Configuración de animaciones
const motionSettings = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.5 },
};

// Tipado correcto para cada avatar
interface AvatarData {
  src: string;
  fallback: string;
  tooltip: string;
  xUrl: string;
}

const AVATARS: AvatarData[] = [
  {
    src: "/awaq.jpg",
    fallback: "A",
    tooltip: "Awaq",
    xUrl: "https://x.com/0xAigis",
  },
  {
    src: "/cyclo.jpg",
    fallback: "C",
    tooltip: "Cyclo",
    xUrl: "https://x.com/TabiCyclo",
  },
  {
    src: "/samx.png",
    fallback: "S",
    tooltip: "Samx",
    xUrl: "https://x.com/samestves",
  },
  {
    src: "/ricarfonso.jpg",
    fallback: "R",
    tooltip: "Ricarfonso",
    xUrl: "https://x.com/ricarfonso78g",
  },
];

export default function Page() {
  // 🔹 Hook de sesión de NextAuth
  const { data: session, status } = useSession();

  // Estado existente
  const [eligible, setEligible] = useState<null | boolean>(null);
  const [checkedUser, setCheckedUser] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/shiroa.png"); // default

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      const username: string = session.user.name; // ✅ Aquí ya es string
      setCheckedUser(username);

      const isWinner = winners.winners.some(
        (u: string) => u.toLowerCase() === username.toLowerCase()
      );
      setEligible(isWinner);

      if (session.user.avatar) {
        setAvatarUrl(session.user.avatar);
      }
    } else {
      setEligible(null);
      setCheckedUser("");
      setAvatarUrl("/shiroa.png");
    }
  }, [status, session]);

  // Tu función handleCheck sigue igual
  const handleCheck = (username: string, isEligible: boolean | null) => {
    setCheckedUser(username);
    setEligible(isEligible);
    // Buscar avatar de la lista de AVATARS si quieres fallback
    const avatar = AVATARS.find(
      (a) => a.tooltip.toLowerCase() === username.toLowerCase()
    )?.src;
    if (avatar) setAvatarUrl(avatar);
  };

  return (
    <CenteredContainer className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Fondo */}
      <BackgroundGradient />
      <LightRaysComponent />

      <main className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 pt-6 pb-12 bg-transparent">
        <Logo />
        <Separator />

        {/* ================= Resultado (Gif o Card) ================= */}
        <div className="flex justify-center mt-12 min-h-[20rem] items-center">
          {eligible === null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-4"
              role="status"
            >
              {/* Skeleton Card con animación flotante */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-72 h-96 rounded-2xl relative overflow-hidden 
                   bg-gradient-to-br from-red-950 via-red-900 to-black 
                   shadow-[0_0_35px_rgba(255,0,0,0.6)] border border-red-700/40"
              >
                {/* Resplandor interno */}
                <div className="absolute inset-0 bg-gradient-radial from-red-700/30 via-transparent to-transparent" />

                {/* Efecto shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />

                {/* Misterioso "?" */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="relative text-gray-300 text-7xl font-bold 
                       drop-shadow-[0_0_20px_rgba(255,0,0,1)]"
                    animate={{
                      scale: [1, 1.15, 1],
                      textShadow: [
                        "0 0 15px #ff0000",
                        "0 0 35px #ff3333",
                        "0 0 15px #ff0000",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ?{/* Halo épico detrás del "?" */}
                    <span className="absolute inset-0 rounded-full w-20 h-20 -z-10 mx-auto blur-2xl bg-red-600/30 animate-pulse" />
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {eligible === false && (
            <motion.div
              {...motionSettings}
              className="flex flex-col items-center mt-8"
            >
              <motion.img
                src="/angry.gif"
                alt="User not eligible"
                className="w-72 h-72 object-contain"
              />
              <p className="mt-4 text-center text-red-400 font-semibold text-lg">
                You are not eligible for the nomination card at this time. Keep
                contributing and try again!
              </p>
            </motion.div>
          )}

          {eligible === true && (
            <motion.div
              key={checkedUser} // 🔹 hace que todo se reinicie
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <p className="text-green-400 font-semibold text-lg mb-4">
                Congrats! You are eligible 🎉
              </p>
              <ProfileCard
                name={checkedUser}
                title="Nomination Card"
                avatarUrl={avatarUrl}
                iconUrl="/icon.png"
                showUserInfo={false}
                enableTilt
                behindGradient="linear-gradient(to right, #f5857f, #ff6363, #9e0039)"
                showBehindGradient
              />
            </motion.div>
          )}
        </div>

        {/* 🔹 Aquí metemos el login */}
        <TestLogin />

        {/* ================= Check Eligibility debajo siempre ================= */}
        <motion.section
          {...motionSettings}
          className="w-full max-w-sm flex flex-col items-center gap-4 mt-12 mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Check Your Eligibility
          </h2>
          <EligibilityChecker onCheck={handleCheck} />
        </motion.section>

        {/* FAQ */}
        <FAQ
          items={[
            {
              question: "What is this card about?",
              answer:
                "This card represents your unique participation in our ecosystem.",
            },
            {
              question: "How do I know if I am eligible?",
              answer: "Enter your X username above and check eligibility.",
            },
            {
              question: "Can I sell or trade it?",
              answer: "No, this card is non-transferable.",
            },
          ]}
        />
        {/* ================== Separator + Avatar Credits ================== */}
        <div className="flex flex-col items-center gap-2 mt-40 mb-8">
          {/* Separador con margen inferior */}
          <div className="mb-3 w-full">
            <Separator />
          </div>

          {/* Título más pequeño y pegado a los avatares */}
          <h3 className="text-gray-400 font-light text-xs uppercase tracking-wide mb-1">
            Contributors
          </h3>

          {/* Avatares centrados justo debajo del título */}
          <div className="flex -space-x-3 mt-1 justify-center items-center">
            {AVATARS.map((avatar, index) => (
              <a
                key={index}
                href={avatar.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block transform transition-transform duration-200 hover:scale-110 cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={avatar.src} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
                </Avatar>
              </a>
            ))}
          </div>
        </div>
      </main>
    </CenteredContainer>
  );
}
