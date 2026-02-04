export const productsHomeStyles = {
    // --- SECTION CONTAINER ---
    sectionContainer: "py-24 bg-white relative",
    
    // --- HEADER SECTION ---
    headerWrapper: "text-center max-w-3xl mx-auto mb-16 px-4",
    
    // The "Star" Badge
    badge: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-bold uppercase tracking-widest mb-6",
    
    // Main Title
    title: "text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4",
    subtitle: "text-xl text-gray-500 font-light",

    // --- PRODUCTS GRID ---
    // Changed w-3/5 to max-w-7xl to use more screen real estate responsibly
    gridContainer: "max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center",

    // --- CTA BUTTON ---
    buttonWrapper: "flex justify-center mt-16",
    viewAllBtn: "bg-gray-900 text-white rounded-full px-10 py-4 font-bold text-lg hover:bg-rose-600 shadow-xl hover:shadow-rose-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3",
};