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
  const { data: session, status } = useSession();
  const [eligible, setEligible] = useState<null | boolean>(null);
  const [checkedUser, setCheckedUser] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/shiroa.png"); // default

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // 🔹 Usamos username del token que ya viene limpio
      const username = session.user.username;
      console.log("[DEBUG] Logged in username:", username);
      console.log("[DEBUG] Full session object:", session);

      setCheckedUser(username);

      // 🔹 Compara contra winners.json
      const isWinner = winners.winners.some(
        (u: string) => u.toLowerCase() === username.toLowerCase()
      );
      console.log("[DEBUG] Is winner?", isWinner);
      setEligible(isWinner);

      // 🔹 Avatar del token
      setAvatarUrl(session.user.avatar || "/shiroa.png");
    } else {
      setEligible(null);
      setCheckedUser("");
      setAvatarUrl("/shiroa.png");
    }
  }, [status, session]);

  // 🔹 Función de check manual
  const handleCheck = (username: string, isEligible: boolean | null) => {
    setCheckedUser(username);
    setEligible(isEligible);

    const avatar = AVATARS.find(
      (a) => a.tooltip.toLowerCase() === username.toLowerCase()
    )?.src;
    if (avatar) setAvatarUrl(avatar);
  };

  return (
    <CenteredContainer className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundGradient />
      <LightRaysComponent />

      <main className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 pt-6 pb-12">
        <Logo />
        <Separator />

        {/* Resultado */}
        <div className="flex justify-center mt-12 min-h-[20rem] items-center">
          {eligible === null && (
            <motion.div
              {...motionSettings}
              className="flex flex-col items-center"
            >
              {/* Carta misteriosa */}
              <div className="w-72 h-96 rounded-2xl bg-gradient-to-br from-red-950 via-red-900 to-black shadow-[0_0_35px_rgba(255,0,0,0.6)] border border-red-700/40 flex items-center justify-center text-7xl font-bold text-gray-300">
                ?
              </div>
            </motion.div>
          )}

          {eligible === false && (
            <motion.div
              {...motionSettings}
              className="flex flex-col items-center mt-8"
            >
              <img
                src="/angry.gif"
                alt="User not eligible"
                className="w-72 h-72 object-contain"
              />
              <p className="mt-4 text-center text-red-400 font-semibold text-lg">
                You are not eligible for the nomination card at this time.
              </p>
            </motion.div>
          )}

          {eligible === true && (
            <motion.div
              {...motionSettings}
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

        {/* Login */}
        <TestLogin />

        {/* Check Eligibility */}
        <motion.section
          {...motionSettings}
          className="w-full max-w-sm flex flex-col items-center gap-4 mt-12 mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Check Your Eligibility
          </h2>
          <EligibilityChecker onCheck={handleCheck} />
        </motion.section>

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

        {/* Avatares */}
        <div className="flex flex-col items-center gap-2 mt-40 mb-8">
          <div className="mb-3 w-full">
            <Separator />
          </div>
          <h3 className="text-gray-400 font-light text-xs uppercase tracking-wide mb-1">
            Contributors
          </h3>
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
