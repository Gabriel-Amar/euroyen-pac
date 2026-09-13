import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Liquid } from 'liquid-gooey';

/* ==========================================================
   LIQUID SPEED DIAL (Action Menu — Wide-spread satellites)
   ========================================================== */
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

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const container = document.getElementById('gooey-menu-canvas');
      if (container && !container.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('pointerdown', handleOutside);
    return () => window.removeEventListener('pointerdown', handleOutside);
  }, [open]);

  /* ---- Action handlers ---- */
  const doBuy = () => {
    setOpen(false);
    if (typeof (window as any).openAddModal === 'function') {
      (window as any).openAddModal('buy');
    }
  };
  const doSell = () => {
    setOpen(false);
    if (typeof (window as any).openAddModal === 'function') {
      (window as any).openAddModal('sell');
    }
  };
  const doSync = () => {
    setOpen(false);
    if (typeof (window as any).fetchLiveMarketData === 'function') {
      (window as any).fetchLiveMarketData(true);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`gooey-backdrop ${open ? 'is-visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />      {/* Ample canvas so bouncy spring physics and pills never clip */}
      <div id="gooey-menu-canvas" className={`gooey-menu-canvas ${open ? 'menu-open' : ''}`}>
        <Liquid
          blur={5}
          contrast={19}
          fill={fill}
          shadow="0 6px 20px rgba(139, 92, 246, 0.35)"
          filterPadding={80}
          className="gooey-liquid-stage"
        >
          {/* Satellite 1: Buy JPY (Top pill: y = -174) */}
          <Liquid.Item
            x={open ? 6 : 41}
            y={open ? -174 : 0}
            scale={open ? 1 : 0.001}
            transition={{ stiffness: 240, damping: 20 }}
            className="gooey-item-pos pill-item"
          >
            <button
              type="button"
              className={`gooey-pill-btn ${open ? 'is-open' : ''}`}
              title="Log Buy (EUR → JPY)"
              aria-label="Log Buy"
              tabIndex={open ? 0 : -1}
              onClick={doBuy}
            >
              <span className="pill-icon-badge buy-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span className="pill-text-col">
                <span className="pill-title">Buy JPY</span>
                <span className="pill-sub">EUR → JPY</span>
              </span>
            </button>
          </Liquid.Item>

          {/* Satellite 2: Sell JPY (Middle pill: y = -118) */}
          <Liquid.Item
            x={open ? 6 : 41}
            y={open ? -118 : 0}
            scale={open ? 1 : 0.001}
            transition={{ stiffness: 240, damping: 20 }}
            delay={30}
            className="gooey-item-pos pill-item"
          >
            <button
              type="button"
              className={`gooey-pill-btn ${open ? 'is-open' : ''}`}
              title="Log Sell (JPY → EUR)"
              aria-label="Log Sell"
              tabIndex={open ? 0 : -1}
              onClick={doSell}
            >
              <span className="pill-icon-badge sell-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                </svg>
              </span>
              <span className="pill-text-col">
                <span className="pill-title">Sell JPY</span>
                <span className="pill-sub">JPY → EUR</span>
              </span>
            </button>
          </Liquid.Item>

          {/* Satellite 3: Sync Live (Bottom pill: y = -62) */}
          <Liquid.Item
            x={open ? 6 : 41}
            y={open ? -62 : 0}
            scale={open ? 1 : 0.001}
            transition={{ stiffness: 240, damping: 20 }}
            delay={60}
            className="gooey-item-pos pill-item"
          >
            <button
              type="button"
              className={`gooey-pill-btn ${open ? 'is-open' : ''}`}
              title="Sync Live ECB Rates"
              aria-label="Sync Rates"
              tabIndex={open ? 0 : -1}
              onClick={doSync}
            >
              <span className="pill-icon-badge sync-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </span>
              <span className="pill-text-col">
                <span className="pill-title">Sync ECB</span>
                <span className="pill-sub">Live Rates</span>
              </span>
            </button>
          </Liquid.Item>

          {/* Main Trigger Button: 54px circle */}
          <Liquid.Item
            x={0}
            y={0}
            transition={{ stiffness: 260, damping: 22 }}
            className="gooey-item-pos fab-item"
          >
            <button
              type="button"
              className={`gooey-main-btn ${open ? 'is-active' : ''}`}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Quick Actions"
            >
              <svg
                className="gooey-plus-icon"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="#fff"
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
    </>
  );
}

/* ==========================================================
   INITIALIZE — Only speed dial now (slider uses native CSS)
   ========================================================== */
function initAllGooeyComponents() {
  let rootEl = document.getElementById('gooey-root');
  if (!rootEl) {
    rootEl = document.createElement('div');
    rootEl.id = 'gooey-root';
    document.body.appendChild(rootEl);
  }
  const speedDialRoot = createRoot(rootEl);
  speedDialRoot.render(<GooeySpeedDial />);

  /* Re-show the native range slider and remove the liquid mount */
  const nativeSlider = document.getElementById('rate-slider') as HTMLInputElement | null;
  if (nativeSlider) {
    nativeSlider.style.display = '';
  }
  const liquidMount = document.getElementById('liquid-slider-mount');
  if (liquidMount) {
    liquidMount.remove();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllGooeyComponents);
} else {
  initAllGooeyComponents();
}
