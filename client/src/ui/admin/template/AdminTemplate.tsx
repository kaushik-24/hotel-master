import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";
import Sidebar from "../organisms/Sidebar";

const AdminTemplate = () => {

    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#f4f5fa]">
                <Navbar  />
                <div className="flex flex-1 py-6">
                    <Sidebar  />
                    <div className={`flex flex-col flex-1 mx-6  transition-all duration-300 `}>
                        <div className={`flex-1 overflow-auto mb-6 transition-all duration-300  `}>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminTemplate;
