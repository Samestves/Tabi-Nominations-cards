"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logot";
import Separator from "../components/Separatort";
import EligibilityChecker from "../components/EligibilityChecker";
import FAQ from "../components/FAQ";
import BackgroundGradient from "../components/BackgroundGradient";
import LightRays from "../components/LightRays";
import CenteredContainer from "../components/CenteredContainer";
import ProfileCard from "../components/ProfileCard";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroupTooltip,
} from "@/components/ui/avatar";
import winners from "../public/winners.json";
import MysteryCard from "../components/MysteryCard";
import ShareOnXButton from "@/components/ShareOnXButton";

// Animación reusable
const motionSettings = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.5 },
};

// Función para truncar el nombre visualmente
const formatUsername = (name: string) => {
  if (!name) return "";
  return name.length > 12 ? name.slice(0, 6) + "…" : name;
};

// Tipado de avatares
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

type EligibilityState = boolean | null;

// ------------------------
// COMPONENT: EligibilityResult
// ------------------------
const EligibilityResult = ({
  eligible,
  username,
}: {
  eligible: EligibilityState;
  username: string;
}) => {
  {
    if (eligible === null) return <MysteryCard />;
  }

  if (!eligible)
    return (
      <motion.div
        {...motionSettings}
        className="flex flex-col items-center mt-8"
      >
        <img
          src="/angry.gif"
          alt="Not eligible"
          className="w-72 h-72 object-contain"
        />
        <p className="mt-4 text-center text-red-400 font-semibold text-lg">
          You are not eligible for the nomination card at this time.
        </p>
      </motion.div>
    );

  return (
    <motion.div {...motionSettings} className="flex flex-col items-center">
      <ProfileCard
        name={formatUsername(username)}
        title="Nomination Card"
        avatarUrl="/shiroa.png"
        iconUrl="/icon.png"
        showUserInfo={false}
        enableTilt
        behindGradient="linear-gradient(to right, #f5857f, #ff6363, #9e0039)"
        showBehindGradient
      />

      {/* Botón para compartir en X */}
      <ShareOnXButton />
    </motion.div>
  );
};

// ------------------------
// COMPONENT: AvatarsList
// ------------------------
const AvatarsList = ({ avatars }: { avatars: AvatarData[] }) => (
  <div className="flex flex-col items-center gap-2 mt-40 mb-8">
    <div className="mb-3 w-full">
      <Separator />
    </div>
    <h3 className="text-gray-400 font-light text-xs uppercase tracking-wide mb-1">
      Contributors
    </h3>
    <div className="flex -space-x-3 mt-1 justify-center items-center">
      {avatars.map((avatar, i) => (
        <a
          key={i}
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
);

// ------------------------
// PAGE COMPONENT
// ------------------------
export default function Page() {
  const [checkedUser, setCheckedUser] = useState("");
  const [eligible, setEligible] = useState<EligibilityState>(null);
  const [, setAvatarUrl] = useState("/shiroa.png");

  const handleCheck = (username: string) => {
    setCheckedUser(username);

    if (!username.trim()) {
      setEligible(null);
      setAvatarUrl("/shiroa.png");
      return;
    }

    const isWinner = winners.winners.some(
      (u) => u.toLowerCase() === username.toLowerCase()
    );
    setEligible(isWinner);

    const avatar = AVATARS.find(
      (a) => a.tooltip.toLowerCase() === username.toLowerCase()
    )?.src;
    setAvatarUrl(avatar || "/shiroa.png");
  };

  return (
    <CenteredContainer className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Fondo principal */}
      <BackgroundGradient />

      {/* Rayos de luz en top */}
      <div className="absolute top-0 left-0 w-screen h-[150vh] sm:h-screen z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#dc2626"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 pt-6 pb-12">
        {/* Logo + Separador */}
        <Logo />
        <Separator />

        {/* Resultados de elegibilidad */}
        <div className="flex justify-center mt-12 min-h-[20rem] items-center">
          <EligibilityResult eligible={eligible} username={checkedUser} />
        </div>

        {/* Checker */}
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
              question: "🌟 What is this card about?",
              answer:
                "This card is a digital badge that represents your unique participation in the Tabi ecosystem. It is not just a visual collectible — it’s a recognition of your contributions and involvement in the community.",
            },
            {
              question: "✅ How do I know if I am eligible?",
              answer:
                "Simply enter your username in the checker above. If you are eligible, you’ll instantly see your status and receive confirmation. Eligibility is based on your verified activity and contributions to Tabi.",
            },
            {
              question: "🎴 What is a Nomination Card?",
              answer:
                "A Nomination Card gives you about a 90% chance to receive an exclusive SBT (Soulbound Token). However, receiving the card does not guarantee the SBT directly — it simply puts you in a very strong position to get one.",
            },
            {
              question: "🔒 Can I sell or trade it?",
              answer:
                "No. Both Nomination Cards and SBTs are non-transferable. They cannot be sold, traded, or exchanged. You can only earn them through your own contributions in the project.",
            },
            {
              question: "🤝 How do I earn one?",
              answer:
                "You can earn Nomination Cards and increase your chance of receiving an SBT by actively contributing: creating quality content, helping the community, building tools, or engaging in Tabi events. The more value you add, the higher your chances.",
            },
            {
              question: "📊 Does having a Nomination Card guarantee an SBT?",
              answer:
                "No — while Nomination Cards greatly increase your chances (around 90%), they do not guarantee an SBT. The final allocation depends on the total number of nominations and community reviews.",
            },
            {
              question: "🌐 Why are these cards important?",
              answer:
                "Nomination Cards and SBTs are symbols of trust and recognition within Tabi. They highlight your reputation, commitment, and involvement in the ecosystem, making you stand out as a core contributor.",
            },
            {
              question: "🚀 What can I do after getting an SBT?",
              answer:
                "SBTs unlock recognition, exclusive roles, and future opportunities in the ecosystem. While they are not financial assets, they are proof of your long-term commitment and may grant access to special programs in Tabi.",
            },
          ]}
        />

        <AvatarsList avatars={AVATARS} />
      </main>
    </CenteredContainer>
  );
}
