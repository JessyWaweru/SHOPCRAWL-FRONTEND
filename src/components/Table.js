import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faStar, 
    faStarHalfAlt, 
    faExternalLinkAlt, 
    faTruck, 
    faMoneyBillWave, 
    faTrophy, 
    faExclamationTriangle,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';

// --- IMPORT STYLES ---
import { tableStyles } from "../styles/TableStyles";

function Table({ product }) {
    
    // ==========================================
    // 1. DATA PREPARATION
    // ==========================================
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
            rating: parseFloat(store.data.rating || 0), 
            shipCost: parseFloat(store.data.shipping_cost || 0),
            shipDays: parseFloat(store.data.shipping_days || 7) 
        }));

    if (activeStores.length === 0) {
        return (
            <div className={tableStyles.outOfStock}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                Out of Stock Everywhere
            </div>
        );
    }

    // ==========================================
    // 2. ALGORITHM: "SmartRank" Logic
    // ==========================================
    
    // A. Baselines
    const storesWithTotal = activeStores.map(s => ({ ...s, totalCost: s.price + s.shipCost }));
    const minTotalCost = Math.min(...storesWithTotal.map(s => s.totalCost));
    const minDays = Math.min(...activeStores.map(s => s.shipDays));

    // B. Calculate Scores
    const rankedStores = storesWithTotal.map(store => {
        // 1. Cost Score (45%)
        const costScore = (minTotalCost / store.totalCost) * 100;

        // 2. Trust Score (35%) - Scale 0-10
        const trustScore = (store.rating / 10) * 100;

        // 3. Speed Score (20%)
        const speedScore = (minDays / store.shipDays) * 100;

        // 4. Initial Weighted Score
        let totalScore = (costScore * 0.45) + (trustScore * 0.35) + (speedScore * 0.20);

        // 5. Penalty Check (< 6.0 rating)
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

    // C. Sort (Highest Score First)
    rankedStores.sort((a, b) => b.totalScore - a.totalScore);

    // ==========================================
    // 3. HELPERS
    // ==========================================
    const formatKSH = (amount) => {
        return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
    };

    const renderStars = (ratingOutOf10) => {
        const ratingOutOf5 = ratingOutOf10 / 2;
        const fullStars = Math.floor(ratingOutOf5);
        const hasHalfStar = ratingOutOf5 % 1 >= 0.5;

        return (
            <div className="flex text-yellow-400 text-xs items-center">
                {[...Array(5)].map((_, i) => {
                    if (i < fullStars) return <FontAwesomeIcon key={i} icon={faStar} />;
                    if (i === fullStars && hasHalfStar) return <FontAwesomeIcon key={i} icon={faStarHalfAlt} />;
                    return <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />;
                })}
                <span className="ml-1 text-gray-500 font-semibold text-[10px]">({ratingOutOf10}/10)</span>
            </div>
        );
    };

    // ==========================================
    // 4. RENDER
    // ==========================================
    return (
        <div className={tableStyles.container}>
            
            {/* Header */}
            <div className={tableStyles.header}>
                <h3 className={tableStyles.headerTitle}>
                    <FontAwesomeIcon icon={faChartLine} className="text-rose-600"/>
                    SmartRank™ Analysis (Quality & Price)
                </h3>
            </div>
            
            <div className={tableStyles.wrapper}>
                <table className={tableStyles.table}>
                    <thead className={tableStyles.thead}>
                        <tr>
                            <th className={tableStyles.th}>Rank</th>
                            <th className={tableStyles.th}>Store</th>
                            <th className={tableStyles.th}>Total Pay</th> 
                            <th className={tableStyles.th}>Shipping</th>
                            <th className={tableStyles.th}>Average Rating</th>
                            <th className={tableStyles.th}>Smart Score</th>
                            <th className={tableStyles.th}></th>
                        </tr>
                    </thead>
                    <tbody className={tableStyles.tbody}>
                        {rankedStores.map((store, index) => (
                            <tr key={store.name} className={index === 0 ? tableStyles.trWinner : tableStyles.trBase + " " + tableStyles.trNormal}>
                                
                                {/* 1. Rank */}
                                <td className={tableStyles.td}>
                                    <div className="flex items-center gap-2">
                                        {index === 0 ? (
                                            <div className={tableStyles.rankBadge}>
                                                <FontAwesomeIcon icon={faTrophy} className="text-sm" />
                                            </div>
                                        ) : (
                                            <span className={tableStyles.rankText}>#{index + 1}</span>
                                        )}
                                    </div>
                                </td>

                                {/* 2. Store */}
                                <td className={tableStyles.td}>
                                    <div className="flex items-center">
                                        <span className={`${tableStyles.storeDot} ${store.color}`}></span>
                                        <span className={tableStyles.storeName}>{store.name}</span>
                                        {index === 0 && <span className={tableStyles.bestValueBadge}>Best Value</span>}
                                    </div>
                                </td>

                                {/* 3. Total Cost */}
                                <td className={tableStyles.td}>
                                    <span className={tableStyles.priceText}>{formatKSH(store.totalCost)}</span>
                                </td>

                                {/* 4. Shipping Details */}
                                <td className={tableStyles.td}>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center text-xs text-gray-600">
                                            <FontAwesomeIcon icon={faTruck} className="mr-2 text-gray-400 w-4"/> 
                                            <span className="font-medium">{store.shipDays} Days</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-600">
                                            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-gray-400 w-4"/>
                                            <span className={store.shipCost === 0 ? tableStyles.freeShipText : ""}>
                                                {store.shipCost === 0 ? "Free" : formatKSH(store.shipCost)}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* 5. Reviews */}
                                <td className={tableStyles.td}>
                                    {renderStars(store.rating)}
                                    {store.isPenalized && (
                                        <span className={tableStyles.penaltyText}>
                                            <FontAwesomeIcon icon={faExclamationTriangle} /> Penalty Applied
                                        </span>
                                    )}
                                </td>

                                {/* 6. Smart Score */}
                                <td className={tableStyles.td + " align-middle"}>
                                    <div className="w-24">
                                        <div className={tableStyles.progressBg}>
                                            <div 
                                                className={`h-2 rounded-full shadow-sm ${
                                                    store.totalScore >= 80 ? 'bg-green-500' : 
                                                    store.totalScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                                                }`} 
                                                style={{ width: `${store.totalScore}%` }}
                                            ></div>
                                        </div>
                                        <span className={tableStyles.progressScore}>{store.totalScore}/100</span>
                                    </div>
                                </td>

                                {/* 7. Action */}
                                <td className={`${tableStyles.td} text-right`}>
                                    <a 
                                        href={store.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className={tableStyles.visitBtn}
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