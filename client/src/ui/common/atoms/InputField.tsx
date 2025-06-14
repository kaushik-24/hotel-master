import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

interface InputProps {
  name: string;
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  placeholder?: string;
  autocomplete?: 'on' | 'off';
  disabled?: boolean;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  required?: string | boolean;
}

const InputField: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  autocomplete,
  disabled,
  value,
  className,
  onChange,
  register,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const actualType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const hasIcon = type === 'password';

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={actualType}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autocomplete}
        value={value}
        onChange={onChange}
        className={`font-poppins w-full text-sm p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 ${hasIcon ? 'pr-10' : ''} ${disabled ? 'bg-[#e4e4f4] cursor-not-allowed' : 'bg-white'} ${className || ''}`}
        {...(register && register(name, { required }))}
      />
      {hasIcon && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#019cec] text-lg"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
        </button>
      )}
    </div>
  );
};

export default InputField;
