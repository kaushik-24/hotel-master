import { useLocation } from "react-router-dom";
import SiteFooter from "../organisms/siteOptions/SiteFooter";
import SiteHeader from "../organisms/siteOptions/SiteHeader";
import SiteInfoSection from "../organisms/siteOptions/SiteInfoSection";
import SiteOptionNav from "../organisms/siteOptions/SiteOptionNav";
import SiteSocialMedia from "../organisms/siteOptions/SiteSocialMedia";

const SiteOptions = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab"); // Get the 'tab' parameter from the URL

    const renderTabContent = () => {
        switch (tab) {
            case "header":
                return <SiteHeader />;
            case "footer":
                return <SiteFooter />;
            case "info":
                return <SiteInfoSection />;
            case "social":
                return <SiteSocialMedia />;
            default:
                return <SiteHeader />; // Default to Header if no tab is selected
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-6 ">

            <div className="bg-white px-6   py-5 flex flex-col  rounded-md shadow-md w-full ">
                <div>
                    <p className="font-poppins text-xl font-medium mb-2 ">Site Options</p>
                    <hr className="" />
                    <SiteOptionNav />
                </div>
                <hr />
                <div className="bg-white flex-1 flex p-5  w-full">
                    {renderTabContent()} {/* Render the content based on the selected tab */}
                </div>

            </div>

            <div className="bg-white flex-1 h-20 p-5 rounded-md shadow-md w-full ">
                <button className="p-2 bg-[#6b3aa3] rounded-md text-white font-poppins text-[0.875rem]  ">Update</button>
            </div>
        </div>
    )
}

export default SiteOptions
