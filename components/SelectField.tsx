
import React from 'react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, placeholder, ...rest }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      {...rest}
      className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
