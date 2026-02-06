export const productsListStyles = {
    // --- PAGE LAYOUT ---
    // Added pt-28 to push content below the fixed Navbar + some breathing room
    pageContainer: "min-h-screen bg-gray-50 pt-28 pb-20 font-sans",
    
    // --- HEADER SECTION ---
    headerContainer: "max-w-4xl mx-auto text-center mb-12 px-6",
    
    // Badge (The Fire Icon)
    badge: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold uppercase tracking-widest mb-6 border border-orange-200 shadow-sm",
    
    // Typography
    title: "text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4",
    subtitle: "text-lg text-gray-500 font-medium max-w-2xl mx-auto",

    // --- SEARCH BAR WRAPPER ---
    searchSection: "max-w-2xl mx-auto mb-16 px-4 relative z-10",

    // --- PRODUCT GRID ---
    // Responsive: 1 col (phone), 2 (tablet), 3 (laptop), 4 (large screen)
    gridContainer: "max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center",

    // --- EMPTY STATE ---
    emptyStateContainer: "col-span-full flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm p-8",
    emptyIcon: "text-gray-300 text-6xl mb-4",
    emptyTitle: "text-xl font-bold text-gray-800 mb-2",
    emptyText: "text-gray-500 max-w-md",
};