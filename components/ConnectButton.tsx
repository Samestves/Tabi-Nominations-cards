"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ConnectButton() {
  const { data: session } = useSession();

  if (session) {
    const username = session.user?.name || "User";

    return (
      <button
        onClick={() => signOut()}
        className="group relative flex items-center justify-center gap-3 px-7 py-3.5 
                   rounded-full font-medium text-white backdrop-blur-lg transition-all duration-500
                   hover:scale-[1.06] hover:shadow-[0_0_25px_rgba(209,16,43,0.35)]
                   focus:outline-none"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(209,16,43,0.4)",
        }}
      >
        <span className="text-white text-base tracking-wide group-hover:text-[#d1102b] transition-colors">
          @{username} • Disconnect
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("twitter")}
      className="group relative flex items-center justify-center gap-3 px-7 py-3.5 
                 rounded-full font-medium text-white backdrop-blur-lg transition-all duration-500
                 hover:scale-[1.06] hover:shadow-[0_0_25px_rgba(209,16,43,0.35)]
                 focus:outline-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(209,16,43,0.4)",
      }}
    >
      <span className="text-white text-base tracking-wide group-hover:text-[#d1102b] transition-colors">
        Claim with
      </span>

      <Image
        src="/x.png"
        alt="X Logo"
        width={22}
        height={22}
        className="opacity-90 group-hover:opacity-100 transition-opacity"
      />

      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(209,16,43,0.25), transparent 70%)",
        }}
      />
    </button>
  );
}
