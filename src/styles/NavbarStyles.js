export const navbarStyles = {
    // --- MAIN CONTAINER ---
    container: "fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300 h-20",
    innerWrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between",

    // --- LOGO ---
    logoLink: "flex items-center gap-2 group",
    logoBox: "bg-gradient-to-tr from-rose-500 to-purple-600 text-white p-2 rounded-lg shadow-lg group-hover:rotate-3 transition-transform",
    logoText: "text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 tracking-tight",

    // --- NAV ITEMS (Desktop) ---
    desktopMenu: "hidden md:flex items-center gap-2",
    
    // Item Base Style
    navItemBase: "group flex items-center cursor-pointer rounded-xl transition-all duration-300 font-medium px-4 py-2",
    navIcon: "text-lg mr-2 transition-transform group-hover:scale-110",

    // Item Variations
    navItemActive: "bg-rose-50 text-rose-600 font-bold",
    navItemDefault: "text-gray-600 hover:bg-gray-50 hover:text-rose-600",
    navItemOutline: "border-2 border-rose-600 text-rose-600 hover:bg-rose-50",
    navItemButton: "text-white hover:opacity-90 shadow-lg shadow-rose-200", // color injected via props

    // --- AUTH SECTION (Right Side) ---
    authWrapper: "hidden md:flex items-center gap-3",
    logoutBtn: "flex items-center gap-2 bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-600 px-4 py-2 rounded-xl transition-all font-medium",
    
    // Logout Confirmation Box
    confirmBox: "flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200 animate-fade-in",
    cancelBtn: "p-2 text-gray-400 hover:text-gray-600",
    confirmBtn: "bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md hover:bg-red-600",

    // --- MOBILE MENU ---
    mobileToggle: "md:hidden text-gray-600 text-2xl p-2 rounded-lg hover:bg-gray-100 focus:outline-none",
    mobileDrawer: "md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-2 animate-slide-down",
    mobileDivider: "border-gray-100 my-2",
    mobileLogout: "w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold mt-2",
    
    // Mobile Auth Grid
    mobileAuthGrid: "grid grid-cols-2 gap-3 mt-2",
    mobileLoginBtn: "flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl font-bold text-gray-700",
    mobileJoinBtn: "flex items-center justify-center gap-2 bg-rose-600 py-3 rounded-xl font-bold text-white shadow-lg shadow-rose-200"
};