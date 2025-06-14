export const adminSidebar = [
    { id: 1, label: 'Dashboard', route: '/admin/dashboard', title: 'Dashboard' },
    { id: 2, label: 'Site Options', route: '/admin/options', title: 'Site Options' },
    {
        id: 3,
        label: 'Hotel',
        title: 'Rooms',
        route: '/admin/roomType',
        subItems: [
            { id: 31, label: 'Room Type', route: '/admin/roomType', title: 'Room type' },
            { id: 32, label: 'Create Rooms', route: '/admin/rooms/create', title: 'Create rooms' },
        ]
    },
    {
        id: 4,
        label: 'CMS',
        route: '/admin/pages',
        title: 'Pages',
        subItems: [
            { id: 31, label: 'Home', route: '/admin/cms/home', title: 'Home page' },
            { id: 31, label: 'Blogs', route: '/admin/cms/blogs', title: 'Blog page' },
            { id: 32, label: 'Gallery', route: '/admin/cms/gallery', title: 'Gallery Page' },
            { id: 32, label: 'Policies', route: '/admin/cms/policies', title: 'Polices Page' },
            { id: 32, label: 'Reviews', route: '/admin/cms/reviews', title: 'Review Page' },
            { id: 32, label: 'Contact', route: '/admin/cms/contact', title: 'Add Page' },
        ]
    },
    { id: 5, label: 'Bookings', route: '/admin/manage-booking', title: 'Manage Booking' },
    { id: 6, label: 'Manage User', route: '/admin/users', title: 'Manage User' },
    // { id: 7, label: 'Services', route: '/admin/services', title: 'Services' },
    // { id: 8, label: 'Inquiry', route: '/admin/inquiry', title: 'Inquiry' },
    
    { id: 10, label: 'Settings', route: '/admin/setting', title: 'Settings' },
    // { id: 9, label: 'Logout', route: '' },
];
