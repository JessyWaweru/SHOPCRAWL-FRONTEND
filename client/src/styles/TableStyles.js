export const tableStyles = {
    // --- CONTAINER ---
    container: "bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden font-sans",
    header: "p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center",
    headerTitle: "text-gray-700 font-bold uppercase text-sm tracking-wider flex items-center gap-2",

    // --- TABLE STRUCTURE ---
    wrapper: "overflow-x-auto",
    table: "min-w-full divide-y divide-gray-200",
    thead: "bg-white",
    th: "px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider",
    tbody: "divide-y divide-gray-200 bg-white",
    
    // --- ROWS ---
    trBase: "transition duration-150",
    trWinner: "bg-green-50/60", // Highlight the #1 result
    trNormal: "hover:bg-gray-50",

    // --- CELLS ---
    td: "px-6 py-4 whitespace-nowrap",
    
    // --- BADGES & ICONS ---
    rankBadge: "h-8 w-8 rounded-full bg-yellow-400 text-white flex items-center justify-center shadow-sm text-sm",
    rankText: "text-gray-400 font-bold text-lg ml-2",
    
    storeDot: "h-2.5 w-2.5 rounded-full mr-2 shadow-sm",
    storeName: "font-bold text-gray-800",
    bestValueBadge: "ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-green-200",
    
    // --- PRICE & DETAILS ---
    priceText: "text-gray-900 font-bold text-lg",
    freeShipText: "text-green-600 font-bold",
    penaltyText: "text-[10px] text-red-500 font-bold block mt-1 flex items-center gap-1",

    // --- PROGRESS BAR ---
    progressBg: "w-full bg-gray-200 rounded-full h-2 overflow-hidden",
    progressScore: "text-xs font-bold text-gray-500 mt-1 block",

    // --- BUTTONS ---
    visitBtn: "text-rose-600 hover:text-white border border-rose-600 hover:bg-rose-600 px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 w-fit ml-auto shadow-sm active:scale-95",
    
    // --- EMPTY STATE ---
    outOfStock: "p-6 bg-red-50 text-red-600 text-center rounded-xl font-bold border border-red-100 m-4 flex items-center justify-center gap-2"
};