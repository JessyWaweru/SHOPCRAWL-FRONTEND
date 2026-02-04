export const productFormStyles = {
    // --- PAGE LAYOUT ---
    pageContainer: "min-h-screen bg-gray-50 font-sans pb-20",
    
    // --- HEADER (Gradient) ---
    // Added pt-24 to account for the fixed Navbar
    header: "bg-gradient-to-r from-rose-600 to-purple-800 pb-24 pt-24 px-4 shadow-lg",
    headerContent: "max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-white gap-4",
    backLink: "inline-flex items-center gap-2 text-rose-100 hover:text-white transition mb-2 font-medium text-sm uppercase tracking-wide",
    title: "text-3xl md:text-4xl font-extrabold tracking-tight",
    subtitle: "text-rose-100 opacity-80 mt-1 text-sm md:text-base",

    // --- FORM CONTAINER ---
    // Negative margin pulls it up over the header
    formContainer: "max-w-5xl mx-auto px-4 -mt-16 relative z-10",
    
    // --- ERROR BANNER ---
    errorBanner: "bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-md mb-6 animate-pulse flex flex-col",

    // --- SECTIONS ---
    sectionCard: "bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 mb-8",
    sectionTitle: "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3",
    
    // --- INPUTS ---
    inputGroup: "mb-0",
    label: "block text-sm font-bold text-gray-700 mb-2 ml-1",
    inputWrapper: "relative",
    inputIcon: "absolute left-4 top-4 text-gray-400 z-10",
    // Base input style
    inputField: "w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all font-medium text-gray-700 placeholder-gray-400",
    inputWithIcon: "pl-12", // Add this class if the input has an icon

    // --- VENDOR CARD ---
    vendorCard: "bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-rose-200 hover:shadow-lg transition-all duration-300",
    vendorTitle: "text-lg font-bold mb-4 uppercase flex items-center gap-2",
    vendorGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4",
    vendorLabel: "text-xs font-bold text-gray-500 uppercase mb-1 block",

    // --- SUBMIT BUTTON ---
    buttonWrapper: "flex justify-end",
    submitBtn: "px-8 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95",
    btnActive: "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200",
    btnDisabled: "bg-gray-300 text-gray-500 cursor-not-allowed"
};