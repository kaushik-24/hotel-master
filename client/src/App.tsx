
import AccommodationForm from "@ui/admin/organisms/accommodation"
import CreateBlogPost from "@ui/admin/organisms/blogPost"
import CreateAdmin from "@ui/admin/organisms/CreateAdmin"
import HeroSection from "@ui/admin/organisms/HeroSection"
import HomeAboutUsForm from "@ui/admin/organisms/homeAboutUs"
import OfflineBookingForm from "@ui/admin/organisms/OfflineBooking"
import PlacesSights from "@ui/admin/organisms/placesSights"
import AdminDashboard from "@ui/admin/pages/AdminDashboard"
import AllHallNumbers from "@ui/admin/pages/AllHallNumbers"
import AllHalls from "@ui/admin/pages/AllHalls"
import AllPolicies from "@ui/admin/pages/AllPolicy"
import AllRooms from "@ui/admin/pages/AllRooms"
import AllRoomTypes from "@ui/admin/pages/AllRoomTypes"
import AllBlogPosts from "@ui/admin/pages/cms/CreateBlogs"
import GalleryComponent from "@ui/admin/pages/cms/CreateGallery"
import CmsHomePage from "@ui/admin/pages/cms/HomeConfigs"
import CreateHallNumber from "@ui/admin/pages/CreateHalls"
import CreateHall from "@ui/admin/pages/CreateHallTypes"
import CreatePage from "@ui/admin/pages/CreatePage"
import CreatePolicy from "@ui/admin/pages/CreatePolicy"
import CreateRooms from "@ui/admin/pages/CreateRooms"
import CreateRoomType from "@ui/admin/pages/CreateRoomType"
import ManageBooking from "@ui/admin/pages/ManageBooking"
import ManageAdmin from "@ui/admin/pages/ManageUser"
import RoomSettings from "@ui/admin/pages/RoomSettings"
import SiteOptions from "@ui/admin/pages/SiteOptions"
import UserProfile from "@ui/admin/pages/UserProfile"
import PageNotFound from "@ui/common/pages/PageNotFound"
import BookingInquiries from "@ui/landing/organisms/BookingInquiries"
import RoomNavbar from "@ui/landing/organisms/RoomNavbar"
import AboutUs from "@ui/landing/pages/AboutUs"
import Blogs from "@ui/landing/pages/Blogs"
import Careers from "@ui/landing/pages/Careers"
import Contact from "@ui/landing/pages/Contact"
import DynamicBlogPage from "@ui/landing/pages/DynamicBlogPostPage"
import DynamicHallPage from "@ui/landing/pages/DynamicHallPage"
import DynamicPolicyPage from "@ui/landing/pages/DynamicPolicyPage"
import DynamicRoomPage from "@ui/landing/pages/DynamicRoomPage"
import Home from "@ui/landing/pages/Home"
import GalleryDisplay from "@ui/landing/pages/MediaGallery"
import PoliciesPage from "@ui/landing/pages/Policies"
import Policies from "@ui/landing/pages/Policies"
import Reviews from "@ui/landing/pages/Reviews"
import Sustainability from "@ui/landing/pages/Sustainability"
import BillTemplate from "@ui/landing/templates/BillTemplate"
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

  //Hall Page
  {
    path: '/halls',
    element: <>
      <ScrollToTop />
      <PageTemplate />
    </>,
    children: [
      { path: ":slug", element: <DynamicHallPage /> },

      { path: '*', element: <PageNotFound /> },
    ],
  },

  //Policies Page
  {
    path: '/policy',
    element: <>
      <ScrollToTop />
      <RoomNavbar />
      <PoliciesPage />
      <BookingInquiries />
    </>,
  },
  
   //Policy Posts
  {
    path: '/policy/:slug', element:
    <>
    <RoomNavbar />
    <DynamicPolicyPage />
    <BookingInquiries />
    </>
  },

  //Blogs Page
  {
    path: '/blogs',
    element: <>
      <ScrollToTop />
      <RoomNavbar />
      <Blogs />
      <BookingInquiries />
    </>,
  },

  //Blog Posts
  {
    path: '/blogs/:slug', element:
    <>
    <RoomNavbar />
    <DynamicBlogPage />
    <BookingInquiries />
    </>
  },
  
  //Other navigations
  {
    path: '/',
    element: <>
      <ScrollToTop />
      <PageTemplate /></>,
    children: [
      // { index: true, element: <AboutUs /> },
      { path: '/blogs', element: <Blogs />},
      { path: '/booking', element: <BookingForm /> },
      { path: '/bill', element: <BillTemplate />},
      { path: '/about-us', element: <AboutUs /> },
      { path: '/media-gallery', element: <GalleryDisplay /> },
      { path: '/career', element: <Careers /> },
      { path: '/sustainability', element: <Sustainability /> },
      { path: '/review', element: <Reviews /> },
      { path: '/contact', element: <Contact /> },
      { path: '/policy', element: <Policies /> },

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
      { path: '/admin/hotel',
        children: [
      { path: 'roomType', element: <AllRoomTypes /> },
      { path: 'roomType/create', element: <CreateRoomType /> },
      { path: 'roomType/edit/:roomTypeId', element: <CreateRoomType /> }, // Reusing the CreateRoom component for editing
      { path: 'rooms', element: <AllRooms /> },
      { path: 'rooms/create', element: <CreateRooms /> },
      { path: 'rooms/edit/:roomId', element: <CreateRooms /> },
      { path: 'halls', element: <AllHalls /> },
      { path: 'halls/create', element: <CreateHall /> },
      { path: 'halls/edit/:hallId', element: <CreateHall /> },
      { path: 'hallNumber', element: <AllHallNumbers /> },
      { path: 'hallNumber/create', element: <CreateHallNumber /> },
      { path: 'hallNumber/edit/:hallNumberId', element: <CreateHallNumber /> },
      ]},      
      {
        path: '/admin/cms',
        children: [
      { path: 'home', element: <CmsHomePage /> }, // Reusing the CreateRoom component for editing
      { path: 'blogs', element: <AllBlogPosts /> },
      { path: 'blogs/create', element: <CreateBlogPost /> },
      { path: 'blogs/edit/:blogPostId', element: <CreateBlogPost /> },
      { path: 'gallery', element: <GalleryComponent /> },
      { path: 'policy', element: <AllPolicies /> },
      { path: 'policy/create', element: <CreatePolicy /> },
      { path: 'policy/edit/:policyId', element: <CreatePolicy /> },

      ]
      },
      {
        path: '/admin/cms/home',
        children: [
          {path: 'hero-section', element: <HeroSection />},
          {path: 'home-about-us', element: <HomeAboutUsForm />},
          {path: 'accommodation', element: <AccommodationForm />},
          {path: 'places-sights', element: <PlacesSights />},
        ]
      },
            { path: 'pages/create', element: <CreatePage /> },
      { path: 'pages/edit/:pageId', element: <CreatePage /> }, // Reusing the CreateRoom component for editing


      { path: 'users', element: <ManageAdmin /> },
      { path: 'users/create', element: <CreateAdmin /> },
      { path: 'users/edit/:id', element: <CreateAdmin /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'manage-booking', element: <ManageBooking /> },
      { path: 'offlineBooking', element: <OfflineBookingForm /> },
      { path: 'setting', element: <RoomSettings />}
    ]
  }


])
function App() {
  return <RouterProvider router={router} />
}


export default App
