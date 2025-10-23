import { motion } from "framer-motion";

export const QrCode = () => {
  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-linear-to-br from-indigo-950 via-purple-900 to-fuchsia-800 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

      <motion.h1
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-center"
      >
        <span className="bg-clip-text text-transparent bg-linear-to-r from-fuchsia-400 via-pink-400 to-purple-300 animate-gradient">
          Vote for WBS - Coding School
        </span>
      </motion.h1>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-10 text-sm text-white/60 tracking-wider"
      >
        Make your voice count ✨
      </motion.div>
    </div>
  );
};
