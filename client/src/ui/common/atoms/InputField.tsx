import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

interface InputProps {
    name: string;
    type: 'text' | 'password' | 'email' | 'number' | 'date';
    placeholder?: string;
    autocomplete?: 'on' | 'off';
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
}

const InputField: React.FC<InputProps> = ({
    name,
    type,
    placeholder,
    autocomplete,
    disabled,
    value,
    onChange,
    register
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
                className={`font-poppins w-full text-sm mb-2 ${hasIcon ? 'pl-10' : 'pl-3'} pr-3 py-2 border-2 border-[#5b3423] rounded-md focus:outline-none ${disabled ? 'cursor-not-allowed' : ''}`}
                {...(register && register(name))}
            />
            {hasIcon && (
                <button
                    type="button"
                    className="absolute right-3 top-[12px] text-[#5b3423]"
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

