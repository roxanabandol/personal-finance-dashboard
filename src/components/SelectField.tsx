import { FC } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export const SelectField: FC<Props> = ({ label, options, ...props }) => (
  <div className="flex flex-col">
    {label && (
      <label className="text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    )}
    <select
      {...props}
      className="border p-2 rounded dark:bg-gray-600 dark:text-white"
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
