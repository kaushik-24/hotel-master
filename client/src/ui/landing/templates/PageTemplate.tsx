import { Outlet } from "react-router-dom"
import BookingInquiries from "../organisms/BookingInquiries"
import Footer from "../organisms/Footer"
import RoomNavbar from "../organisms/RoomNavbar"

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
