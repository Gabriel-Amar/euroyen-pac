import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Liquid } from 'liquid-gooey';

/* ==========================================================
   1. LIQUID SPEED DIAL (Action Menu with Pill Labels & Ample Canvas)
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
  const shadow = isDark
    ? '0 6px 24px rgba(139, 92, 246, 0.45)'
    : '0 6px 20px rgba(124, 58, 237, 0.35)';

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

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      <div
        className={`gooey-backdrop ${open ? 'is-visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Ample canvas with filterPadding={120} so bouncy spring physics never clips */}
      <div id="gooey-menu-canvas" className={`gooey-menu-canvas ${open ? 'menu-open' : ''}`}>
        <Liquid
          blur={6}
          contrast={18}
          fill={fill}
          shadow={shadow}
          filterPadding={120}
          className="gooey-liquid-stage"
        >
          {/* Satellite 1: + Log Buy (Top: y = -74) */}
          <Liquid.Item
            x={0}
            y={open ? -74 : 0}
            transition={{ stiffness: 220, damping: 18 }}
          >
            <div className="gooey-item-wrapper">
              <div
                className={`gooey-pill-label ${open ? 'label-show' : ''}`}
                onClick={() => {
                  setOpen(false);
                  if (typeof (window as any).openAddModal === 'function') {
                    (window as any).openAddModal('buy');
                  }
                }}
              >
                <span className="pill-dot buy-dot"></span>
                <span>Log Buy</span>
                <span className="pill-sub">+¥</span>
              </div>
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
              </button>
            </div>
          </Liquid.Item>

          {/* Satellite 2: − Log Sell (Diagonal: x = -50, y = -50) */}
          <Liquid.Item
            x={open ? -50 : 0}
            y={open ? -50 : 0}
            transition={{ stiffness: 220, damping: 18 }}
            delay={30}
          >
            <div className="gooey-item-wrapper">
              <div
                className={`gooey-pill-label ${open ? 'label-show' : ''}`}
                onClick={() => {
                  setOpen(false);
                  if (typeof (window as any).openAddModal === 'function') {
                    (window as any).openAddModal('sell');
                  }
                }}
              >
                <span className="pill-dot sell-dot"></span>
                <span>Log Sell</span>
                <span className="pill-sub">−¥</span>
              </div>
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
              </button>
            </div>
          </Liquid.Item>

          {/* Satellite 3: ⚡ Sync Live Rates (Left: x = -72) */}
          <Liquid.Item
            x={open ? -72 : 0}
            y={0}
            transition={{ stiffness: 220, damping: 18 }}
            delay={60}
          >
            <div className="gooey-item-wrapper">
              <div
                className={`gooey-pill-label ${open ? 'label-show' : ''}`}
                onClick={() => {
                  setOpen(false);
                  if (typeof (window as any).fetchLiveMarketData === 'function') {
                    (window as any).fetchLiveMarketData(true);
                  }
                }}
              >
                <span className="pill-dot sync-dot"></span>
                <span>Sync</span>
                <span className="pill-sub">ECB</span>
              </div>
              <button
                type="button"
                className="gooey-sat-btn"
                title="Sync Live ECB & FX Rates"
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
              </button>
            </div>
          </Liquid.Item>

          {/* Main Trigger Button */}
          <Liquid.Item x={0} y={0} transition={{ stiffness: 220, damping: 18 }}>
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
    </>
  );
}

/* ==========================================================
   2. LIQUID INTERACTIVE SLIDER (effect="move" with Molten Droplet Trail)
   ========================================================== */
interface LiquidSliderProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
}

function LiquidSlider({ min = 120, max = 200, step = 0.5, initialValue = 155 }: LiquidSliderProps) {
  const [value, setValue] = useState(initialValue);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [thumbX, setThumbX] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (trackRef.current) {
        const w = trackRef.current.clientWidth - 28;
        setTrackWidth(Math.max(w, 100));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (trackWidth > 0) {
      const pct = (value - min) / (max - min);
      setThumbX(pct * trackWidth);
    }
  }, [value, trackWidth, min, max]);

  const handlePointer = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left - 14, rect.width - 28));
    const pct = x / (rect.width - 28);
    const rawVal = min + pct * (max - min);
    const steppedVal = Math.round(rawVal / step) * step;
    const clampedVal = Math.max(min, Math.min(max, steppedVal));

    setValue(clampedVal);
    setThumbX((clampedVal - min) / (max - min) * (rect.width - 28));

    const hiddenInput = document.getElementById('rate-slider') as HTMLInputElement | null;
    if (hiddenInput) {
      hiddenInput.value = clampedVal.toString();
    }
    const valLabel = document.getElementById('slider-rate-val');
    if (valLabel) {
      valLabel.innerText = clampedVal.toFixed(2) + " ¥";
    }
    if (typeof (window as any).runSliderSimulation === 'function') {
      (window as any).runSliderSimulation();
    }
  }, [min, max, step]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handlePointer(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      handlePointer(e.clientX);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className="liquid-slider-container">
      <div
        className="liquid-slider-track-box"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="liquid-slider-groove">
          <div
            className="liquid-slider-fill"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
        </div>

        <div className="liquid-slider-stage">
          <Liquid
            blur={6}
            contrast={18}
            fill="#8b5cf6"
            shadow="0 3px 14px rgba(139, 92, 246, 0.45)"
            filterPadding={36}
            className="liquid-slider-group"
          >
            <Liquid.Item
              effect="move"
              move={{ springiness: 0.52, trail: 0.58 }}
            >
              <div
                className="liquid-slider-thumb"
                style={{ transform: `translateX(${thumbX}px)` }}
              >
                <div className="thumb-inner-dot" />
              </div>
            </Liquid.Item>
          </Liquid>
        </div>
      </div>

      <div className="liquid-slider-ticks">
        <span>120 ¥ (Super Yen)</span>
        <span>140 ¥</span>
        <span>160 ¥</span>
        <span>180 ¥</span>
        <span>200 ¥ (Weak Yen)</span>
      </div>
    </div>
  );
}

/* ==========================================================
   INITIALIZE & MOUNT ALL GOOEY COMPONENTS
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

  const sliderMount = document.getElementById('liquid-slider-mount');
  if (sliderMount) {
    const hiddenInput = document.getElementById('rate-slider') as HTMLInputElement | null;
    const initialVal = hiddenInput ? parseFloat(hiddenInput.value) || 155 : 155;
    const sliderRoot = createRoot(sliderMount);
    sliderRoot.render(<LiquidSlider initialValue={initialVal} />);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllGooeyComponents);
} else {
  initAllGooeyComponents();
}
