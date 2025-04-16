import { css } from "lit";

export const fleetManagementGridStyles = css`

/* --------------------------------------------- */
/* GLOBAL STYLES */
/* --------------------------------------------- */

:host {
  display: block;
  height: 100%;
  width: 100%;
}

igc-tabs {
  flex: 1;
  width: 100%;
}

igc-divider {
  color: var(--ig-gray-200);
  opacity: 24%;
}

.overlay-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transition: opacity 200ms ease;
  z-index: 9998;
  pointer-events: none;
}

.overlay-backdrop.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* Global Grid Styles */
.main-grid {
  --ig-size: var(--ig-size-small)
}


/* --------------------------------------------- */
/* COMMON ELEMENT STYLES */
/* --------------------------------------------- */

.icon-style {
  color: #000000;
}

.link-style {
  color: var(--primary-text-color);
}

.grid-container {
  padding: 16px;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}

.pie-chart-canvas {
  width: 90%;
  height: 90%;
}

/* --------------------------------------------- */
/* CHART STYLES */
/* --------------------------------------------- */

.dashboard {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-template-rows: 1fr 1fr;
  padding: 16px;
  height: 100%;
}

.chart-container {
  display: grid;
  grid-template-rows: 40px auto;
  height: 100%;
  padding: 10px;
  padding-top: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.chart-select {
  width: 40%;
}

.chart-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #8A8A8A;
}

.content-wrapper {
  padding: 16px;
}

/*Specfic Chart Types*/
.pie-chart-container {
  grid-column: 1;
  grid-row: 1;
}

.area-chart-container {
  grid-column: 1;
  grid-row: 2;
}

.column-chart-container {
  grid-column: 2;
  grid-row: 1 / span 2;
}

.column-chart {
  width: 95%;
  height: 420px;
}

.column-chart-two-series {
  align-self: center;
  width: 95%;
  height: 390px;
}

.utilization-chart-container {
  flex-direction: column;
  align-items: start;
}

/* --------------------------------------------- */
/* DETAILS & TABLE STYLES */
/* --------------------------------------------- */

.details-container {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
}

.details-table {
  display: flex;
  flex-direction: row;
  width: calc(100% * (2 / 3));
  height: auto;
  justify-content: space-around;
}

.detail-block-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
}

.detail-category-container,
.detail-content-container {
  width: 50%;
}

.detail-category-container {
  padding-left: 25px;
}

.detail-item {
  padding: 5px 0;
  font-size: 0.8125rem;
}

.detail-category {
  font-weight: bold;
}

/* --------------------------------------------- */
/* OVERLAYS & CARDS */
/* --------------------------------------------- */

.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  width: 360px;
  height: 396px;
  box-shadow: var(--ig-elevation-24);
}

.overlay-wrapper {
  position: absolute;
  display: none;
  opacity: 0;
  transition: opacity 500ms ease;
  width: max-content;
  z-index: 9999;
  pointer-events: none;
}

.overlay-wrapper.visible {
  opacity: 1;
  pointer-events: auto;
}

.overlay-driver {
  width: 327px;
  height: 360px;
  padding: 0px;
  margin: 0px;
}

/*Overlay Sections*/
.overlay-avatar {
  --ig-size: var(--ig-size-medium);
  margin-bottom: 16px;
}

.overlay-text {
  font-size: 14px;
}

.overlay-title {
  font-size: 20px;
  margin: 0;
}

.overlay-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

.overlay-location-header,
.overlay-driver-header {
  height: 38%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.overlay-location-content,
.overlay-driver-content {
  height: 48%;
  width: 100%;
  padding: 0px;
  justify-content: center;
}

.overlay-location-actions,
.overlay-driver-actions {
  height: 13%;
  width: 100%;
  justify-content: end;
  margin: 8px;
}

.overlay-location-actions {
  margin: 0px;
}

/* --------------------------------------------- */
/* DRIVER STYLES */
/* --------------------------------------------- */

.driver-block-container {
  display: flex;
  flex-direction: row;
  justify-self: center;
  width: 85%;
}

.driver-category-container,
.driver-detail-container {
  width: 50%;
}

.logo-avatar {
  --size: 22px;
  border-radius: 0.25rem;

}

/* --------------------------------------------- */
/* MISC STYLES */
/* --------------------------------------------- */

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-value {
  padding-left: 8px;
  color: var(--primary-text-color);
}

.carousel-container {
  width: 420px;
  height: 240px;
}

h3 {
  margin: 0 0;
}

`;