import { rooms } from '@data/rooms';
import RoomFeatureIcons from '@ui/common/atoms/RoomFeatureIcons';
import React, { useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const RoomsCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex(prevIndex =>
            prevIndex === 0 ? rooms.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex(prevIndex =>
            prevIndex === rooms.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToIndex = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative flex flex-col justify-center gap-y-10 w-full">
            <div className="flex flex-col md:flex-row px-20 items-center">
                <div className="flex-1">
                    {/* Room Image */}
                    <img
                        src={rooms[activeIndex].roomImage}
                        alt={rooms[activeIndex].name}
                        className="w-96 md:w-full h-80 object-cover"
                    />
                </div>

                {/* Room Details */}
                <div className="flex-1 md:ml-20 mt-4">
                    <h2 className="text-[42px] text-[#4f2f1f] font-nanum">{rooms[activeIndex].name}</h2>
                    <p className="max-w-[285px] font-poppins text-[17px] mb-5">{rooms[activeIndex].description}</p>
                    <ul className="grid grid-cols-2 max-w-[300px] gap-y-3 mb-3">
                        {rooms[activeIndex].features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                                <RoomFeatureIcons feature={feature} />
                                <span className="ml-2">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Link to={rooms[activeIndex].readMore}>
                        <button
                            className="uppercase font-poppins tracking-widest border-2 border-[#5b3423] text-[12px] text-[#5b3423] px-3 py-3 
                            hover:bg-[#5b3423] hover:text-[#ffeedc]"
                        >
                            Read More
                        </button>
                    </Link>
                </div>
            </div>

            {/* Navigation Circles */}
            <div className="flex justify-center mt-4">
                {rooms.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToIndex(idx)}
                        className={`w-3 h-3 rounded-full mx-1 ${activeIndex === idx ? "bg-[#5b3423]" : "border-[1px] border-[#5b3423]"}`}
                    ></button>
                ))}
            </div>

            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#4f2f1f] px-2 py-1"
            >
                <GoChevronLeft size={30} />
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#4f2f1f] px-2 py-1"
            >
                <GoChevronRight size={30} />
            </button>
        </div>
    );
};

export default RoomsCarousel;
