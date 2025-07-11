import { Outlet } from "react-router-dom"
import BookingInquiries from "../organisms/BookingInquiries"
import Footer from "../organisms/Footer"
import RoomNavbar from "../organisms/RoomNavbar"
import Blogs from "../pages/Blogs"
import Navbar from "../organisms/Navbar"

const PageTemplate = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <BookingInquiries />
            <Footer />

        </div>
    )
}

export default PageTemplate
