import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { 
    faFacebookF, 
    faTwitter, 
    faGoogle, 
    faInstagram, 
    faLinkedinIn, 
    faGithub 
} from '@fortawesome/free-brands-svg-icons';

// --- IMPORT STYLES ---
import { footerStyles } from "../styles/FooterStyles";

function Footer() {
  return (
    <footer className={footerStyles.container}>
       <div className={footerStyles.contentGrid}>
            
            {/* COLUMN 1: BRANDING */}
            <div>
                <h3 className={footerStyles.brandTitle}>
                    <FontAwesomeIcon icon={faShoppingBag} className="text-rose-600"/>
                    Shopcrawl
                </h3>
                <p className={footerStyles.brandDesc}>
                    The smartest way to compare prices and track products across Kenya's top e-commerce stores. Shop smarter, save more.
                </p>
            </div>

            {/* COLUMN 2: QUICK LINKS */}
            <div>
                <h4 className={footerStyles.sectionTitle}>Quick Links</h4>
                <ul className={footerStyles.linkList}>
                    <li><Link to="/" className={footerStyles.linkItem}>Home</Link></li>
                    <li><Link to="/products" className={footerStyles.linkItem}>Browse Products</Link></li>
                    <li><Link to="/cart" className={footerStyles.linkItem}>Search History</Link></li>
                    <li><Link to="/signIn" className={footerStyles.linkItem}>Login / Register</Link></li>
                </ul>
            </div>

            {/* COLUMN 3: SOCIAL MEDIA */}
            <div>
                <h4 className={footerStyles.sectionTitle}>Connect With Us</h4>
                <div className={footerStyles.socialGrid}>
                    
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className={footerStyles.socialIcon} aria-label="Facebook">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    
                    <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className={footerStyles.socialIcon} aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    
                    <a href="https://www.google.com" target="_blank" rel="noreferrer" className={footerStyles.socialIcon} aria-label="Google">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    
                    <a href="https://instagram.com/sho_pcrawl" target="_blank" rel="noreferrer" className={footerStyles.socialIcon} aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    
                    <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className={footerStyles.socialIcon} aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    
                    <a href="https://github.com/JessyWaweru/FINAL-PROJECT-REACT-FRONTEND" target="_blank" rel="noreferrer" className={footerStyles.socialIcon} aria-label="GitHub">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>

                </div>
            </div>
       </div>

       {/* BOTTOM BAR */}
       <div className={footerStyles.bottomBar}>
            <p className={footerStyles.copyrightText}>
                © {new Date().getFullYear()} <span className="text-rose-500 font-bold">Shopcrawl</span>. All Rights Reserved.
            </p>
       </div>
    </footer>
  );
}

export default Footer;