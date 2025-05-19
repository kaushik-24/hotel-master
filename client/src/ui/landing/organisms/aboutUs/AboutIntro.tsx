import { image } from "@config/constant/image"
import RoomDescription from "@ui/landing/atoms/RoomDescription"
import RoomHeading from "@ui/landing/atoms/RoomHeading"
import RoomSlogan from "@ui/landing/atoms/RoomSlogan"

const AboutIntro = () => {
    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">

            <div>
                <RoomHeading headingText={<>Your Peaceful <br />  Abode in the City</>} headingSize="text-[55px] md:text-[66px]" />
                <RoomSlogan slogan="find yourself at venus" />
                <RoomDescription
                    description={"Nestled in the heart of the Kathmandu Valley, Hotel Venus stands just beyond the bustling Ring Road that encircles the city."} />
            </div>

            <div className="bg-[#ffeedc] ">
                <div className="px-5 md:px-20 py-5  object-cover">
                    <img src={image?.aboutUs} alt="" />
                </div>
            </div>

            <div className="flex flex-col bg-[#ffeedc] ">

                <RoomHeading headingText={<>Tibetan Traditions.Global Comforts. <br />Peace Amidst The City Bustle.</>} headingSize={"text-[32px] md:text-[42px]"} />

                <div className="flex justify-center items-center flex-col md:flex-row gap-y-5  md:gap-x-5 px-10 w-full my-10">
                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        The hotel shares the prestigious Embassy Road alongside prominent embassies and businesses,
                        and is a mere 20-minute drive from the international airport, and a 10-minute drive away from
                        the city center and major tourist attractions. Despite its central location, Hotel Shambala serves
                        as an oasis of tranquility for all who arrive here making it an excellent choice for those seeking a
                        comfortable stay in Kathmandu.
                    </p>

                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        At Hotel Shambala, we believe that every journey is an opportunity for self-discovery and
                        rejuvenation. Our mantra, “Find yourself at Shambala,” encapsulates the essence of our Tibetan boutique hotel.
                        Here, we invite our guests to embark on a transformative journey – physically, spiritually, and mentally.
                        It is a space of rest, recovery, and profound introspection, all woven into the tapestry of contemporary comfort
                        and timeless Tibetan values.
                    </p>
                </div>
            </div>


        </div>
    )
}

export default AboutIntro
