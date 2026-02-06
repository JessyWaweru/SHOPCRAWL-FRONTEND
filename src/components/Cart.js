import React, { useState, useEffect } from "react";
import ProductItem from "./productItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowRight, faSpinner, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../config';
// --- IMPORT STYLES ---
import { historyStyles } from "../styles/HistoryStyles";

// Helper to format dates nicely
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
};

function Cart() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const HISTORY_LIMIT = 11; 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        setLoading(false);
        return; 
    }

    fetch(`${API_URL}/api/history/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to fetch history");
        return res.json();
    })
    .then(data => {
        setHistory(data); 
        setLoading(false);
    })
    .catch(err => {
        console.error("Error fetching history:", err);
        setLoading(false);
    });
  }, []);

  return (
    <div className={historyStyles.pageContainer}>
        
        {/* Main Card */}
        <div className={historyStyles.mainCard}>
            
            {/* HEADER */}
            <div className={historyStyles.headerRow}>
                <div className={historyStyles.titleGroup}>
                    <div className={historyStyles.iconBox}>
                        <FontAwesomeIcon icon={faHistory} />
                    </div>
                    <div>
                        <h1 className={historyStyles.titleText}>Search History</h1>
                        <p className={historyStyles.subTitle}>Your recently viewed products timeline.</p>
                    </div>
                </div>

                <div className={historyStyles.limitBadge}>
                    <FontAwesomeIcon icon={faClock} className="text-rose-500" />
                    <p className="text-sm text-gray-700">
                        Last <span className="font-bold text-gray-900">{HISTORY_LIMIT}</span> items saved
                    </p>
                </div>
            </div>

            {/* CONTENT */}
            {loading ? (
                 <div className={historyStyles.loadingContainer}>
                    <FontAwesomeIcon icon={faSpinner} spin className={historyStyles.loadingIcon} />
                    <p className={historyStyles.loadingText}>Syncing your timeline...</p>
                 </div>
            ) : history.length === 0 ? (
                
                /* EMPTY STATE */
                <div className={historyStyles.emptyContainer}>
                    <div className={historyStyles.emptyIconCircle}>
                        <FontAwesomeIcon icon={faHistory} />
                    </div>
                    <h2 className={historyStyles.emptyTitle}>No history found</h2>
                    <p className={historyStyles.emptyText}>
                        You haven't viewed any products yet. Start browsing to track prices.
                    </p>
                    <Link to="/products">
                        <button className={historyStyles.browseBtn}>
                            Start Browsing <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </Link>
                </div>

            ) : (

                /* GRID */
                <div className={historyStyles.gridContainer}>
                    {history.map((item) => (
                        <div key={item.id} className={historyStyles.itemWrapper}>
                            
                            {/* Date Badge */}
                            <div className={historyStyles.dateBadge}>
                                <FontAwesomeIcon icon={faCalendarAlt} className="text-rose-400"/>
                                {formatDate(item.date_added)}
                            </div>

                            {/* Card Wrapper for Hover Effect */}
                            <div className={historyStyles.cardHoverEffect}>
                                {/* We spread the product data into the item */}
                                <ProductItem {...item.product} />
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default Cart;