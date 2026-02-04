export const detailsStyles = {
    // --- PAGE LAYOUT ---
    pageContainer: "min-h-screen bg-gray-50 pb-20 font-sans",
    
    // --- HEADER (Gradient Brand) ---
    headerContainer: "bg-gray-900 text-white pt-24 pb-12 px-6 shadow-xl relative overflow-hidden",
    headerBgDecoration: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#4c1d95_0%,_transparent_50%)] opacity-40",
    headerContent: "relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center",
    
    backLink: "absolute top-6 left-6 md:left-20 text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-bold uppercase tracking-wider",
    
    title: "text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg",
    subtitle: "text-lg text-gray-300 font-light max-w-2xl leading-relaxed",

    // --- MAIN CARD ---
    mainWrapper: "max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20",
    cardBody: "bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100",
    
    // Grid for Image vs Content
    contentGrid: "grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8",
    
    // --- LEFT COLUMN (Image) ---
    imageSection: "lg:col-span-5 bg-gray-100 p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-200",
    productImage: "max-h-[500px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500",

    // --- RIGHT COLUMN (Details) ---
    infoSection: "lg:col-span-7 p-8 md:p-12 flex flex-col gap-8",

    // --- SECTIONS ---
    sectionHeader: "flex items-center gap-3 mb-4",
    iconCircle: "h-10 w-10 rounded-full flex items-center justify-center text-lg shadow-sm",
    sectionTitle: "text-xl font-bold text-gray-800 uppercase tracking-wide",
    textBlock: "text-gray-600 leading-relaxed text-lg font-medium",

    // --- ADMIN CONTROLS ---
    adminPanel: "bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in",
    adminLabel: "text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2",
    
    // Buttons
    btnGroup: "flex gap-3",
    btnUpdate: "px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95",
    btnDelete: "px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition active:scale-95",
};