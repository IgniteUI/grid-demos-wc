import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../projects/sales-grid/src/sales-grid";

import namedStyles from "./sales-view.scss?inline";
import sharedStyles from "../../shared/styles.scss?inline";

@customElement("sales-view")
export default class SalesView extends LitElement {
  constructor() {
    super();
  }

  private onLoad = (event: any) => {
    event.target.parentElement.classList.remove("loading");
  };
  render() {
    const iframeSrc = `${import.meta.env.BASE_URL}sales`;
    return html` <div class="iframe-wrapper loading">
      <iframe src=${iframeSrc} @load=${this.onLoad}></iframe>
    </div>`;
  }

  static styles = [unsafeCSS(namedStyles), unsafeCSS(sharedStyles)];
}
