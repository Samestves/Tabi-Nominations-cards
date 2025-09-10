// components/Logo.tsx
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center mb-2"
    >
      <img
        src="/tabi.png"
        alt="Logo"
        className="w-14 md:w-16 mb-4 filter drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]"
      />
    </motion.div>
  );
}
