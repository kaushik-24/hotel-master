import Footer from '@ui/landing/organisms/Footer'
import Navbar from '@ui/landing/organisms/Navbar'
import { Outlet } from 'react-router-dom'
import BookingInquiries from '../organisms/BookingInquiries'
import LocationMap from '../molecules/OurLocation'
const LandingPageTemplate = () => {
    return (
        <div>
            <Navbar />

            <Outlet />
            <LocationMap />
            <BookingInquiries />
            <Footer />
            {/* <BookNow /> */}

        </div>
    )
}

export default LandingPageTemplate
