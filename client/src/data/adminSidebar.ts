export const adminSidebar = [
    { id: 1, label: 'Dashboard', route: '/admin/dashboard', title: 'Dashboard' },
    { id: 2, label: 'Site Options', route: '/admin/options', title: 'Site Options' },
    {
        id: 3,
        label: 'Hotel',
        title: 'Rooms',
        route: '/admin/hotel/roomType',
        subItems: [
            { id: 31, label: 'Room Type', route: '/admin/hotel/roomType', title: 'Room type' },
            { id: 32, label: 'Create Rooms', route: '/admin/hotel/rooms', title: 'Create rooms' },
            { id: 33, label: 'Hall Type', route: '/admin/hotel/halls', title: 'Hall Type' },
            { id: 34, label: 'Create Hall ', route: '/admin/hotel/hallNumber', title: 'Hall Type' },
        ]
    },
    {
        id: 4,
        label: 'CMS',
        route: '/admin/cms/home',
        title: 'Pages',
        subItems: [
            { id: 41, label: 'Home', route: '/admin/cms/home', title: 'Home page' },
            { id: 43, label: 'Blogs', route: '/admin/cms/blogs', title: 'Blog page' },
            { id: 43, label: 'Gallery', route: '/admin/cms/gallery', title: 'Gallery Page' },
            { id: 44, label: 'Policies', route: '/admin/cms/policies', title: 'Polices Page' },
            { id: 45, label: 'Reviews', route: '/admin/cms/reviews', title: 'Review Page' },
            { id: 46, label: 'Contact', route: '/admin/cms/contact', title: 'Add Page' },
        ]
    },
    { id: 5, label: 'Bookings', route: '/admin/manage-booking', title: 'Manage Booking' },
    { id: 6, label: 'Manage User', route: '/admin/users', title: 'Manage User' },
    // { id: 7, label: 'Services', route: '/admin/services', title: 'Services' },
    // { id: 8, label: 'Inquiry', route: '/admin/inquiry', title: 'Inquiry' },
    
    { id: 10, label: 'Settings', route: '/admin/setting', title: 'Settings' },
    // { id: 9, label: 'Logout', route: '' },
];
