import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineImage, MdOutlineBedroomParent, MdOutlineInfo,  MdOutlineTravelExplore } from "react-icons/md";

const CmsHomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineImage className="mr-2 text-blue-600" />
            Configure Homepage
          </h2>
                  </div>
        <div className="space-y-6">
          {/* Hero Section Link */}
          <div className="bg-[#e4e4f4] p-4 rounded-md hover:bg-[#d9d9e9] transition-colors">
            <Link to="/admin/cms/home/hero-section" className="flex items-center space-x-4">
              <MdOutlineImage className="text-3xl text-[#019cec]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Hero Section
                </h3>
                <p className="text-sm text-gray-500">
                  Manage the full-screen banner with heading and image
                </p>
              </div>
            </Link>
          </div>
          
          {/* About Us Section Link */}
          <div className="bg-[#e4e4f4] p-4 rounded-md hover:bg-[#d9d9e9] transition-colors">
            <Link to="/admin/cms/home/home-about-us" className="flex items-center space-x-4">
              <MdOutlineInfo className="text-3xl text-[#019cec]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Homepage About-Us Section
                </h3>
                <p className="text-sm text-gray-500">
                  Manage the brief introduction and image below the hero
                </p>
              </div>
            </Link>
          </div>

          {/* Accommodation Section Link */}
          <div className="bg-[#e4e4f4] p-4 rounded-md hover:bg-[#d9d9e9] transition-colors">
            <Link to="/admin/cms/home/accommodation" className="flex items-center space-x-4">
              <MdOutlineBedroomParent className="text-3xl text-[#019cec]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Accommodation 
                </h3>
                <p className="text-sm text-gray-500">
                  Edit heading for accommodation component
                </p>
              </div>
            </Link>
          </div>

          {/* Places and Sights Section Link */}
          <div className="bg-[#e4e4f4] p-4 rounded-md hover:bg-[#d9d9e9] transition-colors">
            <Link to="/admin/cms/home/places-sights" className="flex items-center space-x-4">
              <MdOutlineTravelExplore className="text-3xl text-[#019cec]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Places and Sights 
                </h3>
                <p className="text-sm text-gray-500">
                  Edit heading and sub-headings for Places and sights section 
                </p>
              </div>
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CmsHomePage;
