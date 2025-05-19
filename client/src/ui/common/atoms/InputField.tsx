import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

interface InputProps {
    name: string;
    type: 'text' | 'password' | 'email' | 'number' | 'date'; // Type can now be explicitly defined
    placeholder?: string;
    autocomplete?: 'on' | 'off';
    disabled?: boolean;
    value?: string; // Controlled input
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange prop
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any;
}

const InputField: React.FC<InputProps> = ({ name, type, placeholder, autocomplete, disabled, value, onChange, register }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autocomplete}
                value={value} // Controlled input value
                onChange={onChange} // onChange handler
                className={`font-poppins w-full text-sm mb-2 pl-10 pr-3 py-2 border-2 border-[#5b3423] rounded-md focus:outline-none ${disabled ? 'cursor-not-allowed' : ''}`}
                {...(register && register(name))} // Register for form handling
            />
            {type === 'password' && (
                <button
                    type="button"
                    className="absolute right-3 top-[12px] text-[#5b3423]"
                    onClick={togglePassword}
                    aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility improvement
                >
                    {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                </button>
            )}
        </div>
    );
};

export default InputField;
