import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    const location = useLocation();
    const showFooter = location.pathname === '/' || location.pathname === '/tasks' || location.pathname === '/friends';

    if (!showFooter) return null;

    return (
        <div className="footer">
            <Link to="/" className="footer-link">
                <i className="fas fa-home"></i>
                <span>Home</span>
            </Link>
            <Link to="/tasks" className="footer-link">
                <i className="fas fa-tasks"></i>
                <span>Tasks</span>
            </Link>
            <Link to="/friends" className="footer-link">
                <i className="fas fa-users"></i>
                <span>Friends</span>
            </Link>
        </div>
    );
};

export default Footer;
