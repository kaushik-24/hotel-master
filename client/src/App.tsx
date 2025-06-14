
import CreateAdmin from "@ui/admin/organisms/CreateAdmin"
import AdminDashboard from "@ui/admin/pages/AdminDashboard"
import AllRooms from "@ui/admin/pages/AllRooms"
import AllRoomTypes from "@ui/admin/pages/AllRoomTypes"
import CreatePage from "@ui/admin/pages/CreatePage"
import CreateRooms from "@ui/admin/pages/CreateRooms"
import CreateRoomType from "@ui/admin/pages/CreateRoomType"
import ManageBooking from "@ui/admin/pages/ManageBooking"
import ManageAdmin from "@ui/admin/pages/ManageUser"
import OtherPages from "@ui/admin/pages/OtherPages"
import RoomSettings from "@ui/admin/pages/RoomSettings"
import SiteOptions from "@ui/admin/pages/SiteOptions"
import UserProfile from "@ui/admin/pages/UserProfile"
import PageNotFound from "@ui/common/pages/PageNotFound"
import AboutUs from "@ui/landing/pages/AboutUs"
import BhrikutiSuite from "@ui/landing/pages/BhrikutiSuite"
import Blogs from "@ui/landing/pages/Blogs"
import Careers from "@ui/landing/pages/Careers"
import Contact from "@ui/landing/pages/Contact"
import Deluxe from "@ui/landing/pages/Deluxe"
import DynamicPage from "@ui/landing/pages/DynamicPage"
import DynamicRoomPage from "@ui/landing/pages/DynamicRoomPage"
import Executive from "@ui/landing/pages/Executive"
import GampoSuite from "@ui/landing/pages/GampoSuite"
import Home from "@ui/landing/pages/Home"
import MediaGallery from "@ui/landing/pages/MediaGallery"
import Policies from "@ui/landing/pages/Policies"
import Reviews from "@ui/landing/pages/Reviews"
import Sustainability from "@ui/landing/pages/Sustainability"
import WenchengSuite from "@ui/landing/pages/WenchengSuite"
import LandingPageTemplate from "@ui/landing/templates/LandingPageTemplate"
import PageTemplate from "@ui/landing/templates/PageTemplate"
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
      <PageTemplate /></>,
    children: [
      { path: ":slug", element: <DynamicRoomPage /> },

      { path: '*', element: <PageNotFound /> },
    ],
  },

  //Other navigations
  {
    path: '/',
    element: <>
      <ScrollToTop />
      <PageTemplate /></>,
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
      { path: 'roomType', element: <AllRoomTypes /> },
      { path: 'roomType/create', element: <CreateRoomType /> },
      { path: 'roomType/edit/:roomTypeId', element: <CreateRoomType /> }, // Reusing the CreateRoom component for editing
      { path: 'rooms', element: <AllRooms /> },
      { path: 'rooms/create', element: <CreateRooms /> },
      { path: 'rooms/edit/:roomId', element: <CreateRooms /> },
      {
        path: '/admin/cms',
        children: [
      { path: 'home', element: <OtherPages /> }, // Reusing the CreateRoom component for editing
      ]
      },
      { path: 'pages/create', element: <CreatePage /> },
      { path: 'pages/edit/:pageId', element: <CreatePage /> }, // Reusing the CreateRoom component for editing


      { path: 'users', element: <ManageAdmin /> },
      { path: 'users/create', element: <CreateAdmin /> },
      { path: 'users/edit/:id', element: <CreateAdmin /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'manage-booking', element: <ManageBooking /> },
      { path: 'setting', element: <RoomSettings />}
    ]
  }


])
function App() {
  return <RouterProvider router={router} />
}


export default App
