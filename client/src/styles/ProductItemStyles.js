export const productItemStyles = {
    // --- MAIN CARD CONTAINER ---
    // Added 'h-full' to ensure cards in a grid row match height
    container: "group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden w-full max-w-[300px] mx-auto border border-gray-100 flex flex-col h-full",

    // --- IMAGE AREA ---
    imageWrapper: "relative h-56 w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4",
    productImage: "h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply",
    
    // --- BADGES ---
    storeBadge: "absolute top-3 right-3 bg-gray-900/90 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm z-10 uppercase tracking-wide backdrop-blur-sm",

    // --- HOVER OVERLAY (The 'Eye' Button) ---
    overlay: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]",
    viewBtn: "bg-white text-gray-900 p-3.5 rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl",
    viewIcon: "text-lg",

    // --- DETAILS SECTION ---
    detailsContainer: "p-4 flex flex-col flex-grow justify-between text-center",
    
    // Typography
    title: "text-gray-800 font-bold text-sm truncate mb-2 group-hover:text-rose-600 transition-colors",
    priceWrapper: "mt-auto",
    priceText: "font-extrabold text-lg tracking-tight",
    // Dynamic Price Colors
    priceActive: "text-rose-600",
    priceSoldOut: "text-gray-400 italic",
    
    compareText: "text-[10px] text-gray-400 uppercase tracking-wide font-bold mt-1 bg-gray-50 inline-block px-2 py-0.5 rounded-full"
};