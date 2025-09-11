import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 🔹 Reglas personalizadas
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // desactiva el error de 'any'
      "@next/next/no-img-element": "off", // desactiva la advertencia de <img>
    },
  },
];

export default eslintConfig;
