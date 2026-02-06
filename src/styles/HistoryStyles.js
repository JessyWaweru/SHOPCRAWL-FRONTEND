export const historyStyles = {
    // --- LAYOUT & BACKGROUND ---
    // A professional radial gradient (Rose to Slate) - Looks like high-end software
    pageContainer: "min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50 via-gray-100 to-gray-200 flex flex-col items-center p-4 md:p-10 font-sans",
    
    // --- MAIN CARD (Glassmorphism) ---
    mainCard: "relative z-10 bg-white/80 backdrop-blur-2xl p-6 md:p-10 rounded-3xl shadow-2xl shadow-gray-200/50 w-full max-w-7xl mt-8 border border-white/60 animate-fade-in-up",
    
    // --- HEADER ---
    headerRow: "flex flex-col md:flex-row items-center justify-between mb-10 border-b border-gray-200/60 pb-6 gap-6",
    titleGroup: "flex items-center gap-5",
    iconBox: "h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center text-2xl shadow-lg",
    titleText: "text-3xl font-extrabold text-gray-800 tracking-tight",
    subTitle: "text-gray-500 font-medium",
    
    // --- BADGE ---
    limitBadge: "bg-white border border-gray-200 px-5 py-3 rounded-xl flex items-center gap-3 shadow-sm",
    
    // --- LOADING ---
    loadingContainer: "flex flex-col items-center justify-center py-32",
    loadingIcon: "text-5xl text-rose-600 mb-6",
    loadingText: "text-gray-500 text-lg font-medium animate-pulse",

    // --- EMPTY STATE ---
    emptyContainer: "text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-300",
    emptyIconCircle: "h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 text-3xl shadow-sm border border-gray-100",
    emptyTitle: "text-2xl font-bold text-gray-800 mb-2",
    emptyText: "text-gray-500 mb-8 max-w-md mx-auto",
    browseBtn: "bg-rose-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-rose-700 transition shadow-lg hover:shadow-rose-300 flex items-center gap-2 mx-auto transform hover:-translate-y-1",

    // --- GRID LAYOUT ---
    gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
    
    // --- ITEM CARD WRAPPER ---
    itemWrapper: "group relative flex flex-col",
    dateBadge: "absolute -top-3 left-4 z-20 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-2 ring-2 ring-white",
    cardHoverEffect: "transform transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl rounded-2xl bg-white"
};