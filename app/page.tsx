"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logot";
import Separator from "../components/Separatort";
import EligibilityChecker from "../components/EligibilityChecker";
import FAQ from "../components/FAQ";
import BackgroundGradient from "../components/BackgroundGradient";
import LightRaysComponent from "../components/LightRaysComponent";
import CenteredContainer from "../components/CenteredContainer";
import ProfileCard from "../components/ProfileCard";

// Configuración de animaciones
const motionSettings = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.5 },
};

export default function Page() {
  const [eligible, setEligible] = useState<null | boolean>(null);
  const [checkedUser, setCheckedUser] = useState("");

  const handleCheck = (username: string, isEligible: boolean) => {
    setCheckedUser(username);
    setEligible(isEligible);
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
            <p className="text-gray-400 italic animate-pulse">
              Enter your X username to check...
            </p>
          )}

          {eligible === false && (
            <div className="flex flex-col items-center mt-8">
              <motion.img
                src="/angry.gif"
                alt="Not eligible"
                className="w-72 h-72 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.p
                className="mt-4 text-center text-red-400 font-semibold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Oops! You didn’t make the cut this time 😅
              </motion.p>
            </div>
          )}

          {eligible === true && (
            <ProfileCard
              className="mt-6"
              name={checkedUser}
              title="Nomination Card"
              avatarUrl="/avatar.png"
              iconUrl="/icon.png"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              behindGradient="linear-gradient(to right, #f5857f, #ff6363, #9e0039)"
              showBehindGradient={true}
            />
          )}
        </div>

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
      </main>
    </CenteredContainer>
  );
}
