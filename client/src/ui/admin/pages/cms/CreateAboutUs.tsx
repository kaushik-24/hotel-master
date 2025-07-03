import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineImage, MdOutlineBedroomParent, MdOutlineInfo,  MdOutlineTravelExplore } from "react-icons/md";

const CmsAboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineImage className="mr-2 text-blue-600" />
            Configure AboutUs Page 
          </h2>
                  </div>
        <div className="space-y-6">
          {/* Intro Section Link */}
          <div className="bg-[#e4e4f4] p-4 rounded-md hover:bg-[#d9d9e9] transition-colors">
            <Link to="/admin/cms/aboutUs/intro" className="flex items-center space-x-4">
              <MdOutlineImage className="text-3xl text-[#019cec]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                 About Intro 
                </h3>
                <p className="text-sm text-gray-500">
                  Manage the banner with heading and image
                </p>
              </div>
            </Link>
          </div>
          
          {/* History Section Link */}
          <div className="bg-[#e4e4f4] p-4 rounded-md hover:bg-[#d9d9e9] transition-colors">
            <Link to="/admin/cms/aboutUs/history" className="flex items-center space-x-4">
              <MdOutlineInfo className="text-3xl text-[#019cec]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                 History Section 
                </h3>
                <p className="text-sm text-gray-500">
                  Manage the brief introduction and history of the hotel 
                </p>
              </div>
            </Link>
          </div>
         
          {/* Quest & Values Section Link */}
          <div className="bg-[#e4e4f4] p-4 rounded-md hover:bg-[#d9d9e9] transition-colors">
            <Link to="/admin/cms/aboutUs/questValues" className="flex items-center space-x-4">
              <MdOutlineTravelExplore className="text-3xl text-[#019cec]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Quest and Values 
                </h3>
                <p className="text-sm text-gray-500">
                 Edit Quest and values 
                </p>
              </div>
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CmsAboutPage;

