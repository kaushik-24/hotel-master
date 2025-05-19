export const adminSidebar = [
    { id: 1, label: 'Dashboard', route: '/admin/dashboard', title: 'Dashboard' },
    { id: 2, label: 'Site Options', route: '/admin/options', title: 'Site Options' },
    {
        id: 3,
        label: 'Rooms',
        title: 'Rooms',
        route: '/admin/rooms',
        subItems: [
            { id: 31, label: 'All Rooms', route: '/admin/rooms', title: 'All Rooms' },
            { id: 32, label: 'Add Room', route: '/admin/rooms/create', title: 'Add Room' },
        ]
    },
    {
        id: 4,
        label: 'Pages',
        route: '/admin/pages',
        title: 'Pages',
        subItems: [
            { id: 31, label: 'Other Pages', route: '/admin/pages', title: 'Other Pages' },
            { id: 32, label: 'Add Page', route: '/admin/pages/create', title: 'Add Page' },
        ]
    },
    { id: 5, label: 'Manage Booking', route: '/admin/manage-booking', title: 'Manage Booking' },
    { id: 6, label: 'Manage User', route: '/admin/users', title: 'Manage User' },
    // { id: 7, label: 'Services', route: '/admin/services', title: 'Services' },
    // { id: 8, label: 'Inquiry', route: '/admin/inquiry', title: 'Inquiry' },
    { id: 9, label: 'User Profile', route: '/admin/profile', title: 'User Profile' },
    { id: 10, label: 'Settings', route: '/admin/setting', title: 'Settings' },
    // { id: 9, label: 'Logout', route: '' },
];