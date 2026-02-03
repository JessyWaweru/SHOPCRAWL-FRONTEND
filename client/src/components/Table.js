import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faExternalLinkAlt, faTruck, faMoneyBillWave, faTrophy, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function Table({ product }) {
    
    // 1. DATA PREPARATION
    const rawStores = [
        { name: "Amazon", color: "bg-orange-500", url: "https://amazon.com", data: product.amazon_data },
        { name: "Jumia", color: "bg-black", url: "https://jumia.co.ke", data: product.jumia_data },
        { name: "Kilimall", color: "bg-purple-600", url: "https://kilimall.co.ke", data: product.kilimall_data },
        { name: "Shopify", color: "bg-green-600", url: "#", data: product.shopify_data },
    ];

    const activeStores = rawStores
        .filter(store => store.data && store.data.price > 0)
        .map(store => ({
            name: store.name,
            color: store.color,
            url: store.url,
            price: parseFloat(store.data.price),
            rating: parseFloat(store.data.rating || 0), // Assumes 0-10 scale
            shipCost: parseFloat(store.data.shipping_cost || 0),
            shipDays: parseFloat(store.data.shipping_days || 7) 
        }));

    if (activeStores.length === 0) {
        return <div className="p-4 bg-red-50 text-red-600 text-center rounded-lg">Out of Stock Everywhere</div>;
    }

    // 2. ALGORITHM: "Quality-First" Logic
    
    // A. Baselines
    const storesWithTotal = activeStores.map(s => ({ ...s, totalCost: s.price + s.shipCost }));
    const minTotalCost = Math.min(...storesWithTotal.map(s => s.totalCost));
    const minDays = Math.min(...activeStores.map(s => s.shipDays));

    // B. Calculate Scores
    const rankedStores = storesWithTotal.map(store => {
        // 1. Cost Score (45%)
        const costScore = (minTotalCost / store.totalCost) * 100;

        // 2. Trust Score (35%) - [FIXED FOR 10-POINT SCALE]
        // 10/10 = 100 points. 5/10 = 50 points.
        const trustScore = (store.rating / 10) * 100;

        // 3. Speed Score (20%)
        const speedScore = (minDays / store.shipDays) * 100;

        // 4. Initial Weighted Score
        let totalScore = (costScore * 0.45) + (trustScore * 0.35) + (speedScore * 0.20);

        // 5. THE PENALTY BOX (Logical Check)
        // If rating is bad (< 6.0/10), reduce score by 20%
        let isPenalized = false;
        if (store.rating < 6.0) {
            totalScore = totalScore * 0.8; 
            isPenalized = true;
        }

        return {
            ...store,
            totalScore: totalScore.toFixed(0),
            isPenalized
        };
    });

    // C. Sort
    rankedStores.sort((a, b) => b.totalScore - a.totalScore);

    // --- Formatters ---
    const formatKSH = (amount) => {
        return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
    };

    // Helper: Convert 10-point scale to 5 stars for visual display
    const renderStars = (ratingOutOf10) => {
        const ratingOutOf5 = ratingOutOf10 / 2; // Convert 8/10 -> 4/5
        const fullStars = Math.floor(ratingOutOf5);
        const hasHalfStar = ratingOutOf5 % 1 >= 0.5;

        return (
            <div className="flex text-yellow-400 text-xs items-center">
                {[...Array(5)].map((_, i) => {
                    if (i < fullStars) {
                        return <FontAwesomeIcon key={i} icon={faStar} />;
                    } else if (i === fullStars && hasHalfStar) {
                        return <FontAwesomeIcon key={i} icon={faStarHalfAlt} />;
                    } else {
                        return <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />;
                    }
                })}
                <span className="ml-1 text-gray-500 font-semibold text-[10px]">({ratingOutOf10}/10)</span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
             <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-gray-700 font-bold uppercase text-sm tracking-wider">SmartRank™ Results (Quality & Price)</h3>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Store</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Pay</th> 
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Shipping</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Reviews (10)</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Smart Score</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {rankedStores.map((store, index) => (
                            <tr key={store.name} className={`transition duration-150 ${index === 0 ? "bg-green-50/60" : "hover:bg-gray-50"}`}>
                                
                                {/* 1. Rank */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {index === 0 ? (
                                            <div className="h-8 w-8 rounded-full bg-yellow-400 text-white flex items-center justify-center shadow-sm">
                                                <FontAwesomeIcon icon={faTrophy} className="text-sm" />
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 font-bold text-lg ml-2">#{index + 1}</span>
                                        )}
                                    </div>
                                </td>

                                {/* 2. Store */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className={`h-2.5 w-2.5 rounded-full mr-2 ${store.color}`}></span>
                                        <span className="font-bold text-gray-800">{store.name}</span>
                                        {index === 0 && <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Best Value</span>}
                                    </div>
                                </td>

                                {/* 3. Total Cost */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900 font-bold text-lg">{formatKSH(store.totalCost)}</span>
                                </td>

                                {/* 4. Shipping Details */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center text-xs text-gray-600">
                                            <FontAwesomeIcon icon={faTruck} className="mr-2 text-gray-400 w-4"/> 
                                            <span className="font-medium">{store.shipDays} Days</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-600">
                                            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-gray-400 w-4"/>
                                            <span className={store.shipCost === 0 ? "text-green-600 font-bold" : ""}>
                                                {store.shipCost === 0 ? "Free" : formatKSH(store.shipCost)}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* 5. Reviews (Visualized as 5 stars but derived from 10) */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {renderStars(store.rating)}
                                    {store.isPenalized && (
                                        <span className="text-[10px] text-red-500 font-bold block mt-1">
                                            <FontAwesomeIcon icon={faExclamationTriangle} /> Low Rating Penalty
                                        </span>
                                    )}
                                </td>

                                {/* 6. Smart Score */}
                                <td className="px-6 py-4 whitespace-nowrap align-middle">
                                    <div className="w-24">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full shadow-sm ${
                                                    store.totalScore >= 80 ? 'bg-green-500' : 
                                                    store.totalScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                                                }`} 
                                                style={{ width: `${store.totalScore}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 mt-1 block">{store.totalScore}/100</span>
                                    </div>
                                </td>

                                {/* 7. Action */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <a 
                                        href={store.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="text-rose-600 hover:text-white border border-rose-600 hover:bg-rose-600 px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-2 w-fit ml-auto"
                                    >
                                        Visit <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;