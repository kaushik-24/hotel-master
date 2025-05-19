import { useState } from "react";

const SiteHeader = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    return (
        <div>
            <p className="font-poppins text-[0.875rem] mb-2">Header Logo</p>
            <div className="border-[1px] border-[#a5abcc] py-[0.875rem] px-[1.375rem]">
                <input className="font-poppins text-[0.875rem] " type="file" onChange={handleImageChange} />
            </div>

            {/* Show image preview below the input */}
            {selectedImage && (
                <div className="mt-4">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="w-24 h-24 object-cover"
                    />
                </div>
            )}
        </div>
    );
};

export default SiteHeader;
