import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
}

export const AnimatedListItem: FC<Props> = ({ children, className = "" }) => (
  <motion.li
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.li>
);
