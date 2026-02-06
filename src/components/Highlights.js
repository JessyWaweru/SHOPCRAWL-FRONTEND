import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrophy, faHistory } from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { highlightStyles } from "../styles/HighlightsStyles";

function Highlights() {
  return (
    <div className={highlightStyles.sectionContainer}>
        <div className={highlightStyles.bgDecoration}></div>

        <div className={highlightStyles.gridContainer}>
            
            {/* FEATURE 1: SEARCH */}
            <div className={highlightStyles.card}>
                <div className={highlightStyles.iconWrapper}>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <h3 className={highlightStyles.title}>Smart Search</h3>
                <div className={highlightStyles.divider}></div>
                <p className={highlightStyles.description}>
                    Instantly scan Amazon, Jumia, and more. Our engine gathers real-time pricing and stock status in milliseconds.
                </p>
            </div>

            {/* FEATURE 2: RANKINGS */}
            <div className={highlightStyles.card}>
                <div className={highlightStyles.iconWrapper}>
                    <FontAwesomeIcon icon={faTrophy} />
                </div>
                <h3 className={highlightStyles.title}>SmartRank™ Algo</h3>
                <div className={highlightStyles.divider}></div>
                <p className={highlightStyles.description}>
                    We don't just show prices. We automatically calculate the "Best Value" by weighing price, shipping speed, and seller rating.
                </p>
            </div>

            {/* FEATURE 3: HISTORY */}
            <div className={highlightStyles.card}>
                <div className={highlightStyles.iconWrapper}>
                    <FontAwesomeIcon icon={faHistory} />
                </div>
                <h3 className={highlightStyles.title}>Timeline Tracking</h3>
                <div className={highlightStyles.divider}></div>
                <p className={highlightStyles.description}>
                    Never lose a deal. Shopcrawl keeps a secure timeline of every product you've viewed so you can track price drops easily.
                </p>
            </div>

        </div>
    </div>
  );
}

export default Highlights;