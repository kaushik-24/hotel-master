import { Link } from "react-router-dom";

interface LogoProps {
    textColor?: string
    onClose?: () => void;
}

const Logo: React.FC<LogoProps> = ({ textColor = "text-[#ffeedc]", onClose }) => {
    return (
        <Link to='/home' onClick={onClose} >
            <div className={`flex items-center gap-x-5 ${textColor}`}>
                <div className="">
                    <h1 className="font-nanum text-6xl itallic">V</h1>
                </div>
                <div className="font-poppins">
                    <p className="uppercase tracking-widest">hotel</p>
                    <p className="uppercase text-3xl tracking-widest">venus</p>
                    <hr />
                    <p className="tracking-widest">Khadbari</p>
                </div>
            </div>

        </Link>

    )
}

export default Logo
