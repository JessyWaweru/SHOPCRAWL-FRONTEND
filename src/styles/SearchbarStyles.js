export const searchbarStyles = {
    // --- CONTAINER ---
    // White background, rounded pill shape, subtle shadow
    // focus-within:ring... makes it glow pink when you click inside
    container: "flex items-center w-full max-w-2xl bg-white rounded-full shadow-lg border border-gray-200 focus-within:ring-4 focus-within:ring-rose-100 focus-within:border-rose-500 transition-all duration-300 p-1 mx-auto",
    
    // --- SEARCH ICON (Left Side - Optional) ---
    searchIconLeft: "pl-4 text-gray-400 text-lg",

    // --- INPUT FIELD ---
    // Transparent background so it takes the container's color
    input: "flex-1 w-full py-3 px-4 bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium text-lg",
    
    // --- BUTTON (Right Side) ---
    // A circular branded button
    searchBtn: "bg-rose-600 text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-rose-700 transition-all duration-300 shadow-md transform active:scale-95",
    
    // Icon inside button
    btnIcon: "text-lg"
};