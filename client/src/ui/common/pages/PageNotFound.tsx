import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#ffeedc] text-[#5b3423]">
            <h1 className="text-[100px] font-nanum font-bold">404</h1>
            <p className="text-[24px] font-poppins mt-4">Oops! Page Not Found</p>
            <p className="text-[17px] font-poppins mt-2 max-w-[400px] text-center">
                The page you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Link to="/home">
                <button className="mt-8 px-8 py-3 border-2 border-[#5b3423] text-[#5b3423] font-poppins text-[14px] uppercase tracking-widest hover:bg-[#5b3423] hover:text-[#ffeedc]">
                    Back to Home
                </button>
            </Link>
        </div>
    )
}

export default PageNotFound
