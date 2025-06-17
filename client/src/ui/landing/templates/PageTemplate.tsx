import { Outlet } from "react-router-dom"
import BookingInquiries from "../organisms/BookingInquiries"
import Footer from "../organisms/Footer"
import RoomNavbar from "../organisms/RoomNavbar"
import Blogs from "../pages/Blogs"

const PageTemplate = () => {
    return (
        <div>
            <RoomNavbar />
            <Outlet />
            <BookingInquiries />
            {/* <BookNow /> */}

        </div>
    )
}

export default PageTemplate
