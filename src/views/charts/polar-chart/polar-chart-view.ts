import { LitElement, unsafeCSS, html } from "lit";
import { customElement } from "lit/decorators.js";
// import "../../../projects/charts/polar-chart/src/polar-chart";
import "../../../../projects/charts/polar-chart/src/polar-chart";
import namedStyles from "./polar-chart-view.scss?inline";
import sharedStyles from "../../../shared/styles.scss?inline";

@customElement("polar-chart-view")
export default class PolarChartView extends LitElement {
  constructor() {
    super();
  }

  private onLoad = (event: any) => {
    event.target.parentElement.classList.remove("loading");
  };

  render() {
    const iframeSrc = `${import.meta.env.BASE_URL}charts/polar-chart`;
    return html` <div class="iframe-wrapper loading">
      <iframe src=${iframeSrc} @load=${this.onLoad}></iframe>
    </div>`;
  }
  static styles = [unsafeCSS(namedStyles), unsafeCSS(sharedStyles)];
}
