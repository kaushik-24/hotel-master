import { Outlet } from "react-router-dom"
import BookingInquiries from "../organisms/BookingInquiries"
import Footer from "../organisms/Footer"
import RoomNavbar from "../organisms/RoomNavbar"

const RoomTemplate = () => {
    return (
        <div>
            <RoomNavbar />


            <Outlet />


            <BookingInquiries />
            <Footer />
            {/* <BookNow /> */}

        </div>
    )
}

export default RoomTemplate
