import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: FC<Props> = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md relative"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
      >
        ✖
      </button>
      {children}
    </motion.div>
  </div>
);
