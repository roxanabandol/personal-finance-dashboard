import { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormField: FC<Props> = ({ label, ...props }) => (
  <div className="flex flex-col">
    {label && (
      <label className="text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    )}
    <input
      {...props}
      className="border p-2 rounded dark:bg-gray-600 dark:text-white"
    />
  </div>
);
