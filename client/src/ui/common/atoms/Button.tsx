interface IButton {
    type: 'button' | 'submit' | 'reset'
    icon?: React.ReactNode
    buttonText: string
    onClick?: () => void;
}
const Button: React.FC<IButton> = ({ type, icon, buttonText, onClick }) => {
    return (
        <button className='flex items-center justify-center border-2 border-[#5b3423] text-[#5b3423]  rounded-sm py-1 px-4 hover:bg-[#ffeedc] cursor-pointer' type={type} onClick={onClick}>
            {icon}
            <span className='text-sm font-montserrat font-semibold md:text-base  '>{buttonText}</span>
        </button>
    )
}

export default Button
