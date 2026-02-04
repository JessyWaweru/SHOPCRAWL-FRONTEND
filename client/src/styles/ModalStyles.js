export const modalStyles = {
    // --- OVERLAY (The dark background) ---
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 p-4",
    
    // --- MAIN BOX ---
    container: "bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative transform transition-all scale-100 border border-gray-100",
    
    // --- HEADER CONTENT ---
    headerWrapper: "text-center mb-8",
    
    // The Big Red Icon Circle
    iconCircle: "bg-red-50 text-red-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 border border-red-100 shadow-sm",
    iconSize: "text-3xl",
    
    // Text
    title: "text-2xl font-extrabold text-gray-900 tracking-tight",
    message: "text-gray-500 mt-3 text-sm leading-relaxed font-medium",
    
    // --- BUTTONS ---
    buttonGroup: "flex flex-col-reverse md:flex-row gap-3 justify-center",
    
    btnCancel: "px-6 py-3.5 rounded-xl text-gray-600 font-bold bg-gray-50 hover:bg-gray-100 hover:text-gray-800 transition active:scale-95 border border-gray-200 w-full md:w-auto",
    
    btnDelete: "px-6 py-3.5 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-lg shadow-red-200 active:scale-95 w-full md:w-auto",
    
    // --- CLOSE X BUTTON ---
    closeBtn: "absolute top-5 right-5 text-gray-300 hover:text-gray-500 transition p-2 hover:bg-gray-50 rounded-full"
};