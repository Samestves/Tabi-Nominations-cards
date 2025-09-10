// components/FAQ.tsx
import { motion } from "framer-motion";

export default function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full max-w-2xl px-0 sm:px-0"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white">
        FAQ
      </h2>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <motion.details
            key={idx}
            className="group p-4 rounded-xl transition-all duration-300
              bg-white/5 backdrop-blur-sm border border-white/5
              hover:bg-white/10 hover:border-red-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <summary className="flex justify-between items-center cursor-pointer font-semibold text-white/90 group-hover:text-white list-none">
              {item.question}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-3 text-white/70">{item.answer}</p>
          </motion.details>
        ))}
      </div>
    </motion.section>
  );
}
