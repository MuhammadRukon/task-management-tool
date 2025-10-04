interface InputProps {
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showPassword?: boolean;
  onShowPassword?: () => void;
}

export function Input({
  label,
  type,
  value,
  onChange,
  placeholder,
  showPassword,
  onShowPassword,
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium mb-2 text-left"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={label}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          required
        />
        {type === "password" && (
          <button
            type="button"
            onClick={onShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}
