import Footer from '@ui/landing/organisms/Footer'
import Navbar from '@ui/landing/organisms/Navbar'
import { Outlet } from 'react-router-dom'
import BookingInquiries from '../organisms/BookingInquiries'
const LandingPageTemplate = () => {
    return (
        <div>
            <Navbar />

            <Outlet />
            <BookingInquiries />
            <Footer />
            {/* <BookNow /> */}

        </div>
    )
}

export default LandingPageTemplate
