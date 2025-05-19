import { media } from "@data/medias"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"

const MediaGallery = () => {
    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">
            <div className="mb-20">
                <RoomHeading headingText="Media" />
                <RoomSlogan slogan="Gallery" />
                <RoomDescription
                    description={"A picture speaks a thousand words. Explore our hotel through stunning photographs."} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-28 py-20 bg-[#ffeedc] ">
                {media.map((item, index) => (
                    <div key={index} className="relative overflow-hidden group">
                        {/* Image with hover effect */}
                        <img
                            src={item.image}
                            alt={`Media ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MediaGallery
