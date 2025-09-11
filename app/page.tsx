"use client";

import React from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logot";
import Separator from "../components/Separatort";
import EligibilityChecker from "../components/EligibilityChecker";
import FAQ from "../components/FAQ";
import BackgroundGradient from "../components/BackgroundGradient";
import LightRaysComponent from "../components/LightRaysComponent";
import CenteredContainer from "../components/CenteredContainer"; // Componente reutilizable para el contenedor principal
import ProfileCard from "../components/ProfileCard"; // Asegúrate de que la ruta sea correcta

// Configuración de animaciones para mantener el código limpio
const motionSettings = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.5 },
};

export default function Page() {
  return (
    <CenteredContainer className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Fondo radial y rayos de luz */}
      <BackgroundGradient />
      <LightRaysComponent />

      {/* ================= Main Content ================= */}
      <main className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 pt-6 pb-12 bg-transparent">
        {/* Logo */}
        <Logo />

        {/* Separador */}
        <Separator />

        <ProfileCard
          className="mt-6" // Espacio superior
          name="USER"
          title="Nomination Card"
          avatarUrl="/avatar.png"
          iconUrl="/icon.png"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          behindGradient="linear-gradient(to right, #f5857f, #ff6363, #9e0039)"
          showBehindGradient={true} // Asegúrate de que esté habilitado para que el gradiente se vea
        />

        {/* Connect X Section */}
        <motion.section
          {...motionSettings}
          className="w-full max-w-sm flex flex-col items-center gap-4 mt-12 mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Check Your Eligibility
          </h2>
          <EligibilityChecker />
        </motion.section>

        {/* FAQ Section */}
        <FAQ
          items={[
            {
              question: "What is this card about?",
              answer:
                "This card represents your unique participation in our ecosystem.",
            },
            {
              question: "How do I know if I am eligible?",
              answer:
                "Connect your X account above to see if you are eligible.",
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
