import { image } from "@config/constant/image"

const Hero = () => {
    return (
        <div className="bg-[#f0e0cf] h-screen w-screen relative">
            <img
                src={image.heroimg}
                alt="Hero in Navbar"
                className="w-full h-full object-cover "
            />
            <div className="absolute top-56 right-10 transform -translate-y-1/2 text-center max-w-md    px-4 py-3 rounded">
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-serif drop-shadow-lg">Find Yourself at Venus</h1>
                <p className="text-white text-lg sm:text-1xl md:text-2xl mt-3 drop-shadow-md">Your Peaceful Oasis in Kathmandu</p>
            </div>
        </div>
    )
}

export default Hero
