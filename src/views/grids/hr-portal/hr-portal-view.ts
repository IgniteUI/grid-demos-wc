import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../../projects/grids/hr-portal/src/hr-portal";
import namedStyles from "./hr-portal-view.scss?inline";
import sharedStyles from "../../../shared/styles.scss?inline";

@customElement("hr-portal-view")
export default class HrPortalView extends LitElement {
  constructor() {
    super();
  }
  private onLoad = (event: any) => {
    event.target.parentElement.classList.remove("loading");
  };
  render() {
    const iframeSrc = `${import.meta.env.BASE_URL}grids/hr-portal`;

    return html` <div class="iframe-wrapper loading">
      <iframe src=${iframeSrc} @load=${this.onLoad}></iframe>
    </div>`;
  }

  static styles = [unsafeCSS(namedStyles), unsafeCSS(sharedStyles)];
}
