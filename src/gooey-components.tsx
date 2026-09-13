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
      />

      {/* Canvas wrapper — large enough so satellites never clip */}
      <div id="gooey-menu-canvas" className={`gooey-menu-canvas ${open ? 'menu-open' : ''}`}>
        <Liquid
          blur={4}
          contrast={20}
          fill={fill}
          shadow="none"
          filterPadding={100}
          className="gooey-liquid-stage"
        >
          {/* Satellite 1: Buy — straight up */}
          <Liquid.Item
            x={0}
            y={open ? -110 : 0}
            transition={{ stiffness: 260, damping: 22 }}
          >
            <button
              type="button"
              className="gooey-sat-btn"
              title="Log Buy (EUR → JPY)"
              aria-label="Log Buy"
              tabIndex={open ? 0 : -1}
              onClick={doBuy}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </Liquid.Item>

          {/* Satellite 2: Sell — diagonal */}
          <Liquid.Item
            x={open ? -78 : 0}
            y={open ? -78 : 0}
            transition={{ stiffness: 260, damping: 22 }}
            delay={40}
          >
            <button
              type="button"
              className="gooey-sat-btn"
              title="Log Sell (JPY → EUR)"
              aria-label="Log Sell"
              tabIndex={open ? 0 : -1}
              onClick={doSell}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
              </svg>
            </button>
          </Liquid.Item>

          {/* Satellite 3: Sync — straight left */}
          <Liquid.Item
            x={open ? -110 : 0}
            y={0}
            transition={{ stiffness: 260, damping: 22 }}
            delay={80}
          >
            <button
              type="button"
              className="gooey-sat-btn"
              title="Sync Live Rates"
              aria-label="Sync Rates"
              tabIndex={open ? 0 : -1}
              onClick={doSync}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
            </button>
          </Liquid.Item>

          {/* Main Trigger */}
          <Liquid.Item x={0} y={0} transition={{ stiffness: 260, damping: 22 }}>
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

        {/* Floating labels — rendered OUTSIDE the Liquid so they're crisp */}
        <div className={`gooey-label-set ${open ? 'labels-visible' : ''}`}>
          <div className="gooey-floating-label fl-buy" onClick={doBuy}>
            <span className="fl-icon" style={{ background: '#10b981' }}>+¥</span>
            <span>Buy</span>
          </div>
          <div className="gooey-floating-label fl-sell" onClick={doSell}>
            <span className="fl-icon" style={{ background: '#f43f5e' }}>−¥</span>
            <span>Sell</span>
          </div>
          <div className="gooey-floating-label fl-sync" onClick={doSync}>
            <span className="fl-icon" style={{ background: '#8b5cf6' }}>⟳</span>
            <span>Sync</span>
          </div>
        </div>
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
