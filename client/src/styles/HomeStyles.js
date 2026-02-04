export const homeStyles = {
    // --- HERO SECTION ---
    // Deep dark background base
    heroContainer: "h-screen relative font-sans bg-gray-900 overflow-hidden",
    
    // --- THE MAGIC GRADIENT ---
    // This creates 3 glowing orbs (Rose, Purple, Blue) that blend together
    bgImageWrapper: "absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_#3b0764_0%,_#0f172a_100%)]",
    
    // Optional: Add a subtle animated grain or second gradient layer for depth
    // If you want it static, just use the one above.
    // If you want it to look "alive", we can add this as a second div in Home.js
    
    // --- CONTENT OVERLAY ---
    // Removed the heavy black overlay since the background is already dark and clean
   overlay: "absolute top-0 left-0 h-full w-full flex flex-col justify-center px-6 md:px-20 lg:px-40 gap-8 z-10 pt-24",

    // --- TYPOGRAPHY ---
    heroTitle: "text-5xl md:text-8xl font-extrabold uppercase leading-none tracking-tighter text-white drop-shadow-2xl",
    
    // Gradient Text Span (Making it pop against the dark bg)
    brandSpan: "text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400",
    
    heroSubtitle: "text-lg md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed mt-4 border-l-4 border-rose-500 pl-6",
    
    // --- ADMIN SECTION ---
    adminBadge: "inline-flex items-center gap-3 bg-white/10 border border-white/20 text-rose-300 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4 w-fit backdrop-blur-md shadow-lg",
    adminHeading: "text-4xl md:text-5xl font-bold uppercase mb-4 text-white",
    adminSubHeading: "flex items-center gap-3 text-xl text-gray-300 font-medium",

    // --- BUTTONS ---
    // Added a 'glow' effect to the button
    btnPrimary: "group mt-8 bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.5)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3 text-lg w-fit",
};