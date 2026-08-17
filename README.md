# 💴 EUR/JPY PAC Speculator & DCA Tracker

A progressive web application (PWA) designed for EUR to JPY accumulation, DCA (Piano di Accumulo del Capitale) tracking, historical European Central Bank (ECB) rate analysis, and Yen appreciation profit simulation.

---

## ✨ Features

- 📱 **Mobile-First PWA Navigation**: Native-style 4-tab bottom navigation bar for iOS & Android (Chart, Simulator, Buys, Ladder), installable as a standalone app.
- 🎨 **OLED Pitch Black & Electric Violet UI**: Ultra-clean obsidian aesthetic with high-contrast violet accents and responsive KPI cards taking up minimal screen real-estate.
- 📈 **Real Market & Historical Charts**:
  - **1D**: Real-time 15-minute live intraday quotes with time-of-day progression.
  - **1W**: Hourly forex candles across the last 7 days.
  - **1M (Default)**, **3M**, **1Y**, **5Y**: 1,450 daily closing reference rates directly from the official **European Central Bank (ECB)** database.
- 🎯 **Yen Appreciation Profit Forecast**: Interactive simulation engine calculating net EUR return and ROI% when selling accumulated Yen back to Euros as the Yen strengthens.
- 📊 **Revolut Buys Ledger**: Average Purchase Price (Prezzo Medio di Carico / PMC) tracking with break-even distance and local backup/export (JSON & CSV).
- 🪜 **DCA Accumulation Limit Ladder**: Suggested spot and limit order tranches for Revolut accumulation.
- 🔒 **100% Client-Side & Offline Ready**: All transaction data is stored locally in your browser's LocalStorage.

---

## 🚀 Live Demo & Deployment

Open index.html directly in any modern browser, or host on GitHub Pages:

`ash
# Enable GitHub Pages in your repo settings -> Pages -> Branch: main / Root
`

---

## 🛠️ Tech Stack

- HTML5, CSS3 (Modern Flexbox, CSS Grid, Glassmorphism, CSS Variables)
- Vanilla ES6+ JavaScript
- [Chart.js](https://www.chartjs.org/)
- Service Worker & Web App Manifest (PWA)
- Official European Central Bank (ECB) Data API & Live FX Market Feeds
