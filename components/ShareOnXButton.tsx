import { motion } from "framer-motion";

// X (Twitter) icon SVG con props
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1227"
    fill="currentColor"
    className={className}
  >
    <path d="M714.163 519.284 1160.89 0H1056.18L670.432 450.887 361.796 0H0l468.205 681.822L0 1226.62h104.712l406.06-473.302 325.282 473.302h361.796L714.163 519.284Zm-144.23 168.25-47.08-67.162-374.06-533.259h161.03l301.8 430.33 47.08 67.162 394.8 562.034h-161.03l-322.54-459.105Z" />
  </svg>
);

// ------------------------
// COMPONENT: ShareOnXButton
// ------------------------
const ShareOnXButton = () => {
  const handleShare = () => {
    const text = encodeURIComponent(
      `💢🔥 Just got my *Nomination Card* in @Tabichain 🚀\n\nOne step closer to Win my SBT!! 💢✨\n\nCheck yours now 👇\n\n`
    );

    const url = encodeURIComponent(
      "https://tabi-nominations-cards.vercel.app/"
    );

    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        group relative flex items-center gap-2 mt-6 px-6 py-3
        rounded-2xl font-semibold text-white
        bg-black/40 backdrop-blur-md border border-red-500/30
        shadow-[0_0_15px_rgba(220,38,38,0.4)]
        hover:shadow-[0_0_30px_rgba(239,68,68,0.9)]
        hover:bg-black/70 hover:border-red-500
        transition-all duration-300 ease-out
      "
    >
      {/* Glow animado detrás */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/40 via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

      {/* Texto con logo inline */}
      <span className="relative z-10 flex items-center gap-2">
        Share on
        <XIcon className="w-5 h-5 text-red-400 group-hover:text-white transition duration-300" />
      </span>
    </motion.button>
  );
};

export default ShareOnXButton;
