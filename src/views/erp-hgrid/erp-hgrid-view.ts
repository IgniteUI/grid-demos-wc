import { LitElement, unsafeCSS, html } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../projects/erp-hgrid/src/components/erp-hierarchical-grid";
import namedStyles from "./erp-hgrid-view.scss?inline";
import sharedStyles from "../../shared/styles.scss?inline";

@customElement("erp-hgrid-view")
export default class ErpHgridView extends LitElement {
  constructor() {
    super();
  }

  private onLoad = (event: any) => {
    event.target.parentElement.classList.remove("loading");
  };

  render() {
    const iframeSrc = `${import.meta.env.BASE_URL}inventory`;
    return html` <div class="iframe-wrapper loading">
      <iframe src=${iframeSrc} @load=${this.onLoad}></iframe>
    </div>`;
  }
  static styles = [unsafeCSS(namedStyles), unsafeCSS(sharedStyles)];
}
