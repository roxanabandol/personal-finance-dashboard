import { FC, ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card: FC<Props> = ({ title, children, className = "" }) => (
  <div
    className={`p-4 bg-white dark:bg-gray-700 shadow rounded-lg ${className}`}
  >
    {title && (
      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
        {title}
      </h3>
    )}
    {children}
  </div>
);
