import { css } from "lit";

export const erpGridStyles = css`
:host {
  display: block;
  text-align: center;
  height: 100%;
  width: 100%;
}

#hierarchicalGrid {
  --ig-size: var(--ig-size-medium);

  igc-badge[variant="primary"]::part(base) {
    background-color: var(--ig-primary-50);
  }

  igc-badge[variant="warning"]::part(base) {
    background-color: var(--ig-warn-100);
  }

  igc-badge[variant="danger"]::part(base) {
    background-color: var(--ig-error-50);
  }

  igc-badge[variant="success"]::part(base) {
    background-color: var(--ig-success-100);
  }
}

.product-img {
  display: flex;
  justify-content: center;

  img {
    height: 22px;
    border-radius: 4px;
  }
}

.custom-icon {
  --size: 12px;
  color:  black;
}

.country-cell {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0px 4px;
  gap: 8px;

  img {
    font-size: 16px;
    width: 18px;
    height: 14px;
    margin-top: 2px;
    box-shadow: var(--ig-elevation-1);
  }
}
  
.status-cell {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0px 4px;
  gap: 8px;
}

#product-image-tooltip {
  background: white;
  font-weight: bold;
  padding: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 90%;
  z-index: 9999;
  left: -5000px; // so that scrollbar doesn't appear
  // Transitions
  opacity: 0;
  transform: scale(0.97);
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.35s ease-out 0.4s,
    transform 0.35s ease-out 0.4s,
    visibility 0s linear 0.4s;
  position: absolute;

  .dialog-header {
    padding: 16px;
    font-size: 18px;
    font-weight: bold;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .dialog-body {
    padding: 16px;
    font-size: 14px;
    color: #555;
    overflow-y: auto;

    img {
      width: 312px;
      height: 312px;
    }
  }
}

#product-image-tooltip.show {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
  transition:
    opacity 0.35s ease-out,
    transform 0.35s ease-out,
    visibility 0s linear;
}
`