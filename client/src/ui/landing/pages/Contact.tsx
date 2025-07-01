import { image } from "@config/constant/image"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"
import ContactInfo from "../molecules/ContactInfo"
import OurLocation from "../molecules/OurLocation"
import { useEffect, useState } from "react"
import axiosInstance from "@services/instance"

interface ContactData {
  heading1: string;
  heading2: string;
  contactImage: string;
}

const Contact = () => {
    
    const [contactData, setContactData] = useState<ContactData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axiosInstance.get("/api/contact");
        setContactData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch contact data");
      }
    };
    fetchContactData();
  }, []);

    return (
        <div className=" bg-[#f6e6d6] flex flex-col justify-center ">
            <div className="mb-10">
                <RoomHeading headingText="Contact" />
                <RoomSlogan slogan="Get in Touch" />
                <RoomDescription
                    description={"Reach out to us for bookings, inquiries and information regarding our services."} />
            </div>

            <div className="px-20 md:px-32 mt-20">
                <img src={image?.contact} alt="" />
            </div>

            <ContactInfo />

            <OurLocation />

        </div>
    )
}

export default Contact
