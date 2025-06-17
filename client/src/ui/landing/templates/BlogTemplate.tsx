import { Outlet } from "react-router-dom"
import BookingInquiries from "../organisms/BookingInquiries"
import RoomNavbar from "../organisms/RoomNavbar"

const BlogTemplate = () => {
    return (
        <div>
            <RoomNavbar />
            <Outlet />

            <BookingInquiries />
            {/* <BookNow /> */}

        </div>
    )
}

export default BlogTemplate

