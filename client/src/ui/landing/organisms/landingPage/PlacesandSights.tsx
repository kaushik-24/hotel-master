import { image } from "@config/constant/image"

const PlacesandSights = () => {
    return (
        <div className="bg-[#5b3423] flex flex-col justify-center items-center md:flex-row w-full">
            <div className="  ">
                <img src={image?.places} alt="" className=" w-96" />
            </div>

            <div className="  py-20 px-5">
                <h1 className="font-poppins text-[19px] text-[#ffeedc] tracking-widest ">Places & Sights</h1>
                <p className=" text-[#ffeedc] font-nanum text-[55px] max-w-[600px] leading-[1.2] mb-2">Discover the best attractions in Kathmandu with us!</p>

                <p className="max-w-[600px] font-nanum text-[19px] text-[#ffeedc]">
                    Nestled in the heart of the valley, Hotel Shambala serves as the perfect base to explore the city.
                    Whether you seek cultural immersion or serene nature escapes, our location offers a gateway to the
                    rich tapestry of experiences awaiting you just beyond our doors.
                </p>
            </div>
        </div>
    )
}

export default PlacesandSights
