import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Liquid } from 'liquid-gooey';

function GooeySpeedDial() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';
  const fill = isDark ? '#8b5cf6' : '#7c3aed';
  const shadow = isDark
    ? '0 6px 22px rgba(139, 92, 246, 0.45)'
    : '0 6px 18px rgba(124, 58, 237, 0.35)';

  // Close when tapping outside
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const el = document.getElementById('gooey-menu-container');
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('pointerdown', handleOutside);
    return () => window.removeEventListener('pointerdown', handleOutside);
  }, [open]);

  return (
    <div id="gooey-menu-container" className={`gooey-menu-wrapper ${open ? 'menu-open' : ''}`}>
      <Liquid
        blur={6}
        contrast={18}
        fill={fill}
        shadow={shadow}
        filterPadding={40}
        className="gooey-liquid-group"
      >
        {/* Satellite 1: + Log Buy (Top) */}
        <Liquid.Item
          x={open ? 0 : 0}
          y={open ? -64 : 0}
          transition="bouncy"
        >
          <button
            type="button"
            className="gooey-sat-btn"
            title="Log Buy (EUR → JPY)"
            aria-label="Log Buy"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              if (typeof (window as any).openAddModal === 'function') {
                (window as any).openAddModal('buy');
              }
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="gooey-label">Buy</span>
          </button>
        </Liquid.Item>

        {/* Satellite 2: − Log Sell (Diagonal Top-Left) */}
        <Liquid.Item
          x={open ? -48 : 0}
          y={open ? -48 : 0}
          transition="bouncy"
          delay={35}
        >
          <button
            type="button"
            className="gooey-sat-btn"
            title="Log Sell (JPY → EUR)"
            aria-label="Log Sell"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              if (typeof (window as any).openAddModal === 'function') {
                (window as any).openAddModal('sell');
              }
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
            </svg>
            <span className="gooey-label">Sell</span>
          </button>
        </Liquid.Item>

        {/* Satellite 3: ⚡ Sync Live Rates (Left) */}
        <Liquid.Item
          x={open ? -64 : 0}
          y={open ? 0 : 0}
          transition="bouncy"
          delay={65}
        >
          <button
            type="button"
            className="gooey-sat-btn"
            title="Sync Live Rates"
            aria-label="Sync Live Rates"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              if (typeof (window as any).fetchLiveMarketData === 'function') {
                (window as any).fetchLiveMarketData(true);
              }
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span className="gooey-label">Sync</span>
          </button>
        </Liquid.Item>

        {/* Main Trigger Button */}
        <Liquid.Item x={0} y={0} transition="bouncy">
          <button
            type="button"
            className={`gooey-main-btn ${open ? 'is-active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Quick Actions Liquid Menu"
          >
            <svg
              className="gooey-plus-icon"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </Liquid.Item>
      </Liquid>
    </div>
  );
}

function initGooeyMenu() {
  let rootEl = document.getElementById('gooey-root');
  if (!rootEl) {
    rootEl = document.createElement('div');
    rootEl.id = 'gooey-root';
    document.body.appendChild(rootEl);
  }
  const root = createRoot(rootEl);
  root.render(<GooeySpeedDial />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGooeyMenu);
} else {
  initGooeyMenu();
}
