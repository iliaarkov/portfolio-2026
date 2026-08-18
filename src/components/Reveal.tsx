'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, width = "100%" }: Props) => {
  return (
    <motion.div
      style={{ position: "relative", width, overflow: "hidden" }}
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      // viewport={{ once: true }} // Анимация сработает только один раз при первом скролле
    >
      {children}
    </motion.div>
  );
};