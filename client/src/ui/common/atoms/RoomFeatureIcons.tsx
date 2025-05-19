import { roomFeatureImages } from "@config/constant/roomIconImage";

const RoomFeatureIcons = ({ feature }: { feature: string }) => {
    // Use the feature name to find the corresponding image source
    const imageSrc = roomFeatureImages[feature];

    // Render the image if found; otherwise, render a default icon or placeholder
    return (
        <img src={imageSrc} alt={feature} className="w-5 h-5 mr-2" />
    );
};

export default RoomFeatureIcons