export const highlightStyles = {
    // --- MAIN CONTAINER ---
    // Clean gray background with a subtle pattern, much more professional than a random photo
    sectionContainer: "py-24 bg-gray-50 relative overflow-hidden",
    
    // Background Decorative blob (Optional visual flair)
    bgDecoration: "absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",

    // --- CONTENT GRID ---
    gridContainer: "relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10",
    
    // --- CARD DESIGN ---
    card: "bg-white p-10 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-rose-100/50 group",
    
    // --- ICON CIRCLE ---
    iconWrapper: "h-24 w-24 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 flex items-center justify-center text-4xl mb-8 shadow-inner group-hover:from-rose-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6",
    
    // --- TEXT ---
    title: "text-xl font-extrabold text-gray-800 mb-4 uppercase tracking-wide group-hover:text-rose-600 transition-colors",
    description: "text-gray-500 leading-relaxed font-medium",
    
    // --- DECORATIVE LINE ---
    divider: "w-12 h-1 bg-gray-200 rounded-full mb-4 group-hover:bg-rose-500 transition-colors duration-500"
};