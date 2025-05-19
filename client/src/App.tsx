
import AdminDashboard from "@ui/admin/pages/AdminDashboard"
import AllRooms from "@ui/admin/pages/AllRooms"
import CreatePage from "@ui/admin/pages/CreatePage"
import CreateRoom from "@ui/admin/pages/CreateRoom"
import ManageBooking from "@ui/admin/pages/ManageBooking"
import ManageAdmin from "@ui/admin/pages/ManageUser"
import OtherPages from "@ui/admin/pages/OtherPages"
import SiteOptions from "@ui/admin/pages/SiteOptions"
import UserProfile from "@ui/admin/pages/UserProfile"
import PageNotFound from "@ui/common/pages/PageNotFound"
import AboutUs from "@ui/landing/pages/AboutUs"
import BhrikutiSuite from "@ui/landing/pages/BhrikutiSuite"
import Blogs from "@ui/landing/pages/Blogs"
import Careers from "@ui/landing/pages/Careers"
import Contact from "@ui/landing/pages/Contact"
import Deluxe from "@ui/landing/pages/Deluxe"
import Executive from "@ui/landing/pages/Executive"
import GampoSuite from "@ui/landing/pages/GampoSuite"
import Home from "@ui/landing/pages/Home"
import MediaGallery from "@ui/landing/pages/MediaGallery"
import Policies from "@ui/landing/pages/Policies"
import Reviews from "@ui/landing/pages/Reviews"
import Sustainability from "@ui/landing/pages/Sustainability"
import WenchengSuite from "@ui/landing/pages/WenchengSuite"
import LandingPageTemplate from "@ui/landing/templates/LandingPageTemplate"
import RoomTemplate from "@ui/landing/templates/RoomTemplate"
import Login from "@ui/user/pages/auth/Login"
import SignUp from "@ui/user/pages/auth/SignUp"
import BookingForm from "@ui/user/pages/Booking"
import ScrollToTop from "function/ScrollToTop"
import ProtectedRoute from "ProtectedRoute"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([

  // Landing page
  {
    path: '/',
    element: <>
      <ScrollToTop />
      <LandingPageTemplate />
    </>,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },

      { path: '*', element: <PageNotFound /> },
    ],
  },

  //Room Page
  {
    path: '/rooms',
    element: <>
      <ScrollToTop />
      <RoomTemplate /></>,
    children: [

      { path: '/rooms/deluxe', element: <Deluxe /> },
      { path: '/rooms/executive', element: <Executive /> },
      { path: '/rooms/songtsan-gampo', element: <GampoSuite /> },
      { path: '/rooms/bhrikuti-suite', element: <BhrikutiSuite /> },
      { path: '/rooms/wencheng-suite', element: <WenchengSuite /> },

      { path: '*', element: <PageNotFound /> },
    ],
  },

  //Other navigations
  {
    path: '/',
    element: <>
      <ScrollToTop />
      <RoomTemplate /></>,
    children: [
      // { index: true, element: <AboutUs /> },
      { path: '/about-us', element: <AboutUs /> },
      { path: '/blogs', element: <Blogs /> },
      { path: '/media-gallery', element: <MediaGallery /> },
      { path: '/career', element: <Careers /> },
      { path: '/sustainability', element: <Sustainability /> },
      { path: '/review', element: <Reviews /> },
      { path: '/contact', element: <Contact /> },
      { path: '/hotel-policies', element: <Policies /> },

      { path: '*', element: <PageNotFound /> },
    ],
  },

  {
    path: '/auth',
    element: null,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },

      { path: '*', element: <PageNotFound /> }
    ]
  },

  {
    path: '/',
    element: null,
    children: [
      { index: true, element: <BookingForm /> },
      { path: '/booking', element: <BookingForm /> },

      { path: '*', element: <PageNotFound /> }
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'options', element: <SiteOptions /> },
      { path: 'rooms', element: <AllRooms /> },
      { path: 'rooms/create', element: <CreateRoom /> },
      { path: 'rooms/edit/:roomId', element: <CreateRoom /> }, // Reusing the CreateRoom component for editing
      { path: 'pages', element: <OtherPages /> }, // Reusing the CreateRoom component for editing

      { path: 'pages/create', element: <CreatePage /> },
      { path: 'pages/create', element: <CreatePage /> },
      { path: 'pages/edit/:pageId', element: <CreatePage /> }, // Reusing the CreateRoom component for editing


      { path: 'users', element: <ManageAdmin /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'manage-booking', element: <ManageBooking /> },
    ]
  }


])
function App() {
  return <RouterProvider router={router} />
}


export default App
