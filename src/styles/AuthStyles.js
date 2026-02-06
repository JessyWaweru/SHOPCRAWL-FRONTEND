export const authStyles = {
    // --- LAYOUT ---
    // p-4 on mobile ensures the card doesn't touch the screen edges
    container: "min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans",
    
    // flex-col (Mobile: Stacked) -> md:flex-row (Desktop: Side-by-Side)
    card: "w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up",
    
    // --- LEFT SIDE: BRANDING ---
    // p-8 on mobile (smaller), p-12 on desktop (larger)
    // min-h-[200px] ensures the gradient shows nicely on mobile even if empty
    brandSection: "w-full md:w-1/2 bg-gradient-to-br from-rose-600 to-purple-800 p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden gap-6 min-h-[200px]",
    
    brandPattern: "absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_1px,_transparent_1px)] [background-size:24px_24px]", 
    brandContent: "relative z-10",
    quote: "text-lg font-medium leading-relaxed opacity-90 italic hidden md:block", // Hide long quotes on mobile to save space
    author: "block mt-4 text-sm font-bold uppercase tracking-wider opacity-75 hidden md:block",
    
    // --- RIGHT SIDE: FORM ---
    // p-6 on mobile, p-14 on desktop
    formSection: "w-full md:w-1/2 p-6 md:p-14 flex flex-col justify-center bg-white",
    
    // --- TYPOGRAPHY ---
    headerTitle: "text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight",
    headerSub: "text-gray-500 mt-2 text-sm md:text-base mb-6 md:mb-8",
    
    // --- INPUTS ---
    inputGroup: "mb-4 md:mb-5", 
    label: "block text-sm font-bold text-gray-700 mb-2 ml-1",
    inputWrapper: "relative", 
    inputIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10",
    eyeIcon: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-rose-600 transition z-10 p-2", // Increased hit area for mobile touch
    
    inputField: "w-full pl-12 pr-12 py-3 md:py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all duration-200 font-medium text-gray-700 placeholder-gray-400 text-sm md:text-base",

    // --- BUTTONS ---
    btnPrimary: "w-full bg-rose-600 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-700 hover:shadow-rose-400/40 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] flex justify-center items-center gap-2 text-base md:text-lg mt-4",
    btnDisabled: "w-full bg-gray-300 text-gray-500 font-bold py-3 md:py-4 rounded-xl cursor-not-allowed flex justify-center items-center gap-2 mt-4",
    
    // --- LINKS ---
    linkText: "text-rose-600 font-bold hover:underline transition ml-1",
    forgotPass: "text-sm text-rose-600 font-semibold hover:text-rose-800 transition block text-right mt-2 mb-2",
    footerText: "text-center text-gray-500 text-sm mt-6 md:mt-8"
};