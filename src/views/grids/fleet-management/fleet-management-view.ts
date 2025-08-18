import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../../../projects/grids/fleet-management-grid/src/components/fleet-management/fleet-management-grid";
import namedStyles from './fleet-management-view.scss?inline';
import sharedStyles from '../../../shared/styles.scss?inline';

@customElement("fleet-management-view")
export default class FinanceView extends LitElement {
  constructor() {
    super();
  }

  private onLoad = (event: any) => {
    event.target.parentElement.classList.remove("loading");
  };
  render() {
    const iframeSrc = `${import.meta.env.BASE_URL}grids/fleet`;
    return html` <div class="iframe-wrapper loading">
      <iframe src=${iframeSrc} @load=${this.onLoad}></iframe>
    </div>`;
  }

  static styles = [unsafeCSS(namedStyles), unsafeCSS(sharedStyles)];
}
