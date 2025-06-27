import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation3D.css';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  page: number;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: '🏠', page: 0 },
  { id: 'about', label: 'About', icon: '👨‍💻', page: 1 },
  { id: 'projects', label: 'Projects', icon: '🚀', page: 2 },
  { id: 'contact', label: 'Contact', icon: '📧', page: 4 },
];

function Navigation3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (item: NavigationItem) => {
    setActiveSection(item.id);
    // Scroll to the appropriate section
    const scrollTarget = item.page / 5; // 5 total pages
    window.scrollTo({
      top: scrollTarget * window.innerHeight * 5,
      behavior: 'smooth'
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Navigation Toggle Button */}
      <motion.button
        className="nav-3d-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <span className="nav-3d-toggle-line" />
        <span className="nav-3d-toggle-line" />
        <span className="nav-3d-toggle-line" />
      </motion.button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="nav-3d-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="nav-3d-menu-content">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`nav-3d-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="nav-3d-icon">{item.icon}</span>
                  <span className="nav-3d-label">{item.label}</span>
                  <div className="nav-3d-glow" />
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="nav-3d-progress">
        <div className="nav-3d-progress-track">
          {navigationItems.map((item) => (
            <motion.div
              key={item.id}
              className={`nav-3d-progress-dot ${activeSection === item.id ? 'active' : ''}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleNavClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Section Indicator */}
      <motion.div
        className="nav-3d-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="nav-3d-indicator-content">
          <span className="nav-3d-indicator-number">
            {String(navigationItems.findIndex(item => item.id === activeSection) + 1).padStart(2, '0')}
          </span>
          <span className="nav-3d-indicator-label">
            {navigationItems.find(item => item.id === activeSection)?.label}
          </span>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        className="nav-3d-scroll-hint"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="nav-3d-scroll-text">Scroll to explore</div>
        <motion.div
          className="nav-3d-scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </>
  );
}

export default Navigation3D;
